import React from 'react';
import { useTimer } from '../context/TimerContext';
import { Clock, BookOpen } from 'lucide-react';

const ModeSelector: React.FC = () => {
  const { mode, setMode } = useTimer();

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-100 p-1 rounded-full inline-flex">
        <button
          onClick={() => setMode('pomodoro')}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
            mode === 'pomodoro'
              ? 'bg-white text-blue-500 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Pomodoro mode"
        >
          <Clock size={20} className="mr-2" />
          <span className="font-medium">Pomodoro</span>
        </button>
        
        <button
          onClick={() => setMode('study')}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
            mode === 'study'
              ? 'bg-white text-blue-500 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Study mode"
        >
          <BookOpen size={20} className="mr-2" />
          <span className="font-medium">Study</span>
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;