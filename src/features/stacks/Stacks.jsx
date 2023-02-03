import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import StackNode from "./StackNode";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
} from "reactflow";

import { getStacks, selectStacks } from "app/stacksSlice";
import { getComponents } from "app/componentsSlice";

const HORIZONTAL_STACKS_COUNT = 5;

const parseStacks = (stacks) => {
  let pointer = 0;
  return stacks.map((stack, index) => {
    if (index % HORIZONTAL_STACKS_COUNT === 0) {
      pointer = 1;
    } else {
      pointer++;
    }

    let x = pointer * 500;
    let y = Math.ceil((index + 1) / HORIZONTAL_STACKS_COUNT) * 1000;

    return {
      id: stack.id,
      position: { x, y },
      type: "stack",
      data: { ...stack },
    };
  });
};

const minimapStyle = {
  height: 120,
};

export default function Stacks() {
  const stacks = useSelector(selectStacks);
  const dispatch = useDispatch();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const nodeTypes = useMemo(() => ({ stack: StackNode }), []);

  useLayoutEffect(() => {
    dispatch(getStacks());
    dispatch(getComponents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stacks) {
      const _parsedStacks = parseStacks(stacks);
      setNodes(_parsedStacks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stacks]);

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        fitView
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
