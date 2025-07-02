import React from 'react';

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact Us", href: "/contact" },
];

function Navbar() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="text-gray-800 font-bold text-lg flex items-center">
              <svg
                className="h-8 w-8 mr-2 text-indigo-600"
                viewBox="0 0 28 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.41 10.3847...Z" />
              </svg>
              MyStore
            </a>
          </div>

          {/* Nav items */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Login
            </a>
            <a
              href="/register"
              className="hidden sm:inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Register
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
