"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Database,
  ImageIcon,
  Activity,
  TestTube,
  TrendingDown,
  AlertTriangle,
  Scissors,
  Heart,
  Pill,
} from "lucide-react";
import Link from "next/link";
import patientDataJson from "@/data/data.json";

export default function ProcedurePage({
  params,
}: {
  params: { id: string; procedureId: string };
}) {
  const patientJson =
    patientDataJson.patients[
      params.id as keyof typeof patientDataJson.patients
    ];

  if (!patientJson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Patient not found
          </h2>
          <Button asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get procedure type icon
  const getProcedureIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "surgical resection":
        return <Scissors className="w-5 h-5" />;
      case "radiofrequency ablation":
        return <Activity className="w-5 h-5" />;
      case "tace":
        return <Heart className="w-5 h-5" />;
      case "immunotherapy":
        return <Pill className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getAFPStatus = (afpLevel: string) => {
    const level = parseInt(afpLevel);
    if (level > 400) {
      return { label: "High Risk", variant: "destructive" as const };
    } else if (level > 200) {
      return { label: "Elevated", variant: "default" as const };
    }
    return { label: "Normal", variant: "secondary" as const };
  };

  const latestFollowUp = patientJson.followUp[patientJson.followUp.length - 1];
  const treatmentType = patientJson.treatmentPlan.treatment
    .replace("Scheduled for ", "")
    .replace(" every 6 weeks", "");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/patients/${params.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Patient
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              {getProcedureIcon(treatmentType)}
              {treatmentType} Treatment
            </h1>
            <p className="text-slate-600">
              {patientJson.demographics.name} • Age{" "}
              {patientJson.demographics.age}
            </p>
          </div>
        </div>
      </div>

      {/* Patient Context Card */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-medium text-slate-900">
                  {patientJson.demographics.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {patientJson.demographics.gender} •{" "}
                  {patientJson.demographics.age} years •{" "}
                  {patientJson.demographics.bloodType}
                </p>
              </div>
              <div className="flex space-x-2">
                {patientJson.allergies[0] !== "None" &&
                  patientJson.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {allergy}
                    </Badge>
                  ))}
              </div>
            </div>
            <div className="text-right text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Started:{" "}
                  {new Date(
                    patientJson.treatmentPlan.date
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-4 h-4" />
                <span>Liver</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="treatment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="treatment"
            className="flex items-center space-x-2"
          >
            <Activity className="w-4 h-4" />
            <span>Treatment</span>
          </TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center space-x-2">
            <TestTube className="w-4 h-4" />
            <span>Lab Results</span>
          </TabsTrigger>
          <TabsTrigger value="imaging" className="flex items-center space-x-2">
            <ImageIcon className="w-4 h-4" />
            <span>Imaging</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="treatment" className="space-y-6">
          {/* Treatment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getProcedureIcon(treatmentType)}
                <span>Current Treatment Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Treatment Type
                  </label>
                  <p className="text-lg font-medium">{treatmentType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Frequency
                  </label>
                  <p className="text-lg">Every 6 weeks</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Treatment Progress
                </label>
                <div className="mt-2 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">
                      {latestFollowUp.note}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Last assessed:{" "}
                    {new Date(latestFollowUp.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Details by Type */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment Protocol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatmentType === "Radiofrequency ablation" && (
                  <>
                    <p className="text-slate-700">
                      Radiofrequency ablation (RFA) uses heat generated by
                      high-frequency electrical currents to destroy cancer
                      cells.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Procedure Details</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• Minimally invasive procedure</li>
                          <li>• CT or ultrasound guided</li>
                          <li>• Duration: 1-3 hours</li>
                          <li>• Local or general anesthesia</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Expected Outcomes</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• Tumor size reduction</li>
                          <li>• Minimal recovery time</li>
                          <li>• Can be repeated if needed</li>
                          <li>• Success rate: 85-90% for small tumors</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                {treatmentType === "TACE" && (
                  <>
                    <p className="text-slate-700">
                      Transarterial chemoembolization (TACE) delivers
                      chemotherapy directly to the liver tumor while blocking
                      its blood supply.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Procedure Details</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• Catheter-based procedure</li>
                          <li>• Targeted chemotherapy delivery</li>
                          <li>• Duration: 1-2 hours</li>
                          <li>• Requires hospitalization</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Expected Outcomes</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• Tumor shrinkage</li>
                          <li>• Slows tumor growth</li>
                          <li>• May require multiple sessions</li>
                          <li>• Bridge to transplant/surgery</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                {treatmentType === "Surgical resection" && (
                  <>
                    <p className="text-slate-700">
                      Surgical resection involves removing the tumor along with
                      a margin of healthy liver tissue.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Procedure Details</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• Major surgery under general anesthesia</li>
                          <li>• Laparoscopic or open approach</li>
                          <li>• Duration: 2-5 hours</li>
                          <li>• Hospital stay: 5-7 days</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Expected Outcomes</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• Complete tumor removal</li>
                          <li>• Best chance for cure</li>
                          <li>• Liver regeneration</li>
                          <li>• 5-year survival: 60-70%</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
                {treatmentType === "Immunotherapy" && (
                  <>
                    <p className="text-slate-700">
                      Immunotherapy uses medications to help the immune system
                      recognize and destroy cancer cells.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Treatment Details</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• IV infusion every 2-6 weeks</li>
                          <li>• Checkpoint inhibitors</li>
                          <li>• Duration: 30-90 minutes</li>
                          <li>• Outpatient treatment</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium mb-2">Expected Outcomes</h4>
                        <ul className="text-sm space-y-1 text-slate-600">
                          <li>• Immune system activation</li>
                          <li>• Tumor growth control</li>
                          <li>• Potential long-term response</li>
                          <li>• Response rate: 15-20%</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TestTube className="w-5 h-5" />
                <span>Laboratory Results Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientJson.labResults.map((lab, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{lab.type}</h4>
                      <span className="text-sm text-slate-600">
                        {new Date(lab.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs text-slate-600">AFP</label>
                        <div className="flex items-center gap-1">
                          <p
                            className={`font-medium ${
                              parseInt(lab.results.AFP) > 400
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            {lab.results.AFP}
                          </p>
                          {parseInt(lab.results.AFP) > 400 && (
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">ALT</label>
                        <p
                          className={`font-medium ${
                            parseInt(lab.results.ALT) > 100
                              ? "text-orange-600"
                              : ""
                          }`}
                        >
                          {lab.results.ALT}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">AST</label>
                        <p
                          className={`font-medium ${
                            parseInt(lab.results.AST) > 100
                              ? "text-orange-600"
                              : ""
                          }`}
                        >
                          {lab.results.AST}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600">
                          Bilirubin
                        </label>
                        <p
                          className={`font-medium ${
                            parseFloat(lab.results.Bilirubin) > 2.0
                              ? "text-orange-600"
                              : ""
                          }`}
                        >
                          {lab.results.Bilirubin}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Medical Imaging History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {patientJson.imaging.map((image, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-slate-500" />
                        {image.type}
                      </h4>
                      <span className="text-sm text-slate-600">
                        {new Date(image.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-700">{image.finding}</p>
                      {image.usefulData && (
                        <Badge variant="outline" className="text-xs">
                          Clinically Significant
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Complete Medical History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Medical History */}
                <div>
                  <h4 className="font-medium mb-3">Medical Conditions</h4>
                  <div className="space-y-2">
                    {patientJson.medicalHistory.map((history, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <span className="text-sm">{history.condition}</span>
                        <span className="text-xs text-slate-600">
                          {new Date(history.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Surgical History */}
                <div>
                  <h4 className="font-medium mb-3">Surgical History</h4>
                  <div className="space-y-2">
                    {patientJson.surgicalHistory.map((surgery, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <span className="text-sm">{surgery.procedure}</span>
                        <span className="text-xs text-slate-600">
                          {new Date(surgery.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Family History */}
                <div>
                  <h4 className="font-medium mb-3">Family History</h4>
                  <p className="text-sm text-slate-700 p-3 bg-slate-50 rounded-lg">
                    {patientJson.familyHistory}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
