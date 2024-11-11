import React from 'react';
import { Circle, Square, Diamond, CircleOff } from 'lucide-react';

const nodeTypes = [
  { type: 'start', label: 'Start', Icon: Circle, color: 'text-green-600' },
  { type: 'process', label: 'Process', Icon: Square, color: 'text-blue-600' },
  { type: 'decision', label: 'Decision', Icon: Diamond, color: 'text-yellow-600' },
  { type: 'end', label: 'End', Icon: CircleOff, color: 'text-red-600' },
];

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Flow Nodes</h2>
      <div className="space-y-2">
        {nodeTypes.map(({ type, label, Icon, color }) => (
          <div
            key={type}
            className="flex items-center gap-2 p-2 border rounded cursor-move hover:bg-gray-50 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, type)}
          >
            <Icon className={`${color}`} size={16} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}