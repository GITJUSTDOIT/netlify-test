import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ModeSelector from './ModeSelector';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import StudySettings from './StudySettings';
import { useTimer } from '../context/TimerContext';

const TimerContainer: React.FC = () => {
  const { mode } = useTimer();
  
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 md:px-8 max-w-md mx-auto w-full">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center pb-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <ModeSelector />
          <TimerDisplay />
          <TimerControls />
          <StudySettings />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TimerContainer;