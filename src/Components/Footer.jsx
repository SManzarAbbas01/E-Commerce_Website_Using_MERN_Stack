import React from 'react';

const Footer = () => {
  const companyLinks = ['Home', 'About Us', 'Delivery', 'Privacy Policy'];
  const contactDetails = ['+923337172908', 'leelafbylaiba@gmail.com'];

  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {companyLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">Get in Touch with Us</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {contactDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @leelaf.pk.com - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
