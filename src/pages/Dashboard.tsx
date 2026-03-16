import React from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle2, Circle, Clock, Flame, Target } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { goals, tasks, sessions } = useStore();

  const todayTasks = tasks.filter(
    (t) => format(new Date(t.scheduled_date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const completedToday = todayTasks.filter((t) => t.completion_status === 'Completed').length;
  const totalToday = todayTasks.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Welcome back. Here's your learning overview.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-400 font-medium text-sm">Today's Progress</h3>
            <Target className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-100 mt-4">
            {completedToday} <span className="text-zinc-500 text-lg">/ {totalToday}</span>
          </p>
          <div className="w-full bg-zinc-800 rounded-full h-2 mt-4">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${totalToday > 0 ? (completedToday / totalToday) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-400 font-medium text-sm">Active Goals</h3>
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-100 mt-4">{goals.length}</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-400 font-medium text-sm">Study Time (Today)</h3>
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-100 mt-4">
            {sessions.reduce((acc, s) => acc + s.duration_minutes, 0)} <span className="text-zinc-500 text-lg">min</span>
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-400 font-medium text-sm">Current Streak</h3>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-zinc-100 mt-4">
            3 <span className="text-zinc-500 text-lg">days</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">Today's Tasks</h2>
          <div className="space-y-4">
            {todayTasks.length === 0 ? (
              <p className="text-zinc-500 text-sm">No tasks scheduled for today.</p>
            ) : (
              todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50"
                >
                  {task.completion_status === 'Completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="ml-4 flex-1">
                    <p className={`font-medium ${task.completion_status === 'Completed' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">{task.description}</p>
                    <div className="flex items-center mt-3 space-x-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">
                        {task.estimated_time_minutes} min
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                        task.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400' :
                        task.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">Active Goals Progress</h2>
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h3 className="font-medium text-zinc-200">{goal.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Target: {format(new Date(goal.target_completion_date), 'MMM d, yyyy')}</p>
                  </div>
                  <span className="text-sm font-medium text-emerald-400">{goal.progress_percentage}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${goal.progress_percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
