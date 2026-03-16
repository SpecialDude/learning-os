import React, { useMemo } from 'react';
import { useStore } from '../store/useStore';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function Graph() {
  const { concepts, relationships } = useStore();

  const initialNodes = useMemo(() => {
    return concepts.map((concept, index) => ({
      id: concept.id,
      position: { x: 250 + (index % 3) * 200, y: 100 + Math.floor(index / 3) * 150 },
      data: { label: concept.name },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        background: '#18181b', // zinc-900
        color: '#f4f4f5', // zinc-50
        border: '1px solid #27272a', // zinc-800
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    }));
  }, [concepts]);

  const initialEdges = useMemo(() => {
    return relationships.map((rel) => ({
      id: rel.id,
      source: rel.parent_concept,
      target: rel.child_concept,
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 }, // emerald-500
    }));
  }, [relationships]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-full flex flex-col">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Knowledge Graph</h1>
        <p className="text-zinc-400 mt-2">Visualize the connections between concepts you're learning.</p>
      </header>

      <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden min-h-[600px] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          className="bg-zinc-950"
        >
          <Background color="#27272a" gap={16} />
          <Controls className="bg-zinc-900 border-zinc-800 fill-zinc-400" />
          <MiniMap
            nodeColor="#10b981"
            maskColor="rgba(9, 9, 11, 0.7)"
            className="bg-zinc-900 border border-zinc-800"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
