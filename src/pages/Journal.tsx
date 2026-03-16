import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { BookOpen, Send, Smile, Frown, Meh, Sparkles, Brain, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Journal() {
  const { reflections, addReflection } = useStore();
  
  const [achievements, setAchievements] = useState('');
  const [lessonsLearned, setLessonsLearned] = useState('');
  const [blockers, setBlockers] = useState('');
  const [nextActions, setNextActions] = useState('');
  const [mood, setMood] = useState<'Great' | 'Good' | 'Okay' | 'Bad' | 'Terrible'>('Good');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReflection({
      date: new Date().toISOString(),
      achievements,
      lessons_learned: lessonsLearned,
      blockers,
      next_actions: nextActions,
      mood,
    });
    setAchievements('');
    setLessonsLearned('');
    setBlockers('');
    setNextActions('');
    alert('Reflection saved successfully!');
  };

  const sortedReflections = [...reflections].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Research Journal</h1>
        <p className="text-zinc-400 mt-2">Log your daily reflections, insights, and roadblocks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-emerald-500" />
            New Entry
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                What did you achieve today?
              </label>
              <textarea
                required
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none h-24"
                placeholder="Built a neural network from scratch..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-blue-500" />
                What did you learn?
              </label>
              <textarea
                required
                value={lessonsLearned}
                onChange={(e) => setLessonsLearned(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none h-24"
                placeholder="Backpropagation requires careful gradient management..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                What confused you or blocked you?
              </label>
              <textarea
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none h-24"
                placeholder="Struggled with matrix dimensions during matrix multiplication..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 flex items-center">
                <ArrowRight className="w-4 h-4 mr-2 text-purple-500" />
                What will you study tomorrow?
              </label>
              <textarea
                required
                value={nextActions}
                onChange={(e) => setNextActions(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none h-24"
                placeholder="Review linear algebra basics and fix the dimension bug..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-3">
                How are you feeling about your progress?
              </label>
              <div className="flex space-x-4">
                {(['Great', 'Good', 'Okay', 'Bad', 'Terrible'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      mood === m
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold py-3 rounded-xl flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5 mr-2" />
              Save Entry
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">Past Entries</h2>
          {sortedReflections.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500 font-medium">No journal entries yet.</p>
            </div>
          ) : (
            sortedReflections.map((entry) => (
              <div key={entry.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800/50">
                  <h3 className="font-semibold text-zinc-200">
                    {format(new Date(entry.date), 'EEEE, MMMM d, yyyy')}
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">
                    Mood: {entry.mood}
                  </span>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <strong className="text-zinc-400 block mb-1">Achievements:</strong>
                    <p className="text-zinc-300">{entry.achievements}</p>
                  </div>
                  <div>
                    <strong className="text-zinc-400 block mb-1">Lessons Learned:</strong>
                    <p className="text-zinc-300">{entry.lessons_learned}</p>
                  </div>
                  {entry.blockers && (
                    <div>
                      <strong className="text-zinc-400 block mb-1">Blockers:</strong>
                      <p className="text-zinc-300">{entry.blockers}</p>
                    </div>
                  )}
                  <div>
                    <strong className="text-zinc-400 block mb-1">Next Actions:</strong>
                    <p className="text-zinc-300">{entry.next_actions}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
