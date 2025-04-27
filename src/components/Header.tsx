import React from 'react';
import { Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-4 px-4">
      <div className="flex items-center justify-center">
        <Clock size={24} className="text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Focus Timer</h1>
      </div>
    </header>
  );
};

export default Header;