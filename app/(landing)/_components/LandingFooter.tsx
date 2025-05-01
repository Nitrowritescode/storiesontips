import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";

const LandingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#000015] to-[#050530] text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-left max-lg:gap-8 md:place-items-center mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              StoriesOnTips
            </h3>
            <p className="text-white/70 max-w-xs">
              Transforming ideas into enchanting stories with our magical AI
              assistant. Create personalized, engaging, and age-appropriate
              stories in seconds.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.youtube.com/@storiesontips"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/create-story"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Create Story
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Story Library
                </Link>
              </li>
              <li>
                <Link
                  href="/buy-credits"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Buy Coins
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors flex items-center"
                >
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 max-md:hidden">
            <Image
              src="/landing/heroimagefinal.png"
              alt="footer logo image"
              width={250}
              height={250}
            />
          </div>
        
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} StoriesOnTips. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
