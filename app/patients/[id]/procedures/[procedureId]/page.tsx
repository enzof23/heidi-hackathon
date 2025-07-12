"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  Database,
  ImageIcon,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { patientData } from "@/data";
import { procedureData } from "@/data";

export default function ProcedurePage({
  params,
}: {
  params: { id: string; procedureId: string };
}) {
  const procedure =
    procedureData[params.procedureId as keyof typeof procedureData];
  const patient = patientData[params.id as keyof typeof patientData];

  if (!procedure || !patient) {
    return <div>Procedure not found</div>;
  }

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
            <h1 className="text-3xl font-bold text-slate-900">
              {procedure.title}
            </h1>
            <p className="text-slate-600">
              {patient.name} • Age {patient.age}
            </p>
          </div>
        </div>
      </div>

      {/* Patient Context Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-medium text-slate-900">{patient.name}</h3>
                <p className="text-sm text-slate-600">Age {patient.age}</p>
              </div>
              <div className="flex space-x-2">
                {patient.conditions.map((condition, index) => (
                  <Badge key={index} variant="secondary">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(procedure.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{procedure.bodyPart}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Summary</span>
          </TabsTrigger>
          <TabsTrigger value="sources" className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>Sources</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Procedure Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Procedure Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Surgeon
                  </label>
                  <p className="text-lg">{procedure.surgeon}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        procedure.status === "Completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {procedure.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Summary
                </label>
                <p className="text-slate-700 mt-1">{procedure.summary}</p>
              </div>
            </CardContent>
          </Card>

          {/* Procedure Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pre-Operative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{procedure.details.preOp}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Procedure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{procedure.details.procedure}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post-Operative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{procedure.details.postOp}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{procedure.details.nextSteps}</p>
              </CardContent>
            </Card>
          </div>

          {/* Imaging */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Medical Imaging</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {procedure.images.map((image, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg p-4 text-center"
                  >
                    <div className="w-full h-32 bg-slate-100 rounded-lg mb-3 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <h4 className="font-medium text-slate-900">{image.type}</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {image.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Data Sources & Documentation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {procedure.sources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-slate-500" />
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {source.type}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {source.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">
                        {new Date(source.date).toLocaleDateString()}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1 bg-transparent"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
