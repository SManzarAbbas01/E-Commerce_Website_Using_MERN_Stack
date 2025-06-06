import React from 'react';
import { Link } from 'react-router-dom'; // Assuming these links are meant to navigate

const Footer = () => {
  const companyLinks = ['Home', 'About Us', 'Delivery', 'Privacy Policy'];
  const contactDetails = ['+923337172908', 'leelafbylaiba@gmail.com'];

  return (
    <footer className="bg-[#FFC0CB] text-gray-800 px-6 py-10 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {/* Company Links Section */}
        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {companyLinks.map((linkName, index) => (
              <li key={index}>
                {/* Assuming these are navigation links within your app */}
                <Link to={`/${linkName.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-black transition-colors duration-200">
                  {linkName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">Get in Touch with Us</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {contactDetails.map((detail, index) => (
              <li key={index}>
                {/* Making contact details clickable */}
                {detail.startsWith('+') ? ( // Simple check for phone number
                  <a href={`tel:${detail}`} className="hover:text-black transition-colors duration-200">{detail}</a>
                ) : ( // Assume email
                  <a href={`mailto:${detail}`} className="hover:text-black transition-colors duration-200">{detail}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom - Copyright */}
      <div className="mt-10 pt-6 border-t border-gray-300">
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright &copy; {new Date().getFullYear()} @leelaf.pk.com - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;