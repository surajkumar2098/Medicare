"use client";
import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h1 className="text-4xl font-extrabold">About MediCare+</h1>
            <p className="mt-2 text-blue-100 max-w-2xl">Connecting patients and clinicians through secure, convenient telemedicine.</p>
          </div>

          <div className="p-8 space-y-6">
            <p className="text-gray-700">MediCare+ provides on-demand tele-consultations, secure messaging, and a streamlined booking experience. We focus on accessibility, patient safety, and high-quality care.</p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Our Mission</h3>
                <p className="text-sm text-gray-600">Make healthcare accessible anywhere, by connecting patients with licensed practitioners.</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Our Values</h3>
                <p className="text-sm text-gray-600">Safety, privacy, accessibility, and quality care.</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: <a className="text-blue-600 underline" href="mailto:support@medicare.example">support@medicare.example</a></li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Health Ave, Wellness City</li>
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/">
                <button className="px-4 py-2 rounded bg-white border">Back Home</button>
              </Link>

              <Link href="/doctor-resources">
                <button className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-blue-700 text-white">Doctor Resources</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
