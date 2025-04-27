export type TimerMode = 'pomodoro' | 'study';

export type TimerState = 'idle' | 'running' | 'paused' | 'finished';

export interface TimerSettings {
  pomodoroWork: number; // minutes
  pomodoroShortBreak: number; // minutes
  pomodoroLongBreak: number; // minutes
  studyDuration: number; // minutes
  studySeconds: number; // seconds
}

export interface TimerContextType {
  mode: TimerMode;
  state: TimerState;
  currentTime: number; // seconds
  duration: number; // seconds
  settings: TimerSettings;
  setMode: (mode: TimerMode) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
  updateStudyDuration: (minutes: number, seconds: number) => void;
}