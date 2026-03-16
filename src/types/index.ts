export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export type GoalCategory = 'Technical' | 'Soft Skills' | 'Health' | 'Personal' | 'Other';
export type Priority = 'Low' | 'Medium' | 'High';
export type CompletionStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: Priority;
  start_date: string;
  target_completion_date: string;
  progress_percentage: number;
}

export interface Milestone {
  id: string;
  goal_id: string;
  title: string;
  description: string;
  target_date: string;
  completion_status: CompletionStatus;
}

export interface Task {
  id: string;
  milestone_id: string;
  title: string;
  description: string;
  estimated_time_minutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  scheduled_date: string;
  completion_status: CompletionStatus;
}

export interface StudySession {
  id: string;
  task_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  focus_score: number; // 0-100
}

export interface DailyReflection {
  id: string;
  date: string;
  achievements: string;
  lessons_learned: string;
  blockers: string;
  next_actions: string;
  mood: 'Great' | 'Good' | 'Okay' | 'Bad' | 'Terrible';
}

export interface Concept {
  id: string;
  name: string;
  description: string;
}

export interface ConceptRelationship {
  id: string;
  parent_concept: string;
  child_concept: string;
}
