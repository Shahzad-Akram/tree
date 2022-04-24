import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TreeView from "react-expandable-treeview";
import TreeLabel from "../../../components/TreeLabel";

const NewHome = () => {
  const [reRenderkey, setRerenderKey] = useState(null);
  const data = [
    {
      id: 0,
      label: "son",
      children: [],
      lastname: "father",
      dob: "2022-04-05",
    },
  ];
  const [nodes, setNodes] = useState(data);

  const updateNodes = () => {
    const newNode = {
      id: uuidv4(),
      label: "new node",
      children: [],
    };

    insertNode(data[0], 0, newNode);
    console.log("data", data);
    setNodes(data);
    // setRerenderKey(uuidv4())
  };

  function insertNode(node, nodeId, newNode) {
    if (node.id === nodeId) {
      if (newNode) {
        node.children.push(newNode);
      }
    } else if (node.children != null) {
      for (let i = 0; i < node.children.length; i++) {
        insertNode(node.children[i], nodeId, newNode);
      }
    }
  }

  return (
    <div>
      <TreeView
        data={nodes}
        renderNode={({ label, id }) => (
          <div onClick={() => console.log(label + ", " + id)}>{label}</div>
        )}
      />
      <button onClick={updateNodes}>Add Node</button>
    </div>
  );
};

export default NewHome;
