import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20  border-t border-gray-700 mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-center lg:px-24 px-4">
          <p className="">
            &copy; {new Date().getFullYear()} StoriesOnTips.
            <br />
            All rights reserved.
          </p>
          <div className="">
            <h1 className="font-semibold capitalize text-white text-l lg:text-xl py-2">
              Quick Links
            </h1>
            <div className="flex flex-col space-y-2">
              <Link href="/create-story" className="hover:text-gray-400">
                Create Story
              </Link>
              <Link href="/explore" className="hover:text-gray-400">
                Story Library
              </Link>

              <Link href="/buy-credits" className="hover:text-gray-400">
                Buy Coins
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold capitalize text-white text-l lg:text-xl py-2">
              Follow Us
            </h1>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.youtube.com/@storiesontips"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white flex gap-2 mb-10 hover:text-gray-300"
              >
                <FaYoutube size={24} /> Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
