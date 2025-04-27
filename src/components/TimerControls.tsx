import React from 'react';
import { useTimer } from '../context/TimerContext';
import { Play, Pause, RotateCcw } from 'lucide-react';

const TimerControls: React.FC = () => {
  const { state, startTimer, pauseTimer, resetTimer } = useTimer();

  return (
    <div className="flex justify-center items-center space-x-6">
      {state === 'running' ? (
        <button
          onClick={pauseTimer}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Pause timer"
        >
          <Pause size={24} />
        </button>
      ) : (
        <button
          onClick={startTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Start timer"
        >
          <Play size={24} />
        </button>
      )}
      
      <button
        onClick={resetTimer}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Reset timer"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};

export default TimerControls;