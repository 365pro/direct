#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class NSRSNAPITester:
    def __init__(self, base_url="https://winter-av-corridor.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data.get('message', 'No message')}"
            self.log_test("API Root Endpoint", success, details)
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "organization": "Test Organization",
            "message": "This is a test message for NSRSN contact form validation."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if data.get('success') and data.get('id'):
                    details += f", ID: {data['id']}, Message: {data.get('message', '')}"
                else:
                    success = False
                    details += f", Invalid response structure: {data}"
            else:
                details += f", Response: {response.text[:200]}"
                
            self.log_test("Contact Form Submission", success, details)
            return success, data.get('id') if success else None
            
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
            return False, None

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        invalid_data_sets = [
            # Missing required fields
            {"name": "", "email": "test@example.com", "message": "Test"},
            {"name": "Test", "email": "", "message": "Test"},
            {"name": "Test", "email": "test@example.com", "message": ""},
            # Invalid email
            {"name": "Test", "email": "invalid-email", "message": "Test message"},
            # Message too short
            {"name": "Test", "email": "test@example.com", "message": "Short"}
        ]
        
        validation_passed = 0
        for i, invalid_data in enumerate(invalid_data_sets):
            try:
                response = requests.post(
                    f"{self.api_url}/contact",
                    json=invalid_data,
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                # Should return 422 for validation errors
                if response.status_code == 422:
                    validation_passed += 1
                    print(f"  ✅ Validation test {i+1}: Correctly rejected invalid data")
                else:
                    print(f"  ❌ Validation test {i+1}: Expected 422, got {response.status_code}")
                    
            except Exception as e:
                print(f"  ❌ Validation test {i+1}: Exception - {str(e)}")
        
        success = validation_passed == len(invalid_data_sets)
        self.log_test("Contact Form Validation", success, f"{validation_passed}/{len(invalid_data_sets)} validation tests passed")
        return success

    def test_get_contact_submissions(self):
        """Test getting contact submissions (admin endpoint)"""
        try:
            response = requests.get(f"{self.api_url}/contact", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    details += f", Found {len(data)} submissions"
                else:
                    success = False
                    details += ", Response is not a list"
            else:
                details += f", Response: {response.text[:200]}"
                
            self.log_test("Get Contact Submissions", success, details)
            return success
            
        except Exception as e:
            self.log_test("Get Contact Submissions", False, f"Exception: {str(e)}")
            return False

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test POST status
        try:
            test_status = {"client_name": "test_client"}
            response = requests.post(
                f"{self.api_url}/status",
                json=test_status,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            post_success = response.status_code == 200
            details = f"POST Status: {response.status_code}"
            
            if post_success:
                data = response.json()
                if data.get('id') and data.get('client_name') == 'test_client':
                    details += f", ID: {data['id']}"
                else:
                    post_success = False
                    details += ", Invalid response structure"
            
            self.log_test("POST Status Check", post_success, details)
            
        except Exception as e:
            self.log_test("POST Status Check", False, f"Exception: {str(e)}")
            post_success = False

        # Test GET status
        try:
            response = requests.get(f"{self.api_url}/status", timeout=10)
            get_success = response.status_code == 200
            details = f"GET Status: {response.status_code}"
            
            if get_success:
                data = response.json()
                if isinstance(data, list):
                    details += f", Found {len(data)} status checks"
                else:
                    get_success = False
                    details += ", Response is not a list"
            
            self.log_test("GET Status Checks", get_success, details)
            
        except Exception as e:
            self.log_test("GET Status Checks", False, f"Exception: {str(e)}")
            get_success = False

        return post_success and get_success

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting NSRSN API Tests...")
        print(f"Testing against: {self.api_url}")
        print("-" * 50)
        
        # Test API availability first
        if not self.test_api_root():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Test core functionality
        self.test_contact_form_submission()
        self.test_contact_form_validation()
        self.test_get_contact_submissions()
        self.test_status_endpoints()
        
        # Print summary
        print("-" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return False

    def get_test_results(self):
        """Return detailed test results"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }

def main():
    tester = NSRSNAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results = tester.get_test_results()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())