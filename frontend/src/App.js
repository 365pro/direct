import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  ChevronDown, Menu, X, Radio, Car, Database, Shield, 
  Target, TrendingUp, MapPin, Users, Zap, ArrowRight,
  Mail, Building, MessageSquare, ExternalLink, Linkedin,
  Presentation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import PitchDeck from "@/PitchDeck";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "Benefits", href: "#benefits" },
    { name: "Technology", href: "#technology" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Contact", href: "#contact" },
    { name: "Pitch Deck", href: "/pitch", isExternal: true }
  ];

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#050A14]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 bg-amber-500 rounded-sm flex items-center justify-center">
              <Radio className="w-6 h-6 text-black" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">NSRSN</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Presentation className="w-4 h-4" />
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              )
            ))}
            <a 
              href="#contact"
              data-testid="nav-cta-button"
            >
              <Button className="btn-primary">Talk to Us</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0F1623] border border-white/10 rounded-sm p-6 mt-2"
          >
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 py-3 text-amber-400 hover:text-amber-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Presentation className="w-4 h-4" />
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-slate-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <a href="#contact" className="block mt-4">
              <Button className="btn-primary w-full">Talk to Us</Button>
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1740280460719-53ccc3200c68?crop=entropy&cs=srgb&fm=jpg&q=85)` }}
      />
      
      {/* Amber glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium">
              <Radio className="w-4 h-4" />
              Nordic Deep-Tech Infrastructure
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Smart Road Studs for<br />
            <span className="text-gradient-amber">Winter-Proof Autonomy</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            We embed intelligent, RF-powered studs under Nordic motorways—giving vehicles 
            a precise lane anchor that works through snow, ice, and darkness. 
            Infrastructure for Vision Zero and autonomous mobility.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#" data-testid="hero-prospectus-btn">
              <Button className="btn-primary text-base px-8 py-4">
                Download Prospectus
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="#contact" data-testid="hero-contact-btn">
              <Button className="btn-secondary text-base px-8 py-4">
                Talk to Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#problem" className="flex flex-col items-center text-slate-500 hover:text-slate-400 transition-colors">
            <span className="text-xs mb-2">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-scroll-indicator" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Problem Section
const Problem = () => {
  const problems = [
    {
      icon: <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center"><div className="w-4 h-4 bg-blue-400 rounded-full opacity-50" /></div>,
      title: "Invisible Lane Markings",
      description: "Snow and slush hide painted lines and roadside reflectors for months each winter."
    },
    {
      icon: <div className="w-8 h-8 bg-slate-500/20 rounded flex items-center justify-center"><div className="w-4 h-4 bg-slate-400 rounded-full opacity-50" /></div>,
      title: "Degraded Sensors",
      description: "Cameras struggle with white-out conditions; lidar sees snow particles as obstacles; GNSS accuracy drops."
    },
    {
      icon: <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center"><div className="w-4 h-4 bg-red-400 rounded-full opacity-50" /></div>,
      title: "Safety & Autonomy Gap",
      description: "Road authorities target Vision Zero; OEMs need reliable AV operation. Current infrastructure fails both in winter."
    }
  ];

  return (
    <section id="problem" data-testid="problem-section" className="section-padding bg-[#050A14] relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            The Challenge
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Why Winter Roads Break Mobility
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            Nordic winters create a critical gap between road infrastructure and the demands of modern ADAS and autonomous systems.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-sm p-8 card-hover"
              data-testid={`problem-card-${index}`}
            >
              <div className="mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-slate-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-6"
        >
          <div className="glass rounded-sm p-6">
            <div className="aspect-video bg-slate-800/50 rounded-sm mb-4 flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1718374804699-a5f5b5667cf0?crop=entropy&cs=srgb&fm=jpg&q=85" 
                alt="Winter road conditions" 
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <p className="text-slate-400 text-sm text-center">Traditional road markers invisible under snow</p>
          </div>
          <div className="glass rounded-sm p-6 border-amber-500/30">
            <div className="aspect-video bg-[#0F1623] rounded-sm mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-amber-500/20 relative">
                  <div className="absolute inset-0 road-line opacity-50" />
                </div>
              </div>
              <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-amber-500 animate-pulse-glow" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            <p className="text-amber-400 text-sm text-center">NSRSN studs visible to vehicles through any conditions</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Solution Section
const Solution = () => {
  const features = [
    {
      icon: <Radio className="w-6 h-6" />,
      title: "Smart Subsurface Studs",
      description: "RF-powered markers embedded beneath asphalt with RFID, sensors, and magnetic energy harvesting."
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Vehicle Integration",
      description: "Front-mounted readers feed stud data directly into ADAS/AV software stacks for precise lane localization."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Winter-Grade Anchoring",
      description: "Reliable lane reference through snow, ice, darkness—conditions where cameras and lidar fail."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data & Insights",
      description: "Optional backend for corridor monitoring, traffic analytics, and winter maintenance optimization."
    }
  ];

  return (
    <section id="solution" data-testid="solution-section" className="section-padding bg-[#0A0F1A] relative">
      {/* Subtle gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            Our Solution
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            What NSRSN Is
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            A machine-readable infrastructure layer that turns Nordic motorways into winter-proof corridors for advanced driver assistance and autonomous vehicles.
          </motion.p>
        </motion.div>

        {/* Feature grid - Bento style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-sm p-8 card-hover ${index === 0 ? 'lg:col-span-2' : ''}`}
              data-testid={`solution-feature-${index}`}
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-sm flex items-center justify-center text-amber-500 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Product visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          <div className="glass rounded-sm p-8 md:p-12 text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse-glow" />
              <div className="relative w-full h-full bg-[#0F1623] rounded-full border-2 border-amber-500/50 flex items-center justify-center">
                <Radio className="w-12 h-12 text-amber-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The Smart Stud</h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Engineered for Nordic conditions: withstands freeze-thaw cycles, road salt, and heavy traffic. 
              Passive until activated by vehicle readers—no external power required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Benefits Section
const Benefits = () => {
  const stakeholders = [
    {
      icon: <Building className="w-6 h-6" />,
      title: "Road Authorities",
      color: "amber",
      benefits: [
        "Vision Zero alignment with measurable safety improvements",
        "Better winter maintenance planning through real-time data",
        "Future-proof infrastructure for autonomous fleets"
      ]
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "OEMs & AV Teams",
      color: "sky",
      benefits: [
        "Robust lane localization in snow and low-visibility",
        "Better testing data from instrumented corridors",
        "Faster deployment of L2+/L3/L4 functions on motorways"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Investors",
      color: "emerald",
      benefits: [
        "Infrastructure + software economics with high barriers",
        "Recurring revenue from licensing and data services",
        "First-mover advantage in Nordic winter mobility"
      ]
    }
  ];

  return (
    <section id="benefits" data-testid="benefits-section" className="section-padding bg-[#050A14]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            Value Proposition
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Benefits for Every Stakeholder
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-sm p-8 card-hover"
              data-testid={`benefits-card-${index}`}
            >
              <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-6 ${
                stakeholder.color === 'amber' ? 'bg-amber-500/10 text-amber-500' :
                stakeholder.color === 'sky' ? 'bg-sky-500/10 text-sky-500' :
                'bg-emerald-500/10 text-emerald-500'
              }`}>
                {stakeholder.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{stakeholder.title}</h3>
              <ul className="space-y-3">
                {stakeholder.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                      stakeholder.color === 'amber' ? 'bg-amber-500' :
                      stakeholder.color === 'sky' ? 'bg-sky-500' :
                      'bg-emerald-500'
                    }`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Technology/How It Works Section
const Technology = () => {
  return (
    <section id="technology" data-testid="technology-section" className="section-padding bg-[#0A0F1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            Architecture
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            How It Works
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            A three-layer system connecting road infrastructure to vehicles and cloud analytics.
          </motion.p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Layer 1: Backend */}
          <div className="architecture-node mb-2">
            <Database className="w-8 h-8 text-sky-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Cloud Backend (Optional)</h4>
            <p className="text-slate-400 text-sm">Corridor monitoring, map updates, traffic analytics, maintenance alerts</p>
          </div>
          
          <div className="architecture-connector" />
          
          {/* Layer 2: Vehicle */}
          <div className="architecture-node mb-2 border-amber-500/30">
            <Car className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Vehicle Layer</h4>
            <p className="text-slate-400 text-sm">Front-mounted RF readers + software module integrating with ADAS/AV stack</p>
          </div>
          
          <div className="architecture-connector" />
          
          {/* Layer 3: Road */}
          <div className="architecture-node border-emerald-500/30">
            <Radio className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Roadside Layer</h4>
            <p className="text-slate-400 text-sm">Subsurface smart studs with RFID, sensors, energy harvesting—no wiring needed</p>
          </div>
        </motion.div>

        {/* Technical highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-500 mb-2">{"<"}5cm</div>
            <p className="text-slate-400 text-sm">Lane positioning accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-500 mb-2">15+ years</div>
            <p className="text-slate-400 text-sm">Stud operational lifetime</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-500 mb-2">-40°C</div>
            <p className="text-slate-400 text-sm">Operational temperature rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Roadmap Section
const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Proof of Concept",
      description: "2–5 km corridor in Sweden with full instrumentation",
      status: "current",
      metrics: "Validate tech, gather data, iterate"
    },
    {
      phase: "Phase 2",
      title: "Pilot Corridors",
      description: "25–50 km each across Nordic countries",
      status: "upcoming",
      metrics: "Partner with authorities and OEMs"
    },
    {
      phase: "Phase 3",
      title: "Nordic Rollout",
      description: "Hundreds of km on major motorways",
      status: "future",
      metrics: "Commercial deployment at scale"
    },
    {
      phase: "Phase 4",
      title: "EU Expansion",
      description: "Thousands of km across European markets",
      status: "future",
      metrics: "International growth and licensing"
    }
  ];

  return (
    <section id="roadmap" data-testid="roadmap-section" className="section-padding bg-[#050A14]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            Deployment
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Roadmap
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            Evidence-driven expansion—starting small, proving value, then scaling.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent" />
          
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              data-testid={`roadmap-phase-${index}`}
            >
              {/* Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050A14] border-2 border-amber-500 flex items-center justify-center z-10">
                {phase.status === 'current' ? (
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                )}
              </div>
              
              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <span className="text-amber-500 text-sm font-semibold">{phase.phase}</span>
                <h3 className="text-xl font-semibold text-white mt-1 mb-2">{phase.title}</h3>
                <p className="text-slate-400 mb-2">{phase.description}</p>
                <p className="text-slate-500 text-sm">{phase.metrics}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partners Section
const Partners = () => {
  const partnerTypes = [
    { title: "Road Authorities", description: "Trafikverket, Nordic ministries" },
    { title: "OEMs & Tier-1s", description: "ADAS and AV development teams" },
    { title: "AV Platforms", description: "Robotaxi, freight, logistics" },
    { title: "Tech Partners", description: "Compute, sensors, software" }
  ];

  return (
    <section id="partners" data-testid="partners-section" className="section-padding bg-[#0A0F1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            Ecosystem
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Partners & Collaborators
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            We're seeking collaborators for proof-of-concept and pilot corridors across the Nordic region.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="partner-logo-placeholder h-40 flex-col gap-2"
              data-testid={`partner-slot-${index}`}
            >
              <Users className="w-8 h-8 text-slate-600" />
              <span className="text-white font-medium">{partner.title}</span>
              <span className="text-slate-500 text-sm text-center">{partner.description}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#contact">
            <Button className="btn-primary">
              Become a Partner
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Team Section
const Team = () => {
  const team = [
    { name: "Founder Name", role: "CEO & Co-founder", placeholder: "FN" },
    { name: "Co-founder Name", role: "CTO & Co-founder", placeholder: "CF" },
    { name: "Advisor Name", role: "Strategic Advisor", placeholder: "AN" }
  ];

  return (
    <section id="team" data-testid="team-section" className="section-padding bg-[#050A14]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            About Us
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            The Team Behind NSRSN
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            Operated under the DirectRoute brand, combining deep expertise in infrastructure, 
            automotive technology, and Nordic mobility challenges.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-sm p-8 text-center card-hover"
              data-testid={`team-member-${index}`}
            >
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-500 text-2xl font-bold">{member.placeholder}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-slate-400 text-sm mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        toast.success("Message sent successfully! We'll be in touch shortly.");
        setFormData({ name: "", email: "", organization: "", message: "" });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" data-testid="contact-section" className="section-padding bg-[#0A0F1A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-500 text-sm font-semibold tracking-wider uppercase">
            Get in Touch
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Let's Build the Future Together
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            Interested in a pilot corridor, partnership, or investment? We'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-[#0F1623] border-white/10 text-white placeholder:text-slate-500 focus:border-amber-500"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="bg-[#0F1623] border-white/10 text-white placeholder:text-slate-500 focus:border-amber-500"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Organization</label>
                <Input
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Company or organization"
                  className="bg-[#0F1623] border-white/10 text-white placeholder:text-slate-500 focus:border-amber-500"
                  data-testid="contact-organization-input"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your interest in NSRSN..."
                  className="bg-[#0F1623] border-white/10 text-white placeholder:text-slate-500 focus:border-amber-500 resize-none"
                  data-testid="contact-message-input"
                />
              </div>
              <Button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isSubmitting}
                data-testid="contact-submit-button"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <MessageSquare className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass rounded-sm p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:contact@directroute.se" 
                  className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors"
                  data-testid="contact-email-link"
                >
                  <Mail className="w-5 h-5" />
                  contact@directroute.se
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors"
                  data-testid="contact-linkedin-link"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-5 h-5" />
                  Stockholm, Sweden
                </div>
              </div>
            </div>

            <div className="glass rounded-sm p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors" data-testid="download-prospectus-link">
                  <Zap className="w-5 h-5" />
                  Download Investment Prospectus
                </a>
                <a href="#technology" className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors">
                  <Target className="w-5 h-5" />
                  View Technical Overview
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer data-testid="footer" className="bg-[#050A14] border-t border-white/5 py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-sm flex items-center justify-center">
                <Radio className="w-6 h-6 text-black" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">NSRSN</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mb-4">
              Nordic Smart Road Stud Network — turning Nordic motorways into machine-readable, 
              winter-proof corridors for the autonomous future.
            </p>
            <p className="text-slate-500 text-sm">
              Operated by DirectRoute | directroute.se
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#problem" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Problem</a></li>
              <li><a href="#solution" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Solution</a></li>
              <li><a href="#benefits" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Benefits</a></li>
              <li><a href="#technology" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Technology</a></li>
              <li><a href="#roadmap" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Contact Us</a></li>
              <li><a href="#partners" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Partners</a></li>
              <li><a href="mailto:contact@directroute.se" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Email</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} NSRSN / DirectRoute. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:contact@directroute.se" className="text-slate-500 hover:text-amber-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="bg-[#050A14] min-h-screen">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Technology />
        <Roadmap />
        <Partners />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

// Main App Component with Routing
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pitch" element={<PitchDeck />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
