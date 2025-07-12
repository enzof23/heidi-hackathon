import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  Stethoscope,
  Scissors,
  AlertTriangle,
  TrendingDown,
  Activity,
} from "lucide-react";
import Link from "next/link";

// Enhanced appointment data with real patient information
const upcomingAppointments = [
  {
    id: 1,
    patientId: "LCX001",
    patientName: "Angela Griffin",
    type: "consultation",
    date: "2024-12-15",
    time: "10:00",
    status: "scheduled",
    urgency: "urgent",
    diagnosis: "Liver Cancer - Radiofrequency ablation",
    afpLevel: 479,
    tumorReduction: 1.6,
    lastVisit: "2024-07-10",
    allergies: ["Sulfa drugs"],
    age: 46,
    smoking: "Non-smoker",
    alcohol: "Drinks socially",
    alt: 99,
    ast: 94,
    treatmentType: "Radiofrequency ablation",
  },
  {
    id: 2,
    patientId: "LCX007",
    patientName: "Mrs. Sarah Hancock",
    type: "surgery",
    date: "2024-12-15",
    time: "14:00",
    status: "confirmed",
    urgency: "high",
    diagnosis: "Liver Cancer - Surgical resection",
    afpLevel: 279,
    tumorReduction: 1.8,
    lastVisit: "2024-07-10",
    allergies: ["Aspirin"],
    age: 77,
    smoking: "Non-smoker",
    alcohol: "Drinks socially",
    alt: 108,
    ast: 111,
    treatmentType: "Surgical resection",
  },
  {
    id: 3,
    patientId: "LCX016",
    patientName: "Mary Moore",
    type: "consultation",
    date: "2024-12-16",
    time: "10:30",
    status: "scheduled",
    urgency: "normal",
    diagnosis: "Liver Cancer - TACE",
    afpLevel: 315,
    tumorReduction: 1.8,
    lastVisit: "2024-07-10",
    allergies: ["Penicillin"],
    age: 47,
    smoking: "Former smoker",
    alcohol: "Does not drink",
    alt: 92,
    ast: 95,
    treatmentType: "TACE",
  },
  {
    id: 4,
    patientId: "LCX003",
    patientName: "Hector Cook",
    type: "consultation",
    date: "2024-12-16",
    time: "08:00",
    status: "prep",
    urgency: "urgent",
    diagnosis: "Liver Cancer - Immunotherapy",
    afpLevel: 439,
    tumorReduction: 0.9,
    lastVisit: "2024-07-10",
    allergies: ["Penicillin"],
    age: 80,
    smoking: "Smoker",
    alcohol: "Frequent drinker",
    alt: 95,
    ast: 113,
    treatmentType: "Immunotherapy",
  },
];

function getDaysSinceLastVisit(lastVisit: string): number {
  const last = new Date(lastVisit);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getAFPStatus(afpLevel: number): { label: string; isHigh: boolean } {
  if (afpLevel > 400) {
    return { label: "High", isHigh: true };
  }
  return { label: "Normal", isHigh: false };
}

function getLiverFunctionStatus(alt: number, ast: number): string {
  if (alt > 100 || ast > 100) {
    return "Critical";
  } else if (alt > 80 || ast > 80) {
    return "Elevated";
  }
  return "Normal";
}

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">
          Upcoming consultations
        </h1>
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
          <Link
            key={appointment.id}
            href={`/patients/${appointment.patientId}`}
          >
            <Card
              className={`${
                appointment.type === "consultation"
                  ? "consultation-card"
                  : "surgery-card"
              } cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:ring-2 hover:ring-white/30 dark:hover:ring-white/20 hover:translate-y-[-1px]`}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <User className="w-4 h-4" />
                    <span className="font-medium">
                      {appointment.patientName}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {appointment.age}y
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString()} -{" "}
                    {appointment.time}
                  </span>
                </div>

                <div className="space-y-2 border-t pt-2">
                  <div className="text-sm font-medium text-slate-800">
                    {appointment.diagnosis}
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-slate-600">AFP:</span>
                      <span
                        className={`font-medium ${
                          getAFPStatus(appointment.afpLevel).isHigh
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {appointment.afpLevel} ng/mL
                      </span>
                      {getAFPStatus(appointment.afpLevel).isHigh && (
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <TrendingDown className="w-3 h-3 text-green-600" />
                    <span>Tumor ↓ {appointment.tumorReduction} cm</span>
                    <span className="text-slate-400">|</span>
                    <span>
                      Last visit: {getDaysSinceLastVisit(appointment.lastVisit)}{" "}
                      days ago
                    </span>
                  </div>

                  {appointment.allergies.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-red-600">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{appointment.allergies.join(", ")} allergy</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {appointment.smoking}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Activity className="w-3 h-3 mr-1" />
                      ALT/AST{" "}
                      {getLiverFunctionStatus(appointment.alt, appointment.ast)}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="capitalize text-xs">
                    {appointment.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
