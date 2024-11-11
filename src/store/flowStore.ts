import { create } from 'zustand';
import {
  NodeChange,
  EdgeChange,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import { CustomNode, CustomEdge } from '../types';

interface FlowState {
  nodes: CustomNode[];
  edges: CustomEdge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: CustomNode) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
}

export const useStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    const newEdge = {
      ...connection,
      id: `edge-${Math.random()}`,
      type: 'custom',
    };
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label } } : node
      ),
    });
  },
}));