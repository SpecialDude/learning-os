import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  User,
  LearningGoal,
  Milestone,
  Task,
  StudySession,
  DailyReflection,
  Concept,
  ConceptRelationship,
} from '../types';

interface AppState {
  user: User | null;
  goals: LearningGoal[];
  milestones: Milestone[];
  tasks: Task[];
  sessions: StudySession[];
  reflections: DailyReflection[];
  concepts: Concept[];
  relationships: ConceptRelationship[];

  // Actions
  addGoal: (goal: Omit<LearningGoal, 'id' | 'progress_percentage'>) => void;
  updateGoal: (id: string, updates: Partial<LearningGoal>) => void;
  deleteGoal: (id: string) => void;

  addMilestone: (milestone: Omit<Milestone, 'id'>) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
  deleteMilestone: (id: string) => void;

  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  addSession: (session: Omit<StudySession, 'id'>) => void;
  
  addReflection: (reflection: Omit<DailyReflection, 'id'>) => void;
}

const mockGoals: LearningGoal[] = [
  {
    id: 'g1',
    title: 'Master AI 3D Generation',
    description: 'Learn to build and deploy generative 3D models using deep learning.',
    category: 'Technical',
    priority: 'High',
    start_date: new Date().toISOString(),
    target_completion_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    progress_percentage: 25,
  },
];

const mockMilestones: Milestone[] = [
  {
    id: 'm1',
    goal_id: 'g1',
    title: 'Deep Learning Fundamentals',
    description: 'Understand neural networks, backpropagation, and PyTorch.',
    target_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    completion_status: 'In Progress',
  },
  {
    id: 'm2',
    goal_id: 'g1',
    title: 'Computer Vision',
    description: 'CNNs, image segmentation, and object detection.',
    target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    completion_status: 'Not Started',
  },
];

const mockTasks: Task[] = [
  {
    id: 't1',
    milestone_id: 'm1',
    title: 'Study Linear Algebra',
    description: 'Review vectors, matrices, and eigenvalues.',
    estimated_time_minutes: 120,
    difficulty: 'Medium',
    scheduled_date: new Date().toISOString(),
    completion_status: 'Completed',
  },
  {
    id: 't2',
    milestone_id: 'm1',
    title: 'Implement Neural Network',
    description: 'Build a simple MLP from scratch in Python.',
    estimated_time_minutes: 180,
    difficulty: 'Hard',
    scheduled_date: new Date().toISOString(),
    completion_status: 'In Progress',
  },
];

const mockConcepts: Concept[] = [
  { id: 'c1', name: 'Linear Algebra', description: 'Math foundation' },
  { id: 'c2', name: 'Neural Networks', description: 'Core ML model' },
  { id: 'c3', name: 'CNNs', description: 'Image processing' },
  { id: 'c4', name: 'Computer Vision', description: 'Visual understanding' },
  { id: 'c5', name: '3D Reconstruction', description: 'Building 3D from 2D' },
];

const mockRelationships: ConceptRelationship[] = [
  { id: 'r1', parent_concept: 'c1', child_concept: 'c2' },
  { id: 'r2', parent_concept: 'c2', child_concept: 'c3' },
  { id: 'r3', parent_concept: 'c3', child_concept: 'c4' },
  { id: 'r4', parent_concept: 'c4', child_concept: 'c5' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        id: 'u1',
        name: 'Learner',
        email: 'learner@example.com',
        created_at: new Date().toISOString(),
      },
      goals: mockGoals,
      milestones: mockMilestones,
      tasks: mockTasks,
      sessions: [],
      reflections: [],
      concepts: mockConcepts,
      relationships: mockRelationships,

      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, { ...goal, id: uuidv4(), progress_percentage: 0 }],
        })),
      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
          milestones: state.milestones.filter((m) => m.goal_id !== id),
        })),

      addMilestone: (milestone) =>
        set((state) => ({
          milestones: [...state.milestones, { ...milestone, id: uuidv4() }],
        })),
      updateMilestone: (id, updates) =>
        set((state) => ({
          milestones: state.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),
      deleteMilestone: (id) =>
        set((state) => ({
          milestones: state.milestones.filter((m) => m.id !== id),
          tasks: state.tasks.filter((t) => t.milestone_id !== id),
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: uuidv4() }],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, { ...session, id: uuidv4() }],
        })),

      addReflection: (reflection) =>
        set((state) => ({
          reflections: [...state.reflections, { ...reflection, id: uuidv4() }],
        })),
    }),
    {
      name: 'learning-os-storage',
    }
  )
);
