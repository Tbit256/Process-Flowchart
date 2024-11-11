import React from 'react';
import { useStore } from '../store/flowStore';
import type { EdgeStyle } from '../types';

const EDGE_STYLES: EdgeStyle[] = ['bezier', 'straight', 'step', 'smoothstep', 'default'];
const STYLE_LABELS: Record<EdgeStyle, string> = {
  bezier: 'Curved',
  straight: 'Straight',
  step: 'Step',
  smoothstep: 'Smooth Step',
  default: 'Default',
};

const COLORS = [
  { label: 'Gray', value: '#64748b' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Yellow', value: '#eab308' },
];

interface EdgeControlsProps {
  edgeId: string;
}

export const EdgeControls: React.FC<EdgeControlsProps> = ({ edgeId }) => {
  const edge = useStore((state) => state.edges.find((e) => e.id === edgeId));
  const updateEdgeStyle = useStore((state) => state.updateEdgeStyle);
  const updateEdgeColor = useStore((state) => state.updateEdgeColor);
  const updateEdgeLabel = useStore((state) => state.updateEdgeLabel);
  const toggleEdgeArrow = useStore((state) => state.toggleEdgeArrow);

  if (!edge) return null;

  const currentStyle = edge.data?.style || 'bezier';
  const currentColor = edge.data?.color || '#64748b';
  const label = edge.data?.label || '';
  const sourceArrow = edge.data?.sourceArrow || false;
  const targetArrow = edge.data?.targetArrow || false;

  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold block mb-1">Style:</label>
          <select
            className="w-full text-sm rounded border-gray-300 p-1"
            value={currentStyle}
            onChange={(e) => updateEdgeStyle(edgeId, e.target.value as EdgeStyle)}
          >
            {EDGE_STYLES.map((style) => (
              <option key={style} value={style}>
                {STYLE_LABELS[style]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1">Color:</label>
          <select
            className="w-full text-sm rounded border-gray-300 p-1"
            value={currentColor}
            onChange={(e) => updateEdgeColor(edgeId, e.target.value)}
          >
            {COLORS.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1">Arrows:</label>
          <div className="flex gap-2">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={sourceArrow}
                onChange={() => toggleEdgeArrow(edgeId, 'source')}
                className="rounded text-blue-500"
              />
              <span className="text-xs">Start</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={targetArrow}
                onChange={() => toggleEdgeArrow(edgeId, 'target')}
                className="rounded text-blue-500"
              />
              <span className="text-xs">End</span>
            </label>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1">Label:</label>
          <input
            type="text"
            value={label}
            onChange={(e) => updateEdgeLabel(edgeId, e.target.value)}
            placeholder="Enter label"
            className="w-full text-sm rounded border-gray-300 p-1"
          />
        </div>
      </div>
    </div>
  );
};