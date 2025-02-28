import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} StoriesOnTips. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 text-sm">
              Terms of Service
            </Link>
            <Link href="/about" className="hover:text-gray-400 text-sm">
              Contact
            </Link>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400" aria-label="LinkedIn">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-400" aria-label="YouTube">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
