"use client";
import React from "react";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-10 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
              <p className="mt-2 text-indigo-100">Effective date: November 20, 2025</p>
            </div>

            <div className="p-8 space-y-6">
              <p className="text-gray-700">
                MediCare+ respects your privacy and is committed to protecting the personal information you share with us. This page explains what we collect, how we use it, and your choices.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Information We Collect</h3>
                  <p className="text-sm text-gray-600">Account details, contact info, health data necessary for care, and technical/device data (logs, IPs).</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">How We Use Data</h3>
                  <p className="text-sm text-gray-600">To provide care, manage appointments, process payments, improve services, and ensure safety and compliance.</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Cookies & Tracking</h3>
                <p className="text-sm text-gray-600">We use cookies for core functionality, preferences and analytics. You can manage cookies via your browser settings.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Data Security & Retention</h3>
                <p className="text-sm text-gray-600">We implement reasonable technical and organizational measures; retention periods depend on the data type and legal requirements.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Your Rights</h3>
                <p className="text-sm text-gray-600">Access, correction, deletion, and portability where applicable. Contact support to exercise these rights.</p>
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

export default PrivacyPage;
