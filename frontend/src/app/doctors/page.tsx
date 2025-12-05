"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { userAuthStore } from "@/store/authStore";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const DoctorsPage = () => {
  const { isAuthenticated, user } = userAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login/patient");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent>
              <h1 className="text-2xl font-bold mb-4">Find Doctors</h1>
              <p className="text-gray-700 mb-4">Here are all available doctors on MediCare+.</p>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">This page is a placeholder listing. You can integrate a doctors listing API and search/filter UI here.</p>
              </div>

              <div className="mt-6">
                <Link href="/">
                  <button className="px-3 py-2 rounded bg-blue-600 text-white">Back</button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
