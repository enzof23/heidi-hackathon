import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  AlertTriangle, 
  Activity,
  TestTube,
  TrendingDown
} from "lucide-react";
import Link from "next/link";
import patientDataJson from "@/data/data.json";

export default function PatientsPage() {
  const patients = Object.values(patientDataJson.patients);

  function getAFPStatus(afpLevel: string): { label: string; isHigh: boolean } {
    const level = parseInt(afpLevel);
    if (level > 400) {
      return { label: "High", isHigh: true };
    }
    return { label: "Normal", isHigh: false };
  }

  function getLiverFunctionStatus(alt: string, ast: string): string {
    const altLevel = parseInt(alt);
    const astLevel = parseInt(ast);
    if (altLevel > 100 || astLevel > 100) {
      return "Critical";
    } else if (altLevel > 80 || astLevel > 80) {
      return "Elevated";
    }
    return "Normal";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">All Patients</h1>
        <div className="text-sm text-slate-600">
          Total: {patients.length} patients
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => {
          const latestLabResults = patient.labResults[patient.labResults.length - 1];
          const latestFollowUp = patient.followUp[patient.followUp.length - 1];
          
          return (
            <Link
              key={patient.id}
              href={`/patients/${patient.id}`}
            >
              <Card className="glass-card glass-card-hover cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-slate-600" />
                      <span>{patient.demographics.name}</span>
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {patient.demographics.age}y
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">ID: {patient.id}</span>
                    <span className="text-slate-600">{patient.demographics.gender}</span>
                  </div>

                  <div className="space-y-2 border-t pt-2">
                    <div className="text-sm font-medium text-slate-800">
                      {patient.treatmentPlan.treatment}
                    </div>
                    
                    {latestLabResults && (
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <TestTube className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-600">AFP:</span>
                          <span className={`font-medium ${getAFPStatus(latestLabResults.results.AFP).isHigh ? 'text-red-600' : 'text-green-600'}`}>
                            {latestLabResults.results.AFP}
                          </span>
                          {getAFPStatus(latestLabResults.results.AFP).isHigh && <AlertTriangle className="w-3 h-3 text-red-600" />}
                        </div>
                      </div>
                    )}
                    
                    {latestFollowUp && (
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <TrendingDown className="w-3 h-3 text-green-600" />
                        <span>{latestFollowUp.note}</span>
                      </div>
                    )}
                    
                    {patient.allergies.length > 0 && patient.allergies[0] !== "None" && (
                      <div className="flex items-center space-x-2 text-sm text-red-600">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{patient.allergies.join(", ")} allergy</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {patient.smokingAlcohol.smoking}
                      </Badge>
                      {latestLabResults && (
                        <Badge variant="outline" className="text-xs">
                          <Activity className="w-3 h-3 mr-1" />
                          ALT/AST {getLiverFunctionStatus(latestLabResults.results.ALT, latestLabResults.results.AST)}
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(patient.treatmentPlan.date).getFullYear()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}