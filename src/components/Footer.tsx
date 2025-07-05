// src/components/Footer.tsx
import React from "react";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center space-y-3 px-4">
        <p className="text-sm">
          Made with <span className="text-red-400"></span> by{" "}
          <strong className="text-blue-300">MohamedSilar</strong>
        </p>

        <div className="flex items-center gap-6 text-xl">
          <a
            href="https://www.linkedin.com/in/mohamed-silar-374a09284/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:mohamedsilar26@gmail.com"
            className="hover:text-green-400 transition text-sm flex items-center gap-2"
            title="Send Email"
          >
            mohamedsilar26@gmail.com
          </a>

          <a
            href="https://silar.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition"
            title="Portfolio"
          >
            <FaGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
