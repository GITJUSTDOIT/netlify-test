import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TimerContextType, TimerMode, TimerState, TimerSettings } from '../types/timer';

const defaultSettings: TimerSettings = {
  pomodoroWork: 25,
  pomodoroShortBreak: 1,
  pomodoroLongBreak: 15,
  studyDuration: 30,
  studySeconds: 0,
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [state, setState] = useState<TimerState>('idle');
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [currentTime, setCurrentTime] = useState(defaultSettings.pomodoroWork * 60);
  const [duration, setDuration] = useState(defaultSettings.pomodoroWork * 60);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    resetTimer();
  }, [mode]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const tick = () => {
    setCurrentTime((prevTime) => {
      if (prevTime <= 1) {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
        setState('finished');
        playNotificationSound();
        return 0;
      }
      return prevTime - 1;
    });
  };

  const startTimer = () => {
    if (state === 'running') return;
    
    setState('running');
    const id = window.setInterval(tick, 1000);
    setIntervalId(id);
  };

  const pauseTimer = () => {
    if (state !== 'running') return;
    
    setState('paused');
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    setState('idle');
    
    if (mode === 'pomodoro') {
      setDuration(settings.pomodoroWork * 60);
      setCurrentTime(settings.pomodoroWork * 60);
    } else if (mode === 'study') {
      const totalSeconds = (settings.studyDuration * 60) + settings.studySeconds;
      setDuration(totalSeconds);
      setCurrentTime(totalSeconds);
    }
  };

  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    setSettings({ ...settings, ...newSettings });
    resetTimer();
  };

  const updateStudyDuration = (minutes: number, seconds: number = 0) => {
    const validMinutes = Math.min(180, Math.max(0, minutes));
    const validSeconds = Math.min(59, Math.max(0, seconds));
    
    // Ensure at least 1 second total duration
    if (validMinutes === 0 && validSeconds === 0) {
      setSettings({ ...settings, studyDuration: 0, studySeconds: 1 });
    } else {
      setSettings({ ...settings, studyDuration: validMinutes, studySeconds: validSeconds });
    }

    if (mode === 'study') {
      const totalSeconds = (validMinutes * 60) + validSeconds;
      setDuration(totalSeconds);
      setCurrentTime(totalSeconds);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(error => console.error('Error playing notification:', error));
  };

  return (
    <TimerContext.Provider
      value={{
        mode,
        state,
        currentTime,
        duration,
        settings,
        setMode,
        startTimer,
        pauseTimer,
        resetTimer,
        updateSettings,
        updateStudyDuration,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};