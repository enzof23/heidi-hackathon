import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Stethoscope, Scissors } from "lucide-react"
import Link from "next/link"

const upcomingAppointments = [
  {
    id: 1,
    patientId: "patient-1",
    patientName: "John Smith",
    type: "consultation",
    date: "2024-01-15",
    time: "09:00",
    status: "scheduled",
    urgency: "normal",
  },
  {
    id: 2,
    patientId: "patient-2",
    patientName: "Maria Garcia",
    type: "surgery",
    date: "2024-01-15",
    time: "14:00",
    status: "confirmed",
    urgency: "high",
  },
  {
    id: 3,
    patientId: "patient-3",
    patientName: "Robert Johnson",
    type: "consultation",
    date: "2024-01-16",
    time: "10:30",
    status: "scheduled",
    urgency: "normal",
  },
  {
    id: 4,
    patientId: "patient-4",
    patientName: "Emily Chen",
    type: "surgery",
    date: "2024-01-16",
    time: "08:00",
    status: "prep",
    urgency: "urgent",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <div className="text-sm text-slate-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingAppointments.map((appointment) => (
          <Link key={appointment.id} href={`/patients/${appointment.patientId}`}>
            <Card
              className={`${appointment.type === "consultation" ? "consultation-card" : "surgery-card"} cursor-pointer`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    {appointment.type === "consultation" ? (
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Scissors className="w-5 h-5 text-red-600" />
                    )}
                    <span className="capitalize">{appointment.type}</span>
                  </CardTitle>
                  <Badge
                    variant={
                      appointment.urgency === "urgent"
                        ? "destructive"
                        : appointment.urgency === "high"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {appointment.urgency}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-slate-700">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{appointment.patientName}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
                <Badge variant="outline" className="capitalize">
                  {appointment.status}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
