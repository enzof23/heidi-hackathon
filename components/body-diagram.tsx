"use client"

import { useState } from "react"

interface Procedure {
  id: string
  title: string
  date: string
  type: string
  status: string
  bodyPart: string
  outcome: string
  summary: string
}

interface BodyDiagramProps {
  procedures: Procedure[]
  hoveredProcedure: string | null
  onHover: (bodyPart: string | null) => void
  onProcedureClick: (procedure: Procedure) => void
}

export function BodyDiagram({ procedures, hoveredProcedure, onHover, onProcedureClick }: BodyDiagramProps) {
  const [hoveredBodyPart, setHoveredBodyPart] = useState<string | null>(null)

  // Group procedures by body part
  const proceduresByBodyPart = procedures.reduce(
    (acc, procedure) => {
      if (!acc[procedure.bodyPart]) {
        acc[procedure.bodyPart] = []
      }
      acc[procedure.bodyPart].push(procedure)
      return acc
    },
    {} as Record<string, Procedure[]>,
  )

  const bodyParts = [
    { name: "head", x: 50, y: 15, label: "Head" },
    { name: "heart", x: 50, y: 35, label: "Heart" },
    { name: "abdomen", x: 50, y: 50, label: "Abdomen" },
    { name: "knee", x: 45, y: 75, label: "Left Knee" },
    { name: "knee", x: 55, y: 75, label: "Right Knee" },
  ]

  return (
    <div className="relative w-full h-96 bg-slate-100 rounded-lg overflow-hidden">
      {/* Simple body outline */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* Head */}
        <circle cx="50" cy="15" r="8" fill="none" stroke="#cbd5e1" strokeWidth="2" />

        {/* Body */}
        <rect x="42" y="23" width="16" height="30" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="2" />

        {/* Arms */}
        <line x1="42" y1="30" x2="30" y2="45" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="58" y1="30" x2="70" y2="45" stroke="#cbd5e1" strokeWidth="2" />

        {/* Legs */}
        <line x1="45" y1="53" x2="45" y2="80" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="55" y1="53" x2="55" y2="80" stroke="#cbd5e1" strokeWidth="2" />
      </svg>

      {/* Body part markers and index cards */}
      {bodyParts.map((bodyPart, index) => {
        const proceduresForPart = proceduresByBodyPart[bodyPart.name] || []
        if (proceduresForPart.length === 0) return null

        const isHighlighted = hoveredProcedure === bodyPart.name || hoveredBodyPart === bodyPart.name

        return (
          <div key={`${bodyPart.name}-${index}`}>
            {/* Pointer */}
            <div
              className={`body-pointer ${isHighlighted ? "scale-150 bg-red-600" : ""}`}
              style={{
                left: `${bodyPart.x}%`,
                top: `${bodyPart.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => {
                setHoveredBodyPart(bodyPart.name)
                onHover(bodyPart.name)
              }}
              onMouseLeave={() => {
                setHoveredBodyPart(null)
                onHover(null)
              }}
            />

            {/* Index card */}
            <div
              className={`body-index-card ${isHighlighted ? "shadow-md scale-105" : ""}`}
              style={{
                left: `${bodyPart.x + 8}%`,
                top: `${bodyPart.y - 5}%`,
              }}
              onMouseEnter={() => {
                setHoveredBodyPart(bodyPart.name)
                onHover(bodyPart.name)
              }}
              onMouseLeave={() => {
                setHoveredBodyPart(null)
                onHover(null)
              }}
              onClick={() => onProcedureClick(proceduresForPart[0])}
            >
              <div className="font-medium text-slate-700">{bodyPart.label}</div>
              <div className="text-slate-500">
                {proceduresForPart.length} procedure{proceduresForPart.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Hover popup */}
            {hoveredBodyPart === bodyPart.name && (
              <div
                className="absolute bg-white border border-slate-200 rounded-lg p-3 shadow-lg z-10 min-w-48"
                style={{
                  left: `${bodyPart.x + 15}%`,
                  top: `${bodyPart.y + 5}%`,
                }}
              >
                <h4 className="font-medium text-slate-900 mb-2">{bodyPart.label} Procedures</h4>
                {proceduresForPart.map((procedure) => (
                  <div key={procedure.id} className="text-sm text-slate-600 mb-1">
                    <div className="font-medium">{procedure.title}</div>
                    <div>
                      {new Date(procedure.date).toLocaleDateString()} - {procedure.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
