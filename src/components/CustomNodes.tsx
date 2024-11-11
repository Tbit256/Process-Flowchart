import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CircleOff, Circle, Diamond } from 'lucide-react';
import { useStore } from '../store/flowStore';
import { PeopleAssigned, AutomationIndicator, ApplicationsList } from './NodeComponents';
import { EditableLabel } from './EditableLabel';

const nodeStyles = {
  padding: '14px',
  borderRadius: '5px',
  fontSize: '12px',
  color: '#222',
  width: '180px',
};

export const StartNode = memo(({ id, data }: NodeProps) => (
  <div style={{ ...nodeStyles, border: '2px solid #22c55e', background: '#dcfce7' }}>
    <Handle type="source" position={Position.Bottom} />
    <div className="flex items-center justify-center gap-2">
      <Circle size={16} className="text-green-600" />
      <EditableLabel nodeId={id} label={data.label} />
    </div>
  </div>
));

export const ProcessNode = memo(({ id, data }: NodeProps) => (
  <div style={{ ...nodeStyles, border: '2px solid #3b82f6', background: '#dbeafe' }}>
    <Handle type="target" position={Position.Top} />
    <div className="flex justify-between items-center mb-4">
      <PeopleAssigned />
      <AutomationIndicator />
    </div>
    <div className="flex items-center justify-center gap-2 py-3 mb-4">
      <div className="w-4 h-4 bg-blue-600 rounded" />
      <EditableLabel nodeId={id} label={data.label} />
    </div>
    <div className="flex justify-center mt-2">
      <ApplicationsList />
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
));

export const DecisionNode = memo(({ id, data }: NodeProps) => (
  <div style={{ ...nodeStyles, border: '2px solid #eab308', background: '#fef9c3' }}>
    <Handle type="target" position={Position.Top} />
    <div className="flex justify-between items-center mb-4">
      <PeopleAssigned />
      <AutomationIndicator />
    </div>
    <div className="flex items-center justify-center gap-2 py-3 mb-4">
      <Diamond size={16} className="text-yellow-600" />
      <EditableLabel nodeId={id} label={data.label} />
    </div>
    <div className="flex justify-center mt-2">
      <ApplicationsList />
    </div>
    <Handle type="source" position={Position.Bottom} />
    <Handle type="source" position={Position.Right} id="true" />
    <Handle type="source" position={Position.Left} id="false" />
  </div>
));

export const EndNode = memo(({ id, data }: NodeProps) => (
  <div style={{ ...nodeStyles, border: '2px solid #ef4444', background: '#fee2e2' }}>
    <Handle type="target" position={Position.Top} />
    <div className="flex items-center justify-center gap-2">
      <CircleOff size={16} className="text-red-600" />
      <EditableLabel nodeId={id} label={data.label} />
    </div>
  </div>
));