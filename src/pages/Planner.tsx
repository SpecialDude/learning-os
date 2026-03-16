import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, CheckCircle2, Circle, Clock, Flame } from 'lucide-react';

export default function Planner() {
  const { tasks, updateTask } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevDay = () => setSelectedDate(subDays(selectedDate, 1));
  const handleNextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const handleToday = () => setSelectedDate(new Date());

  const selectedTasks = tasks.filter((t) =>
    isSameDay(new Date(t.scheduled_date), selectedDate)
  );

  const toggleTaskStatus = (id: string, currentStatus: string) => {
    updateTask(id, {
      completion_status: currentStatus === 'Completed' ? 'Not Started' : 'Completed',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Daily Planner</h1>
          <p className="text-zinc-400 mt-2">Schedule and manage your daily learning tasks.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </header>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-zinc-100 min-w-[150px] text-center">
              {format(selectedDate, 'EEEE, MMM d')}
            </h2>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleToday}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors"
          >
            Today
          </button>
        </div>

        <div className="space-y-4">
          {selectedTasks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500 font-medium">No tasks scheduled for this day.</p>
              <button className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium">
                + Schedule a task
              </button>
            </div>
          ) : (
            selectedTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start p-5 rounded-xl border transition-all ${
                  task.completion_status === 'Completed'
                    ? 'bg-zinc-900/50 border-zinc-800/50 opacity-75'
                    : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
                }`}
              >
                <button
                  onClick={() => toggleTaskStatus(task.id, task.completion_status)}
                  className="mt-1 mr-4 flex-shrink-0 focus:outline-none"
                >
                  {task.completion_status === 'Completed' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-zinc-500 hover:text-zinc-400" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`text-lg font-medium ${
                        task.completion_status === 'Completed'
                          ? 'text-zinc-500 line-through'
                          : 'text-zinc-100'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center text-xs font-medium px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.estimated_time_minutes}m
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${
                          task.difficulty === 'Hard'
                            ? 'bg-red-500/10 text-red-400'
                            : task.difficulty === 'Medium'
                            ? 'bg-orange-500/10 text-orange-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {task.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="text-zinc-400 mt-2 text-sm">{task.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
