import React from 'react';
import { useTimer } from '../context/TimerContext';

const TimerDisplay: React.FC = () => {
  const { currentTime, duration, state } = useTimer();
  
  // Format time as MM:SS
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate percentage for the circular progress
  const calculateProgress = (): number => {
    if (duration === 0) return 0;
    const progress = ((duration - currentTime) / duration) * 100;
    return Math.min(100, Math.max(0, progress)); // Ensure between 0-100
  };

  // Calculate SVG path for the circular progress
  const calculateCirclePath = (): string => {
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const progress = calculateProgress();
    const dashoffset = circumference * (1 - progress / 100);
    
    return `
      M 150,30
      a 120,120 0 1,1 -0.1,0
    `;
  };

  const progress = calculateProgress();
  const strokeDasharray = 2 * Math.PI * 120;
  const strokeDashoffset = strokeDasharray * (1 - progress / 100);

  return (
    <div className="relative w-full flex justify-center items-center mb-8">
      <div className="relative w-80 h-80">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            className="transition-all duration-300"
          />
          {/* Progress circle */}
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke={state === 'running' ? '#3b82f6' : '#9ca3af'}
            strokeWidth="12"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
            transform="rotate(-90 150 150)"
          />
        </svg>
        
        {/* Timer display */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-6xl font-bold text-gray-800 transition-all duration-200">
            {formatTime(currentTime)}
          </div>
          <div className={`mt-2 text-lg font-medium ${state === 'running' ? 'text-blue-500' : 'text-gray-500'}`}>
            {state === 'idle' && 'Ready'}
            {state === 'running' && 'Focus'}
            {state === 'paused' && 'Paused'}
            {state === 'finished' && 'Completed!'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;