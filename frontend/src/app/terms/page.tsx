"use client";
import React from "react";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-10 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <h1 className="text-3xl font-extrabold">Terms of Service</h1>
              <p className="mt-2 text-indigo-100">Last updated: November 20, 2025</p>
            </div>

            <div className="p-8 space-y-6">
              <p className="text-gray-700">These Terms govern your access to and use of MediCare+. By using the Services you agree to these Terms. Please read them carefully.</p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Eligibility & Account</h3>
                  <p className="text-sm text-gray-600">You must be 18+. Maintain your account credentials and notify us of unauthorized access.</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Services & Medical Disclaimer</h3>
                  <p className="text-sm text-gray-600">Services provide telemedicine connections; clinical judgment and treatment decisions are made by independent providers.</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Payments & Prescriptions</h3>
                <p className="text-sm text-gray-600">Scheduling, cancellations and payments follow policies at booking. Prescriptions are provided at clinician discretion.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">User Conduct & Termination</h3>
                <p className="text-sm text-gray-600">Do not use the Services unlawfully or harmfully. We may suspend accounts violating policies.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Liability & Indemnification</h3>
                <p className="text-sm text-gray-600">Our liability is limited; users indemnify us for claims arising from misuse.</p>
              </div>

              <div className="flex items-center justify-between">
                <a className="text-sm text-gray-600" href="mailto:support@medicare.example">support@medicare.example</a>
                <Link href="/">
                  <button className="px-4 py-2 rounded bg-gradient-to-r from-indigo-600 to-blue-700 text-white">Back Home</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
