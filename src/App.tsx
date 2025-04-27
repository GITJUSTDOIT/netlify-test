import React from 'react';
import { TimerProvider } from './context/TimerContext';
import TimerContainer from './components/TimerContainer';

function App() {
  return (
    <TimerProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
        <TimerContainer />
      </div>
    </TimerProvider>
  );
}

export default App;