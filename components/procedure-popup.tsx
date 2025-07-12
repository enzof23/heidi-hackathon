"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

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

interface ProcedurePopupProps {
  procedure: Procedure
  onClose: () => void
  patientId: string
}

export function ProcedurePopup({ procedure, onClose, patientId }: ProcedurePopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">{procedure.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{new Date(procedure.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="capitalize">{procedure.bodyPart}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant={procedure.status === "Completed" ? "default" : "secondary"}>{procedure.status}</Badge>
            <Badge variant="outline">{procedure.type}</Badge>
          </div>

          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm">Outcome: {procedure.outcome}</span>
          </div>

          <p className="text-sm text-slate-600">{procedure.summary}</p>

          <div className="flex space-x-2 pt-2">
            <Button asChild className="flex-1">
              <Link href={`/patients/${patientId}/procedures/${procedure.id}`}>View Details</Link>
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
