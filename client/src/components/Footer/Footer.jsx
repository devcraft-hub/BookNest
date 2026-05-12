import React from "react";

function Footer() {

  return (

    <footer className="bg-zinc-900 border-t border-zinc-800 text-white py-4">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-3">

        {/* Logo */}

        <h1 className="text-xl font-bold tracking-wide cursor-pointer hover:scale-105 transition-all duration-300">

          BookNest 📚

        </h1>

        {/* Copyright */}

        <p className="text-zinc-400 text-sm text-center">

          © 2026 BookNest. All rights reserved.

        </p>

        {/* Email */}

        <p className="text-zinc-400 text-sm hover:text-blue-400 transition-all duration-300 cursor-pointer">

          📧 ks3948166@gmail.com

        </p>

      </div>

    </footer>
  );
}

export default Footer;