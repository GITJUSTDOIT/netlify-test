import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { Timer, Minus, Plus, Edit2 } from 'lucide-react';

const StudySettings: React.FC = () => {
  const { mode, settings, updateStudyDuration } = useTimer();
  const [showSettings, setShowSettings] = useState(false);
  const [isEditingMinutes, setIsEditingMinutes] = useState(false);
  const [isEditingSeconds, setIsEditingSeconds] = useState(false);
  const [minutesInput, setMinutesInput] = useState(settings.studyDuration.toString());
  const [secondsInput, setSecondsInput] = useState(settings.studySeconds.toString());
  
  if (mode !== 'study') return null;

  const handleIncrement = () => {
    if (settings.studyDuration < 180) {
      updateStudyDuration(settings.studyDuration + 1, settings.studySeconds);
      setMinutesInput((settings.studyDuration + 1).toString());
    }
  };

  const handleDecrement = () => {
    if (settings.studyDuration > 0 || settings.studySeconds > 0) {
      updateStudyDuration(settings.studyDuration - 1, settings.studySeconds);
      setMinutesInput((settings.studyDuration - 1).toString());
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMinutesInput(value);
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSecondsInput(value);
    }
  };

  const handleMinutesBlur = () => {
    let newMinutes = parseInt(minutesInput, 10);
    if (isNaN(newMinutes)) newMinutes = 0;
    newMinutes = Math.min(180, Math.max(0, newMinutes));
    updateStudyDuration(newMinutes, settings.studySeconds);
    setMinutesInput(newMinutes.toString());
    setIsEditingMinutes(false);
  };

  const handleSecondsBlur = () => {
    let newSeconds = parseInt(secondsInput, 10);
    if (isNaN(newSeconds)) newSeconds = 0;
    newSeconds = Math.min(59, Math.max(0, newSeconds));
    updateStudyDuration(settings.studyDuration, newSeconds);
    setSecondsInput(newSeconds.toString());
    setIsEditingSeconds(false);
  };

  const handleKeyDown = (handler: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handler();
    }
  };

  return (
    <div className="mt-6 mb-4">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center mx-auto px-4 py-2 text-sm text-gray-600 hover:text-blue-500 focus:outline-none transition-colors duration-200"
      >
        <Timer size={16} className="mr-2" />
        <span>{showSettings ? 'Hide Settings' : 'Adjust Time'}</span>
      </button>
      
      {showSettings && (
        <div className="mt-4 flex flex-col items-center p-4 bg-gray-50 rounded-xl animated fadeIn">
          <p className="text-gray-700 mb-3">Study Duration</p>
          
          <div className="flex items-center">
            <button
              onClick={handleDecrement}
              disabled={settings.studyDuration === 0 && settings.studySeconds === 0}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 focus:outline-none"
              aria-label="Decrease time"
            >
              <Minus size={18} />
            </button>
            
            <div className="mx-4 flex items-center space-x-2">
              <div className="relative">
                {isEditingMinutes ? (
                  <input
                    type="text"
                    value={minutesInput}
                    onChange={handleMinutesChange}
                    onBlur={handleMinutesBlur}
                    onKeyDown={handleKeyDown(handleMinutesBlur)}
                    className="w-16 text-center font-semibold text-xl text-gray-800 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center">
                    <span className="font-semibold text-xl text-gray-800 min-w-[2ch]">
                      {settings.studyDuration}
                    </span>
                    <button
                      onClick={() => setIsEditingMinutes(true)}
                      className="ml-1 p-1 text-gray-400 hover:text-blue-500 focus:outline-none"
                      aria-label="Edit minutes"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                )}
                <span className="text-gray-600 ml-1">min</span>
              </div>

              <div className="relative">
                {isEditingSeconds ? (
                  <input
                    type="text"
                    value={secondsInput}
                    onChange={handleSecondsChange}
                    onBlur={handleSecondsBlur}
                    onKeyDown={handleKeyDown(handleSecondsBlur)}
                    className="w-16 text-center font-semibold text-xl text-gray-800 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center">
                    <span className="font-semibold text-xl text-gray-800 min-w-[2ch]">
                      {settings.studySeconds.toString().padStart(2, '0')}
                    </span>
                    <button
                      onClick={() => setIsEditingSeconds(true)}
                      className="ml-1 p-1 text-gray-400 hover:text-blue-500 focus:outline-none"
                      aria-label="Edit seconds"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                )}
                <span className="text-gray-600 ml-1">sec</span>
              </div>
            </div>
            
            <button
              onClick={handleIncrement}
              disabled={settings.studyDuration >= 180}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 focus:outline-none"
              aria-label="Increase time"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            Set time between 1 second and 180 minutes
          </p>
        </div>
      )}
    </div>
  );
};

export default StudySettings;