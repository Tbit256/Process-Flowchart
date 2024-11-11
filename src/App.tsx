import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  NodeTypes,
  EdgeTypes,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Sidebar } from './components/Sidebar';
import { StartNode, ProcessNode, DecisionNode, EndNode } from './components/CustomNodes';
import { CustomEdge } from './components/CustomEdge';
import { useStore } from './store/flowStore';

const nodeTypes: NodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  end: EndNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

let nodeId = 1;
const getNodeId = () => `node_${nodeId++}`;

function Flow() {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange,
    onConnect,
    addNode,
  } = useStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}` },
      };

      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{ type: 'custom' }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;