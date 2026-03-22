from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact form models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    organization: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    organization: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "NSRSN API - Nordic Smart Road Stud Network"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact form endpoints
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(input: ContactSubmissionCreate):
    """Submit a contact form inquiry"""
    try:
        contact_obj = ContactSubmission(**input.model_dump())
        
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        await db.contact_submissions.insert_one(doc)
        
        return ContactSubmissionResponse(
            success=True,
            message="Thank you for your inquiry. We will be in touch shortly.",
            id=contact_obj.id
        )
    except Exception as e:
        logging.error(f"Contact form submission error: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact submissions (for admin purposes)"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for submission in submissions:
        if isinstance(submission['created_at'], str):
            submission['created_at'] = datetime.fromisoformat(submission['created_at'])
    
    return submissions


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
