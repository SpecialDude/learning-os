import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Play, Pause, Square, RefreshCcw, CheckCircle2 } from 'lucide-react';

export default function Timer() {
  const { tasks, addSession } = useStore();
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);

  const activeTasks = tasks.filter((t) => t.completion_status !== 'Completed');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  const handleStart = () => {
    if (!selectedTaskId) {
      alert('Please select a task first.');
      return;
    }
    setIsActive(true);
    setIsPaused(false);
    if (!startTime) setStartTime(new Date().toISOString());
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(25 * 60);
    setStartTime(null);
  };

  const handleComplete = () => {
    if (startTime && selectedTaskId) {
      const duration = Math.round((25 * 60 - timeLeft) / 60);
      addSession({
        task_id: selectedTaskId,
        start_time: startTime,
        end_time: new Date().toISOString(),
        duration_minutes: duration > 0 ? duration : 1,
        focus_score: 85, // Mock score
      });
      alert('Session logged successfully!');
    }
    handleReset();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Deep Work Timer</h1>
        <p className="text-zinc-400 mt-2">Focus on one task. Eliminate distractions.</p>
      </header>

      <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8">
            <label className="block text-sm font-medium text-zinc-400 mb-2 text-center">
              Current Task
            </label>
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              disabled={isActive}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 appearance-none"
            >
              <option value="" disabled>Select a task to focus on...</option>
              {activeTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center mb-12">
            <div className="text-8xl font-mono font-bold tracking-tighter text-zinc-100 tabular-nums">
              {formatTime(timeLeft)}
            </div>
            <p className="text-zinc-500 mt-4 font-medium uppercase tracking-widest text-sm">
              {isActive && !isPaused ? 'Focusing' : isPaused ? 'Paused' : 'Ready'}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-6">
            {!isActive || isPaused ? (
              <button
                onClick={handleStart}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-zinc-950 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-8 h-8 ml-1" />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="w-16 h-16 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-zinc-950 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
              >
                <Pause className="w-8 h-8" />
              </button>
            )}

            <button
              onClick={handleReset}
              disabled={!isActive}
              className="w-16 h-16 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 flex items-center justify-center text-zinc-300 transition-transform hover:scale-105 active:scale-95"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>

            <button
              onClick={handleComplete}
              disabled={!isActive}
              className="w-16 h-16 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 flex items-center justify-center text-zinc-300 transition-transform hover:scale-105 active:scale-95"
            >
              <CheckCircle2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
