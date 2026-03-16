/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Planner from './pages/Planner';
import Timer from './pages/Timer';
import Graph from './pages/Graph';
import Analytics from './pages/Analytics';
import Journal from './pages/Journal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="goals" element={<Goals />} />
          <Route path="planner" element={<Planner />} />
          <Route path="timer" element={<Timer />} />
          <Route path="graph" element={<Graph />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="journal" element={<Journal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
