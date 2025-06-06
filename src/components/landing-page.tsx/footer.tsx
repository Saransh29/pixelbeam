"use client";

import { IconBrandLinkedin } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="max-w-7xl bg-transparent py-16 dark:bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: About */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-700 dark:text-slate-300">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Blog / Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-700 dark:text-slate-300">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Use Cases
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-700 dark:text-slate-300">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-600 transition-colors duration-200 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: CTA / Logo */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-700 dark:text-slate-300">
              Pixelbeam
            </h3>
            <p className="mb-5 text-neutral-600 dark:text-neutral-400">
              Pixelbeam provides interactive landing pages
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={24} />
              </a>
              {/* Optionally add X / Twitter icon here */}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-200/80 pt-8 text-center text-sm text-neutral-600 dark:border-neutral-800/80 dark:text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} Pixelbeam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
