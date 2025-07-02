import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image Banner */}
        <div className="relative h-40 lg:col-span-2 lg:h-full">
          <img
            src="https://images.unsplash.com/photo-1642370324100-324b21fab3a9"
            alt="Footer banner"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Info and Links */}
        <div className="px-6 py-12 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <p className="mt-2 text-xl font-medium hover:underline">0123456789</p>
              <ul className="mt-4 text-sm text-gray-400">
                <li>Mon–Fri: 10am - 5pm</li>
                <li>Weekend: 10am - 3pm</li>
              </ul>

              {/* Social Links */}
              <div className="mt-4 flex gap-4">
                {[
                  { label: 'Facebook', icon: 'facebook', url: '#' },
                  { label: 'Instagram', icon: 'instagram', url: '#' },
                  { label: 'Twitter', icon: 'twitter', url: '#' },
                  { label: 'GitHub', icon: 'github', url: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-75"
                    aria-label={social.label}
                  >
                    <i className={`fab fa-${social.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium">Services</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:underline">1on1 Coaching</a></li>
                  <li><a href="#" className="hover:underline">Company Review</a></li>
                  <li><a href="#" className="hover:underline">HR Consulting</a></li>
                  <li><a href="#" className="hover:underline">SEO Optimisation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Company</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:underline">About</a></li>
                  <li><a href="#" className="hover:underline">Meet the Team</a></li>
                  <li><a href="#" className="hover:underline">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
            <ul className="flex gap-4 mb-4 md:mb-0">
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul>
            <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
