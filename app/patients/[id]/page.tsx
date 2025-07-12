"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  AlertTriangle,
  FileText,
  Activity,
  Heart,
  Droplets,
  TrendingDown,
  Cigarette,
  Wine,
  TestTube,
  User,
} from "lucide-react";
import Link from "next/link";
import patientDataJson from "@/data/data.json";
import { Body3D } from "@/components/body-3d";

export default function PatientPage({ params }: { params: { id: string } }) {
  const patientJson = patientDataJson.patients[params.id as keyof typeof patientDataJson.patients];

  if (!patientJson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Patient not found</h2>
          <p className="text-slate-600 mb-4">The patient ID {params.id} does not exist in our records.</p>
          <Button asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get latest lab results
  const latestLabResults = patientJson.labResults[patientJson.labResults.length - 1];
  const latestFollowUp = patientJson.followUp[patientJson.followUp.length - 1];
  
  function getAFPStatus(afpLevel: string): { label: string; variant: "default" | "destructive" | "secondary" } {
    const level = parseInt(afpLevel);
    if (level > 400) {
      return { label: "High Risk", variant: "destructive" };
    } else if (level > 200) {
      return { label: "Elevated", variant: "default" };
    }
    return { label: "Normal", variant: "secondary" };
  }

  function getLiverFunctionStatus(alt: string, ast: string): { label: string; variant: "default" | "destructive" | "secondary" } {
    const altLevel = parseInt(alt);
    const astLevel = parseInt(ast);
    if (altLevel > 100 || astLevel > 100) {
      return { label: "Critical", variant: "destructive" };
    } else if (altLevel > 80 || astLevel > 80) {
      return { label: "Elevated", variant: "default" };
    }
    return { label: "Normal", variant: "secondary" };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">{patientJson.demographics.name}</h1>
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Age
                  </label>
                  <p className="text-lg">{patientJson.demographics.age}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Gender
                  </label>
                  <p className="text-lg">{patientJson.demographics.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Blood Type
                  </label>
                  <p className="text-lg">{patientJson.demographics.bloodType}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Height
                  </label>
                  <p className="text-lg">{patientJson.demographics.height}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Weight
                  </label>
                  <p className="text-lg">{patientJson.demographics.weight}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Medical Conditions
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patientJson.medicalHistory.filter(h => h.usefulData).map((history, index) => (
                    <Badge key={index} variant="secondary">
                      {history.condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Allergies
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patientJson.allergies[0] === "None" ? (
                    <Badge variant="outline">No known allergies</Badge>
                  ) : (
                    patientJson.allergies.map((allergy, index) => (
                      <Badge
                        key={index}
                        variant="destructive"
                        className="flex items-center space-x-1"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>{allergy}</span>
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-medium text-slate-600">
                  Lifestyle Factors
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Cigarette className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">{patientJson.smokingAlcohol.smoking}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wine className="w-4 h-4 text-slate-500" />
                    <span className="text-sm">{patientJson.smokingAlcohol.alcohol}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Lab Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TestTube className="w-5 h-5" />
                <span>Latest Lab Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {latestLabResults && (
                <>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Date:</span>
                    <span className="font-medium">{new Date(latestLabResults.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">AFP Level</span>
                        <Badge variant={getAFPStatus(latestLabResults.results.AFP).variant}>
                          {getAFPStatus(latestLabResults.results.AFP).label}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium">{latestLabResults.results.AFP}</span>
                        {parseInt(latestLabResults.results.AFP) > 400 && (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">Liver Function</span>
                        <Badge 
                          variant={getLiverFunctionStatus(latestLabResults.results.ALT, latestLabResults.results.AST).variant}
                        >
                          {getLiverFunctionStatus(latestLabResults.results.ALT, latestLabResults.results.AST).label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">ALT:</span>
                          <span className="font-medium">{latestLabResults.results.ALT}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">AST:</span>
                          <span className="font-medium">{latestLabResults.results.AST}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Bilirubin:</span>
                      <span className={`font-medium ${parseFloat(latestLabResults.results.Bilirubin) > 2.0 ? 'text-orange-600' : ''}`}>
                        {latestLabResults.results.Bilirubin}
                      </span>
                    </div>
                  </div>
                </>
              )}
              
              {latestFollowUp && (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-slate-800">Treatment Progress</span>
                  </div>
                  <p className="text-sm text-slate-600">{latestFollowUp.note}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Last follow-up: {new Date(latestFollowUp.date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medical Events History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Medical Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Surgical History */}
              {patientJson.surgicalHistory.map((surgery, index) => (
                <div
                  key={`surgery-${index}`}
                  className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{surgery.procedure}</h3>
                    <Badge variant="default">Surgery</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(surgery.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Imaging History */}
              {patientJson.imaging.filter(img => img.usefulData).map((imaging, index) => (
                <div
                  key={`imaging-${index}`}
                  className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{imaging.type}: {imaging.finding}</h3>
                    <Badge variant="secondary">Imaging</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(imaging.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Body Overview & Treatment Plan */}
        <div className="space-y-6">
          {/* 3D Body Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Body Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Body3D patientId={params.id} />
            </CardContent>
          </Card>
          
          {/* Treatment Plan Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Current Treatment Plan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Treatment Type
                </label>
                <p className="text-lg font-medium mt-1">{patientJson.treatmentPlan.treatment}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Started Date
                </label>
                <p className="text-sm mt-1">
                  {new Date(patientJson.treatmentPlan.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-slate-600">
                  Family History
                </label>
                <p className="text-sm mt-1 text-slate-700">
                  {patientJson.familyHistory}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
