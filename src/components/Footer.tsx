import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-4 mt-auto text-center text-sm text-gray-500">
      <p>© {year} Focus Timer. All rights reserved.</p>
    </footer>
  );
};

export default Footer;