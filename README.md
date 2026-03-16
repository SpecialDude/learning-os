# Learning OS

A personal command center for disciplined learning, scheduling, and intellectual development.

## 1. Project Folder Structure

```
/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types/
│   │   └── index.ts          # Core data models
│   ├── store/
│   │   └── useStore.ts       # Zustand state management
│   ├── components/
│   │   └── Layout.tsx        # Sidebar navigation layout
│   └── pages/
│       ├── Dashboard.tsx     # High-level overview
│       ├── Goals.tsx         # Long-term goals & milestones
│       ├── Planner.tsx       # Daily task scheduling
│       ├── Timer.tsx         # Deep work focus timer
│       ├── Graph.tsx         # Knowledge graph visualization
│       ├── Analytics.tsx     # Learning velocity metrics
│       └── Journal.tsx       # Daily research reflections
```

## 2. Database Schema (PostgreSQL)

If migrating from the current LocalStorage implementation to PostgreSQL, use the following schema:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    priority VARCHAR(20),
    start_date TIMESTAMP WITH TIME ZONE,
    target_completion_date TIMESTAMP WITH TIME ZONE,
    progress_percentage INTEGER DEFAULT 0
);

CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES learning_goals(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_date TIMESTAMP WITH TIME ZONE,
    completion_status VARCHAR(50) DEFAULT 'Not Started'
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_time_minutes INTEGER,
    difficulty VARCHAR(20),
    scheduled_date TIMESTAMP WITH TIME ZONE,
    completion_status VARCHAR(50) DEFAULT 'Not Started'
);

CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    focus_score INTEGER CHECK (focus_score >= 0 AND focus_score <= 100)
);

CREATE TABLE daily_reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    achievements TEXT,
    lessons_learned TEXT,
    blockers TEXT,
    next_actions TEXT,
    mood VARCHAR(50)
);

CREATE TABLE concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE concept_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_concept UUID REFERENCES concepts(id) ON DELETE CASCADE,
    child_concept UUID REFERENCES concepts(id) ON DELETE CASCADE
);
```

## 3. Backend API Endpoints (Node.js / Express)

If implementing a backend, these are the recommended RESTful endpoints:

**Goals & Milestones**
- `GET /api/goals` - Fetch all goals with milestones
- `POST /api/goals` - Create a new goal
- `PUT /api/goals/:id` - Update goal progress
- `POST /api/milestones` - Add a milestone to a goal

**Tasks & Scheduling**
- `GET /api/tasks?date=YYYY-MM-DD` - Get tasks for a specific day
- `POST /api/tasks` - Schedule a new task
- `PATCH /api/tasks/:id/status` - Toggle task completion

**Study Sessions (Timer)**
- `POST /api/sessions` - Log a completed study session
- `GET /api/analytics/velocity` - Get study hours and focus scores for charts

**Knowledge Graph**
- `GET /api/concepts` - Fetch nodes and edges for React Flow
- `POST /api/concepts` - Add a new concept node
- `POST /api/concepts/link` - Create an edge between concepts

**Journal**
- `GET /api/journal` - Fetch past reflections
- `POST /api/journal` - Submit a new daily reflection

## 4. Frontend Pages

The application is built as a Single Page Application (SPA) with the following routes:
- `/` - **Dashboard**: High-level overview of progress, today's tasks, and streaks.
- `/goals` - **Milestone Planner**: Expandable list of long-term goals and their milestones.
- `/planner` - **Daily Study Planner**: Calendar view to schedule and check off daily tasks.
- `/timer` - **Deep Work Timer**: A focus timer that logs study sessions upon completion.
- `/graph` - **Knowledge Graph**: Interactive node-based visualization of learned concepts using React Flow.
- `/analytics` - **Learning Velocity**: Charts showing study time and focus trends using Recharts.
- `/journal` - **Research Journal**: Form to log daily achievements, blockers, and mood.

## 5. UI Wireframes

The UI follows a dark-mode, minimal, and progress-focused design language (using Tailwind CSS `zinc` and `emerald` palettes).

- **Sidebar**: Fixed on the left, contains navigation links with Lucide icons.
- **Cards**: Used extensively to group related information (e.g., a Goal card expands to show Milestone cards).
- **Progress Bars**: Visual indicators for goal completion and daily task completion.
- **Badges**: Small colored pills to indicate priority (High/Medium/Low) and difficulty.

## 6. Instructions to Run Locally

1. Ensure you have Node.js (v18+) installed.
2. Clone the repository.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## 7. Docker Setup

To run the application using Docker, use the provided `docker-compose.yml` file.

1. Ensure Docker and Docker Compose are installed.
2. Build and start the container:
   ```bash
   docker-compose up --build
   ```
3. The app will be available at `http://localhost:3000`.
