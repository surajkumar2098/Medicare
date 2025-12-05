"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/landing/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Download, Clock, Users } from "lucide-react";

const DoctorResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <h1 className="text-4xl font-extrabold">Doctor Resources</h1>
              <p className="mt-2 text-blue-100 max-w-2xl">Curated clinical resources, protocols, templates and technical guides to help clinicians deliver high-quality telemedicine care on MediCare+.</p>
            </div>

            <div className="p-8 grid gap-8 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Onboarding</h3>
                <p className="text-sm text-gray-600">Checklist, identity verification steps, profile setup, and how to set availability and fees.</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Complete profile & credentials</li>
                  <li>Upload certificates and ID</li>
                  <li>Set availability & consultation types</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Clinical Guidance</h3>
                <p className="text-sm text-gray-600">Summaries and links to open-source clinical protocols, triage guides and telemedicine best practices.</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li><a className="text-blue-600 underline" href="https://www.who.int/" target="_blank" rel="noreferrer">World Health Organization</a></li>
                  <li><a className="text-blue-600 underline" href="https://www.nhs.uk/" target="_blank" rel="noreferrer">NHS clinical guidelines</a></li>
                  <li><a className="text-blue-600 underline" href="https://www.cdc.gov/" target="_blank" rel="noreferrer">CDC resources</a></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Legal & Compliance</h3>
                <p className="text-sm text-gray-600">Data protection, patient consent, and prescribing rules. Make sure to follow local laws and platform policies.</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Telemedicine consent templates</li>
                  <li>Data security & record retention</li>
                  <li>Prescribing and controlled substances guidance</li>
                </ul>
              </div>
            </div>

            <div className="p-8 border-t">
              <h2 className="text-2xl font-semibold mb-4">Downloads & Templates</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <a className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition" href="#">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Telemedicine Consent Template</p>
                      <p className="text-sm text-gray-500">Editable consent form for virtual consultations</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-50 text-blue-700">DOC</Badge>
                </a>

                <a className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition" href="#">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Clinical Triage Checklist</p>
                      <p className="text-sm text-gray-500">Step-by-step triage for common conditions</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700">PDF</Badge>
                </a>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Billing & Coding</h3>
                <p className="text-sm text-gray-600">Overview of billing considerations, common CPT codes used for telemedicine, and payer guidance. Refer to your local payer policies for exact billing rules.</p>
              </div>
            </div>

            <div className="p-8 border-t bg-gray-50">
              <h2 className="text-2xl font-semibold mb-4">Community & Support</h2>
              <p className="text-sm text-gray-600 mb-4">Join our clinician Slack, support channels, and monthly case discussions to collaborate with peers.</p>
              <div className="flex gap-3">
                <Link href="/signup/doctor">
                  <button className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-blue-700 text-white">Join as Doctor</button>
                </Link>

                <Link href="/contact">
                  <button className="px-4 py-2 rounded bg-white border">Contact Support</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorResourcesPage;
