"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Activity } from "lucide-react";

interface BodyOrgan {
  id: string;
  name: string;
  position: {
    top: string;
    left: string;
  };
  highlighted?: boolean;
  info?: string;
}

export function Body3D({ patientId }: { patientId: string }) {
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);

  // For liver cancer patients, highlight the liver
  const organs: BodyOrgan[] = [
    {
      id: "liver",
      name: "Liver",
      position: { top: "38%", left: "35%" },
      highlighted: true,
      info: "Primary treatment area - Liver lesion detected"
    },
    {
      id: "heart",
      name: "Heart",
      position: { top: "30%", left: "50%" },
      highlighted: false,
      info: "Cardiovascular system monitoring"
    },
    {
      id: "lungs",
      name: "Lungs",
      position: { top: "32%", left: "50%" },
      highlighted: false,
      info: "Respiratory system normal"
    }
  ];

  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center">
      {/* 3D Body Container */}
      <div className="relative">
        {/* Body Silhouette */}
        <svg 
          width="300" 
          height="500" 
          viewBox="0 0 300 500" 
          className="filter drop-shadow-xl"
        >
          {/* Body outline */}
          <g>
            {/* Head */}
            <ellipse cx="150" cy="60" rx="40" ry="50" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2"/>
            
            {/* Neck */}
            <rect x="135" y="100" width="30" height="30" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2"/>
            
            {/* Torso */}
            <path d="M 120 130 L 180 130 L 190 280 L 110 280 Z" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2"/>
            
            {/* Arms */}
            <path d="M 120 140 L 60 200 L 50 280 L 70 290 L 80 210 L 120 170" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2"/>
            <path d="M 180 140 L 240 200 L 250 280 L 230 290 L 220 210 L 180 170" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2"/>
            
            {/* Legs */}
            <path d="M 130 280 L 120 380 L 110 480 L 130 480 L 140 380 L 150 280" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2"/>
            <path d="M 170 280 L 180 380 L 190 480 L 170 480 L 160 380 L 150 280" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2"/>
          </g>
          
          {/* Liver highlight for liver cancer patients */}
          <g>
            <path 
              d="M 125 180 Q 150 170 170 180 L 175 220 Q 150 230 125 220 Z" 
              fill="#ef4444" 
              fillOpacity="0.6"
              stroke="#dc2626"
              strokeWidth="2"
              className="animate-pulse cursor-pointer hover:fillOpacity-80"
              onClick={() => setSelectedOrgan("liver")}
            />
            <text x="150" y="200" textAnchor="middle" className="text-xs font-medium fill-white">
              Liver
            </text>
          </g>
          
          {/* Heart */}
          <g>
            <path 
              d="M 140 150 Q 135 145 130 150 T 140 165 Q 150 155 150 150 Q 150 145 145 150 T 140 165" 
              fill="#3b82f6" 
              fillOpacity="0.3"
              stroke="#2563eb"
              strokeWidth="1"
              className="cursor-pointer hover:fillOpacity-50"
              onClick={() => setSelectedOrgan("heart")}
            />
          </g>
        </svg>
        
        {/* Organ indicators */}
        {organs.map((organ) => (
          <div
            key={organ.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              organ.highlighted ? 'z-10' : ''
            }`}
            style={{ top: organ.position.top, left: organ.position.left }}
          >
            <div
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                organ.highlighted 
                  ? 'bg-red-500 animate-pulse ring-4 ring-red-200' 
                  : 'bg-blue-500 hover:ring-2 hover:ring-blue-200'
              }`}
              onClick={() => setSelectedOrgan(organ.id)}
            />
          </div>
        ))}
      </div>
      
      {/* Selected Organ Info */}
      {selectedOrgan && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg w-full max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-slate-900">
              {organs.find(o => o.id === selectedOrgan)?.name}
            </h4>
            {organs.find(o => o.id === selectedOrgan)?.highlighted && (
              <Badge variant="destructive" className="text-xs">
                Active Treatment
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-600">
            {organs.find(o => o.id === selectedOrgan)?.info}
          </p>
        </div>
      )}
      
      {/* Legend */}
      <div className="mt-4 flex items-center space-x-4 text-xs text-slate-600">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span>Treatment Area</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span>Monitored</span>
        </div>
      </div>
    </div>
  );
}