"use client";
import React, { useState } from "react";
import Link from "next/link";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fallback: open mail client with prefilled message
    const subject = `Contact from ${name || "User"}`;
    const body = `${message}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
    window.location.href = `mailto:support@medicare.example?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h1 className="text-2xl font-extrabold">Contact Us</h1>
            <p className="mt-2 text-blue-100">We're here to help — send us a message and we'll get back to you shortly.</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="mt-1 block w-full rounded border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                >
                  Send Message
                </button>

                <Link href="/">
                  <button className="px-4 py-2 rounded bg-gray-100">Back Home</button>
                </Link>
              </div>

              {sent && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded">Your email client should open — if not, please email support@medicare.example directly.</div>
              )}
            </form>

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold">Other ways to reach us</h3>
              <p className="text-sm text-gray-600 mt-2">Email: <a className="text-blue-600 underline" href="mailto:support@medicare.example">support@medicare.example</a></p>
              <p className="text-sm text-gray-600">Phone: +1 (555) 123-4567</p>
              <p className="text-sm text-gray-600">Address: 123 Health Ave, Wellness City</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
