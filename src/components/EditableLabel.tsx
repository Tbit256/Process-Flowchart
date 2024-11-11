import React, { useState, useCallback } from 'react';
import { useStore } from '../store/flowStore';

type EditableLabelProps = {
  nodeId: string;
  label: string;
};

export const EditableLabel = ({ nodeId, label }: EditableLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(label);
  const updateNodeLabel = useStore(state => state.updateNodeLabel);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  }, []);

  const onKeyDown = useCallback((evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      updateNodeLabel(nodeId, value);
      setIsEditing(false);
    }
  }, [nodeId, value, updateNodeLabel]);

  const onBlur = useCallback(() => {
    updateNodeLabel(nodeId, value);
    setIsEditing(false);
  }, [nodeId, value, updateNodeLabel]);

  if (isEditing) {
    return (
      <input
        className="bg-transparent border-none text-center focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        autoFocus
      />
    );
  }

  return (
    <span onDoubleClick={onDoubleClick} className="cursor-text">
      {label}
    </span>
  );
};