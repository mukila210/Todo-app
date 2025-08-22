import React, { useState } from "react";

const NewTaskModal = ({ onClose, onAdd }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    onAdd(input);
    setInput("");
    onClose();
  };

  /*useEffect(() => {
    if (editingTask) {
        setInput(editText);
        setShowModal(true);
    }
  }, [editingTask]);*/

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your task..."
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};


export default NewTaskModal;