"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, AlertTriangle, FileText, Activity } from "lucide-react"
import Link from "next/link"
import { BodyDiagram } from "@/components/body-diagram"
import { ProcedurePopup } from "@/components/procedure-popup"

// Mock patient data
const patientData = {
  "patient-1": {
    name: "John Smith",
    age: 45,
    gender: "Male",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin", "Shellfish"],
    procedures: [
      {
        id: "proc-1",
        title: "Knee Arthroscopy",
        date: "2023-08-15",
        type: "Surgery",
        status: "Completed",
        bodyPart: "knee",
        outcome: "Successful",
        summary: "Minimally invasive knee surgery to repair torn meniscus",
      },
      {
        id: "proc-2",
        title: "Cardiac Stress Test",
        date: "2023-11-20",
        type: "Diagnostic",
        status: "Completed",
        bodyPart: "heart",
        outcome: "Normal",
        summary: "Exercise stress test showed normal cardiac function",
      },
      {
        id: "proc-3",
        title: "Annual Physical",
        date: "2024-01-10",
        type: "Consultation",
        status: "Completed",
        bodyPart: "general",
        outcome: "Good",
        summary: "Routine annual checkup with blood work",
      },
    ],
  },
}

export default function PatientPage({ params }: { params: { id: string } }) {
  const [hoveredProcedure, setHoveredProcedure] = useState<string | null>(null)
  const [selectedPopup, setSelectedPopup] = useState<any>(null)

  const patient = patientData[params.id as keyof typeof patientData]

  if (!patient) {
    return <div>Patient not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">{patient.name}</h1>
        <Button asChild>
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Patient Metadata */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Age</label>
                  <p className="text-lg">{patient.age}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Gender</label>
                  <p className="text-lg">{patient.gender}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Medical Conditions</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.conditions.map((condition, index) => (
                    <Badge key={index} variant="secondary">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Allergies</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{allergy}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Procedures History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Medical History</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patient.procedures.map((procedure) => (
                <Link key={procedure.id} href={`/patients/${params.id}/procedures/${procedure.id}`}>
                  <div
                    className={`procedure-card p-4 border rounded-lg cursor-pointer ${
                      hoveredProcedure === procedure.bodyPart ? "bg-blue-50 border-blue-200" : ""
                    }`}
                    onMouseEnter={() => setHoveredProcedure(procedure.bodyPart)}
                    onMouseLeave={() => setHoveredProcedure(null)}
                    onClick={() => setSelectedPopup(procedure)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{procedure.title}</h3>
                      <Badge variant={procedure.status === "Completed" ? "default" : "secondary"}>
                        {procedure.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(procedure.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="capitalize">{procedure.bodyPart}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{procedure.summary}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Body Diagram */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Body Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <BodyDiagram
                procedures={patient.procedures}
                hoveredProcedure={hoveredProcedure}
                onHover={setHoveredProcedure}
                onProcedureClick={setSelectedPopup}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Procedure Popup */}
      {selectedPopup && (
        <ProcedurePopup procedure={selectedPopup} onClose={() => setSelectedPopup(null)} patientId={params.id} />
      )}
    </div>
  )
}
