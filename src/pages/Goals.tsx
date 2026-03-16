import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Target, ChevronDown, ChevronRight, Calendar, Flag } from 'lucide-react';
import { format } from 'date-fns';

export default function Goals() {
  const { goals, milestones, tasks } = useStore();
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());

  const toggleGoal = (id: string) => {
    const next = new Set(expandedGoals);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedGoals(next);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Learning Goals</h1>
          <p className="text-zinc-400 mt-2">Define your long-term objectives and break them down.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          New Goal
        </button>
      </header>

      <div className="space-y-6">
        {goals.map((goal) => {
          const goalMilestones = milestones.filter((m) => m.goal_id === goal.id);
          const isExpanded = expandedGoals.has(goal.id);

          return (
            <div key={goal.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden transition-all">
              <div
                className="p-6 cursor-pointer hover:bg-zinc-800/30 flex items-start justify-between"
                onClick={() => toggleGoal(goal.id)}
              >
                <div className="flex items-start">
                  <button className="mt-1 mr-4 text-zinc-500 hover:text-zinc-300 transition-colors">
                    {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                  </button>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-semibold text-zinc-100">{goal.title}</h2>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                        goal.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                        goal.priority === 'Medium' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {goal.priority} Priority
                      </span>
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-zinc-400 mt-2 text-sm">{goal.description}</p>
                    <div className="flex items-center mt-4 space-x-6 text-sm text-zinc-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Target: {format(new Date(goal.target_completion_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Flag className="w-4 h-4 mr-2" />
                        {goalMilestones.length} Milestones
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-400">{goal.progress_percentage}%</span>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Progress</p>
                </div>
              </div>

              {isExpanded && (
                <div className="bg-zinc-950/50 border-t border-zinc-800 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-zinc-200">Milestones</h3>
                    <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center">
                      <Plus className="w-4 h-4 mr-1" /> Add Milestone
                    </button>
                  </div>
                  
                  <div className="space-y-4 pl-10 border-l-2 border-zinc-800 ml-3">
                    {goalMilestones.map((milestone) => {
                      const milestoneTasks = tasks.filter((t) => t.milestone_id === milestone.id);
                      const completedTasks = milestoneTasks.filter((t) => t.completion_status === 'Completed').length;
                      
                      return (
                        <div key={milestone.id} className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                          <div className="absolute -left-[29px] top-6 w-4 h-4 rounded-full bg-zinc-900 border-2 border-emerald-500" />
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-zinc-100 font-medium">{milestone.title}</h4>
                              <p className="text-sm text-zinc-500 mt-1">{milestone.description}</p>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                              milestone.completion_status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                              milestone.completion_status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                              'bg-zinc-800 text-zinc-400'
                            }`}>
                              {milestone.completion_status}
                            </span>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-zinc-500">
                              Tasks: {completedTasks} / {milestoneTasks.length} completed
                            </span>
                            <span className="text-zinc-500">
                              Target: {format(new Date(milestone.target_date), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
