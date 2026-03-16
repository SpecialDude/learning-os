import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';

export default function Analytics() {
  const { sessions } = useStore();

  const last7Days = useMemo(() => {
    const end = new Date();
    const start = subDays(end, 6);
    return eachDayOfInterval({ start, end });
  }, []);

  const studyData = useMemo(() => {
    return last7Days.map((date) => {
      const dayStr = format(date, 'yyyy-MM-dd');
      const daySessions = sessions.filter(
        (s) => format(new Date(s.start_time), 'yyyy-MM-dd') === dayStr
      );
      const totalMinutes = daySessions.reduce((acc, s) => acc + s.duration_minutes, 0);
      const avgFocus =
        daySessions.length > 0
          ? daySessions.reduce((acc, s) => acc + s.focus_score, 0) / daySessions.length
          : 0;

      return {
        name: format(date, 'EEE'),
        minutes: totalMinutes,
        focus: Math.round(avgFocus),
      };
    });
  }, [last7Days, sessions]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Learning Velocity</h1>
        <p className="text-zinc-400 mt-2">Track your efficiency, consistency, and focus.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">Study Time (Last 7 Days)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#a1a1aa"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#a1a1aa"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}m`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '8px',
                    color: '#f4f4f5',
                  }}
                  itemStyle={{ color: '#10b981' }}
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                />
                <Bar dataKey="minutes" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">Focus Score Trend</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={studyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#a1a1aa"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#a1a1aa"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '8px',
                    color: '#f4f4f5',
                  }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line
                  type="monotone"
                  dataKey="focus"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#18181b', stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
