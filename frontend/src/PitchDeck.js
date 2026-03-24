import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Radio, Zap, Database, 
  AlertTriangle, Layers, TrendingUp, Target, Play,
  ArrowRight, Check, X, Cloud, Car, Thermometer,
  DollarSign, Building, Cpu, Eye, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Animated Map Component for Demo Slide
const AnimatedMap = () => {
  const [isActive, setIsActive] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setPulseIntensity(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const triggerDemo = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 8000);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-[#0a0a12] rounded-lg overflow-hidden border border-white/10">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Highway representation */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        {/* Highway path */}
        <path
          d="M -50 400 Q 200 350 400 250 T 850 100"
          fill="none"
          stroke="#1a2332"
          strokeWidth="80"
        />
        <path
          d="M -50 400 Q 200 350 400 250 T 850 100"
          fill="none"
          stroke="#2a3a4a"
          strokeWidth="60"
        />
        {/* Lane markings */}
        <path
          d="M -50 400 Q 200 350 400 250 T 850 100"
          fill="none"
          stroke="#3a4a5a"
          strokeWidth="2"
          strokeDasharray="20,15"
        />
        
        {/* NSRSN Studs along highway */}
        {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((t, i) => {
          const x = -50 + t * 900;
          const y = 400 - t * 300 + Math.sin(t * Math.PI) * 50;
          const isInDangerZone = t >= 0.35 && t <= 0.55;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={isActive && isInDangerZone ? 8 : 4}
                fill={isActive && isInDangerZone ? "#ef4444" : "#F59E0B"}
                className={isActive && isInDangerZone ? "animate-pulse" : ""}
              >
                {isActive && isInDangerZone && (
                  <animate attributeName="r" values="4;12;4" dur="0.5s" repeatCount="indefinite" />
                )}
              </circle>
              {isActive && isInDangerZone && (
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  opacity={0.5}
                >
                  <animate attributeName="r" values="8;30;8" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
        
        {/* Danger Zone Polygon */}
        {isActive && (
          <g>
            <polygon
              points="280,280 380,240 420,220 480,200 440,260 380,290 320,310"
              fill="rgba(239, 68, 68, 0.3)"
              stroke="#ef4444"
              strokeWidth="3"
              className="animate-pulse"
            >
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.8s" repeatCount="indefinite" />
            </polygon>
            {/* Glow effect */}
            <polygon
              points="280,280 380,240 420,220 480,200 440,260 380,290 320,310"
              fill="none"
              stroke="#ef4444"
              strokeWidth="8"
              opacity="0.2"
              filter="blur(8px)"
            />
          </g>
        )}
        
        {/* Temperature indicator */}
        {isActive && (
          <g>
            <rect x="360" y="180" width="80" height="30" rx="4" fill="#1a1a2e" stroke="#ef4444" strokeWidth="1" />
            <text x="400" y="200" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">
              -0.2°C
            </text>
          </g>
        )}
      </svg>
      
      {/* Data feed overlay */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur rounded text-xs font-mono">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
          <span className="text-slate-300">NSRSN Grid: {isActive ? 'ALERT' : 'NOMINAL'}</span>
        </div>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-3 py-1.5 bg-red-500/20 backdrop-blur border border-red-500/50 rounded text-xs font-mono text-red-400"
          >
            ⚠ BLACK ICE DETECTED - E4 km 147.3
          </motion.div>
        )}
      </div>
      
      {/* Latency indicator */}
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur rounded text-xs font-mono">
        <span className="text-slate-500">Latency: </span>
        <span className={isActive ? "text-amber-400" : "text-green-400"}>
          {isActive ? "1.8s" : "—"}
        </span>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-slate-400">NSRSN Stud</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-slate-400">Ice Detection</span>
        </div>
      </div>
      
      {/* Trigger button */}
      <div className="absolute bottom-4 right-4">
        <Button
          onClick={triggerDemo}
          disabled={isActive}
          className={`${isActive ? 'bg-red-600' : 'bg-amber-500 hover:bg-amber-400'} text-black font-semibold px-4 py-2 rounded`}
        >
          {isActive ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              Processing Anomaly...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Simulate Temperature Drop
            </>
          )}
        </Button>
      </div>
      
      {/* API Response overlay */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-20 right-4 max-w-xs"
        >
          <div className="bg-black/80 backdrop-blur border border-green-500/50 rounded p-3 font-mono text-xs">
            <div className="text-green-400 mb-2">→ NVIDIA DRIVE API Response</div>
            <pre className="text-slate-300 overflow-hidden">
{`{
  "type": "ThreatPerimeter",
  "severity": "CRITICAL",
  "polygon": [...],
  "ttl": 1800
}`}
            </pre>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Comparison Matrix Component
const ComparisonMatrix = () => {
  const data = [
    { name: "Weather Apps", coverage: 90, accuracy: 20, latency: 60, verdict: "fail" },
    { name: "Connected Cars", coverage: 40, accuracy: 75, latency: 10, verdict: "fail" },
    { name: "RWIS Towers", coverage: 5, accuracy: 95, latency: 80, verdict: "fail" },
    { name: "NSRSN", coverage: 85, accuracy: 98, latency: 95, verdict: "pass" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-slate-400 font-medium">Solution</th>
            <th className="text-center py-4 px-4 text-slate-400 font-medium">Coverage</th>
            <th className="text-center py-4 px-4 text-slate-400 font-medium">Accuracy</th>
            <th className="text-center py-4 px-4 text-slate-400 font-medium">Latency</th>
            <th className="text-center py-4 px-4 text-slate-400 font-medium">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr 
              key={row.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border-b border-white/5 ${row.name === 'NSRSN' ? 'bg-amber-500/10' : ''}`}
            >
              <td className={`py-4 px-4 font-medium ${row.name === 'NSRSN' ? 'text-amber-400' : 'text-white'}`}>
                {row.name}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${row.coverage > 70 ? 'bg-green-500' : row.coverage > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${row.coverage}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs w-8">{row.coverage}%</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${row.accuracy > 70 ? 'bg-green-500' : row.accuracy > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${row.accuracy}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs w-8">{row.accuracy}%</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${row.latency > 70 ? 'bg-green-500' : row.latency > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${row.latency}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs w-8">{row.latency > 70 ? 'Fast' : row.latency > 30 ? 'Slow' : 'None'}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">
                {row.verdict === 'pass' ? (
                  <span className="inline-flex items-center gap-1 text-green-400">
                    <Check className="w-4 h-4" /> Complete
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-400">
                    <X className="w-4 h-4" /> Gap
                  </span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Slide Components
const slides = [
  // Slide 1: Title & Hook
  {
    id: 1,
    component: ({ isActive }) => (
      <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-16 h-16 bg-amber-500 rounded flex items-center justify-center">
              <Radio className="w-10 h-10 text-black" />
            </div>
            <span className="text-4xl font-bold text-white tracking-tight">NSRSN</span>
          </div>
          
          {/* Hook */}
          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl font-light">
            "Autonomous vehicles and modern logistics run on data.
          </p>
          <p className="text-3xl md:text-5xl font-bold text-white mb-12 max-w-4xl">
            But at <span className="text-red-500">0°C</span>, the data is <span className="text-red-500">blind</span>."
          </p>
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/10 border border-amber-500/30 rounded-sm">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-amber-400 font-semibold">
              The incontrovertible ground-truth data layer for winter mobility
            </span>
          </div>
        </motion.div>
      </div>
    )
  },
  
  // Slide 2: The Billion-Dollar Blind Spot
  {
    id: 2,
    component: ({ isActive }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
            The Problem
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">
            The Billion-Dollar<br /><span className="text-red-500">Blind Spot</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-sm">
              <Eye className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">LiDAR Cannot See Black Ice</h3>
                <p className="text-slate-400">Optical sensors fail at the critical surface-level where traction is lost.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-sm">
              <Cloud className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">Weather APIs Predict Air, Not Asphalt</h3>
                <p className="text-slate-400">Macro-level forecasts miss localized microclimate conditions on the road surface.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-sm">
              <Car className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">Connected Cars React Too Late</h3>
                <p className="text-slate-400">ABS slip events only generate data after traction is already lost.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30">
                <div className="text-center">
                  <div className="text-6xl font-bold text-red-500 mb-2">$130B</div>
                  <div className="text-slate-400 text-sm">Annual Winter<br />Road Maintenance</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-black border border-red-500/50 rounded">
                <span className="text-red-400 text-sm font-semibold">AV Fleets Geofenced</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  
  // Slide 3: The Flawed Status Quo
  {
    id: 3,
    component: ({ isActive }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-amber-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Market Analysis
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The Flawed Status Quo
          </h2>
          <p className="text-slate-400 text-xl">
            No predictive, zero-latency, high-density thermodynamic baseline exists. <span className="text-amber-400">Until now.</span>
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ComparisonMatrix />
        </motion.div>
      </div>
    )
  },
  
  // Slide 4: The Hardware Moat (Trojan Horse)
  {
    id: 4,
    component: ({ isActive }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-amber-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
            The Solution
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The Hardware Moat
          </h2>
          <p className="text-slate-400 text-xl">
            Our encapsulated sub-surface stud is the <span className="text-amber-400">Trojan Horse</span> for data dominance.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Stud visualization */}
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 rounded-full border-4 border-slate-600 flex items-center justify-center shadow-2xl">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Radio className="w-16 h-16 text-black" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-black text-sm font-bold rounded">
                NSRSN STUD
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-center">
                <div className="text-3xl font-bold text-amber-400">$9</div>
                <div className="text-slate-400 text-sm">BOM Cost</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-center">
                <div className="text-3xl font-bold text-amber-400">20yr</div>
                <div className="text-slate-400 text-sm">Lifespan</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-center">
                <div className="text-3xl font-bold text-amber-400">1.8V</div>
                <div className="text-slate-400 text-sm">RF Harvesting</div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-center">
                <div className="text-3xl font-bold text-amber-400">0</div>
                <div className="text-slate-400 text-sm">Batteries</div>
              </div>
            </div>
            
            <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-sm">
              <h4 className="text-amber-400 font-semibold mb-2">The Magic</h4>
              <p className="text-slate-300 text-sm">
                Physically measures the <span className="text-white font-semibold">catastrophic dielectric collapse</span> of freezing water exactly at the tire-to-road interface.
              </p>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
              <h4 className="text-white font-semibold mb-2">Go-To-Market</h4>
              <p className="text-slate-400 text-sm">
                Cities pay for hardware to optimize $130B salting budgets. <span className="text-amber-400">They subsidize our sensor network deployment.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  
  // Slide 5: The AI Fusion Engine
  {
    id: 5,
    component: ({ isActive }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-cyan-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Core IP
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The AI Fusion Engine
          </h2>
        </motion.div>
        
        {/* Architecture Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded">
              <Radio className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400">Stud Ground Truth</span>
            </div>
            <span className="text-slate-500">+</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded">
              <AlertTriangle className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Waze Hazards</span>
            </div>
            <span className="text-slate-500">+</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded">
              <Car className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">Connected Car Slips</span>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-500" />
            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400">Flink Anomaly Engine</span>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-500" />
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded">
              <Target className="w-4 h-4 text-red-400" />
              <span className="text-red-400">Risk Polygons</span>
            </div>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="p-6 bg-white/5 border border-white/10 rounded-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Physics-Informed Neural Network</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Our PINN takes incontrovertible hardware truth and fuses it with macro-mobility data to generate <span className="text-white">0-6h predictive risk polygons</span>.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>Real-time spatial interpolation</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">The Derivative Shield</h3>
            </div>
            <p className="text-slate-400 mb-4">
              We don't resell OEM data. We ingest it, fuse it, and sell <span className="text-white">proprietary, irreversible state classifiers</span>.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <Check className="w-4 h-4" />
              <span>IP-protected data transformation</span>
            </div>
          </motion.div>
        </div>
      </div>
    )
  },
  
  // Slide 6: THE DEMO
  {
    id: 6,
    component: ({ isActive }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-red-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Live Demonstration
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real-Time Threat Detection
          </h2>
          <p className="text-slate-400">
            Simulating a sudden temperature drop on the E4 motorway. Click the button to trigger the anomaly detection pipeline.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <AnimatedMap />
        </motion.div>
      </div>
    )
  },
  
  // Slide 7: Revenue Model
  {
    id: 7,
    component: ({ isActive }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-emerald-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Business Model
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Three-Tier Revenue Engine
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tier: "Tier 1",
              title: "B2G Infrastructure",
              icon: <Building className="w-8 h-8" />,
              color: "blue",
              description: "Road Authorities pay for hardware + basic dashboard access",
              outcome: "Covers deployment CapEx + baseline revenue",
              tag: "Foundation"
            },
            {
              tier: "Tier 2",
              title: "Navigation Partners",
              icon: <Layers className="w-8 h-8" />,
              color: "purple",
              description: "Bi-directional data bartering with Waze/Google Maps",
              outcome: "Zero-cost inbound data acquisition",
              tag: "Data Multiplier"
            },
            {
              tier: "Tier 3",
              title: "AV & Logistics API",
              icon: <DollarSign className="w-8 h-8" />,
              color: "amber",
              description: "High-margin, metered API access for NVIDIA DRIVE, Aurora, and autonomous freight",
              outcome: "The Cash Cow",
              tag: "Scale Revenue"
            }
          ].map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className={`relative p-6 rounded-sm border ${
                tier.color === 'amber' 
                  ? 'bg-amber-500/10 border-amber-500/30' 
                  : tier.color === 'purple'
                  ? 'bg-purple-500/10 border-purple-500/30'
                  : 'bg-blue-500/10 border-blue-500/30'
              }`}
            >
              <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-semibold ${
                tier.color === 'amber' 
                  ? 'bg-amber-500/20 text-amber-400' 
                  : tier.color === 'purple'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {tier.tag}
              </div>
              
              <div className={`mb-4 ${
                tier.color === 'amber' 
                  ? 'text-amber-400' 
                  : tier.color === 'purple'
                  ? 'text-purple-400'
                  : 'text-blue-400'
              }`}>
                {tier.icon}
              </div>
              
              <span className="text-slate-500 text-sm">{tier.tier}</span>
              <h3 className="text-xl font-semibold text-white mt-1 mb-3">{tier.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{tier.description}</p>
              
              <div className={`pt-4 border-t ${
                tier.color === 'amber' 
                  ? 'border-amber-500/30' 
                  : tier.color === 'purple'
                  ? 'border-purple-500/30'
                  : 'border-blue-500/30'
              }`}>
                <span className={`text-sm font-medium ${
                  tier.color === 'amber' 
                    ? 'text-amber-400' 
                    : tier.color === 'purple'
                    ? 'text-purple-400'
                    : 'text-blue-400'
                }`}>
                  → {tier.outcome}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
  
  // Slide 8: The Ask
  {
    id: 8,
    component: ({ isActive }) => (
      <div className="h-full flex flex-col justify-center px-8 md:px-16 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-500 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Investment Opportunity
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            The Ask
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div className="p-6 bg-white/5 border border-white/10 rounded-sm text-left">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Current Status
            </h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                Hardware architecture functionally frozen (4-layer bimetallic stackup)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                Bare-metal MCU firmware engineered
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                Cloud pipeline and API live and validated
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-sm text-left">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              Use of Funds
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                Phase 0 Alpha Trial at AstaZero proving grounds (Sweden)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                Validate RF backscatter at 70 km/h
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2" />
                Train initial ML friction models
              </li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="inline-block mx-auto"
        >
          <div className="p-8 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-500/50 rounded-sm">
            <div className="text-slate-400 text-sm mb-2">Seed Round</div>
            <div className="text-5xl md:text-6xl font-bold text-amber-400 mb-4">$X Million</div>
            <div className="text-white font-medium">For the API of Autonomous Winter Driving</div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <div className="w-12 h-12 bg-amber-500 rounded flex items-center justify-center">
            <Radio className="w-8 h-8 text-black" />
          </div>
          <div className="text-left">
            <div className="text-white font-bold text-xl">NSRSN</div>
            <div className="text-slate-400 text-sm">contact@directroute.se</div>
          </div>
        </motion.div>
      </div>
    )
  }
];

// Main Pitch Deck Component
const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index < 0 || index >= slides.length) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#050A14] overflow-hidden"
      data-testid="pitch-deck"
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <a 
          href="/" 
          className="text-slate-500 hover:text-white text-sm transition-colors"
          data-testid="back-to-site"
        >
          ← Back to site
        </a>
        <div className="text-slate-500 text-sm font-mono">
          <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-1">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-amber-500 scale-150' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
            data-testid={`slide-dot-${index}`}
          />
        ))}
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="h-full"
        >
          {slides[currentSlide].component({ isActive: true })}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-4">
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
          data-testid="prev-slide-btn"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </Button>
        <Button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed"
          data-testid="next-slide-btn"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </Button>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-slate-600 text-xs">
        Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-400">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-400">→</kbd> or <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-400">Space</kbd> to navigate
      </div>
    </div>
  );
};

export default PitchDeck;
