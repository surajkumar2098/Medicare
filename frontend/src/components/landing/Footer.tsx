"use client";
import { contactInfo, footerSections, socials } from "@/lib/constant";
import { Stethoscope } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { userAuthStore } from "@/store/authStore";

const Footer = () => {
  const router = useRouter();
  const { isAuthenticated, user } = userAuthStore();

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    // Treat support center/assistant link specially: require auth
    if (href === "/assistant") {
      e.preventDefault();
      if (isAuthenticated) {
        router.push("/assistant");
      } else {
        router.push("/login/patient");
      }
      return;
    }

    // Require auth for viewing all doctors — authenticated patients go to /doctor-list
    if (href === "/doctors") {
      e.preventDefault();
      if (!isAuthenticated) {
        router.push("/login/patient");
        return;
      }

      if (user && user.type === "patient") {
        router.push("/doctor-list");
      } else {
        // fallback for other authenticated users
        router.push("/doctors");
      }
      return;
    }

    // Require auth for Doctor Resources (any authenticated user)
    if (href === "/doctor-resources") {
      e.preventDefault();
      if (!isAuthenticated) {
        router.push("/login/patient");
        return;
      }

      router.push("/doctor-resources");
      return;
    }

    // For other internal links, use client routing
    if (href && href.startsWith("/")) {
      e.preventDefault();
      router.push(href);
    }
  };

  // subscription state
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (showToast) {
      t = setTimeout(() => setShowToast(false), 5000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [showToast]);

  const handleSubscribe = () => {
    // simple gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!email || !gmailRegex.test(email.trim())) {
      setError("Please enter a valid Gmail address (example@gmail.com)");
      return;
    }

    // Success: show toast
    setError("");
    setShowToast(true);
    setEmail("");
  };

  return (
    <>
      {/* Top fixed toast (slides down) */}
      <div aria-live="assertive" className="pointer-events-none fixed inset-x-0 top-4 flex justify-center z-50">
        <div className={`pointer-events-auto max-w-xl w-full mx-4 transition transform ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}>
          <div className="rounded-md bg-green-600 text-white px-4 py-2 shadow-lg flex items-center justify-between">
            <div className="text-sm">Subscribed successfully</div>
            <button
              aria-label="Dismiss"
              onClick={() => setShowToast(false)}
              className="text-white/90 hover:text-white ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600  rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-br from-white to-blue-100  bg-clip-text text-transparent">
                  MediCare+
                </div>
              </div>

              <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                Your trusted healthcare partner providing quality medical
                consultations with certified doctors online, anytime, anywhere.
              </p>

              <div className="space-y-3 mb-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-blue-100"
                  >
                    <item.icon className="w-4 h-4 text-blue-300" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links section */}

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-white mb-4 text-lg">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href === "/doctors" ? "/doctor-list" : link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-blue-200 hover:text-white transition-colors duration-200 text-sm hover:underline"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newslesster section */}

        <div className="py-8 border-t border-blue-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-blue-200 text-sm">
                Get health tips and product updates delivered to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-start">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  aria-label="Subscribe email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your gmail"
                  className="px-4 py-2 rounded-lg bg-blue-800/50 border border-blue-600 text-white placeholder:blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-w-[280px]"
                />

                <Button
                  onClick={handleSubscribe}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>

              <div className="w-full md:w-auto">
                {error && (
                  <div className="mt-2 text-sm text-red-200 bg-red-900/20 px-3 py-2 rounded">
                    {error}
                  </div>
                )}

                {/* toast is rendered at top of viewport */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}

        <div className="py-6 border-t border-blue-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-blue-200 text-sm">
              <p>&copy; 2025 MediCare+, Inc. All rights resetved</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-blue-200 text-sm">Follow Us:</span>
              <div className="flex space-x-3">
                {socials.map(({ name, icon: Icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-700/50 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={`Follow use on ${name}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
