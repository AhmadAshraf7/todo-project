import { useState, useEffect } from "react";

export default function AddTaskModal({ isOpen, onClose, onSave, task }) {
  const todayDate = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayDate);
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Reset or populate fields when modal opens
  useEffect(() => {
    if (isOpen) {
      if (task) {
        // Edit mode: populate from task
        setTitle(task.title);
        setDescription(task.description);
        setDate(task.date);
        setImportant(task.important);
        setCompleted(task.completed);
      } else {
        // Add mode: clear all fields
        setTitle("");
        setDescription("");
        setDate(todayDate);
        setImportant(false);
        setCompleted(false);
      }
    }
  }, [isOpen, task, todayDate]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask = {
      id: task?.id ? task.id : Date.now().toString(),
      title,
      description,
      date,
      important,
      completed,
    };

    // Send the action type to App so it can show correct toast
    onSave(newTask, task ? "update" : "add");
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {task ? "Edit Task" : "Add New Task"}
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={todayDate}
          className="border p-2 w-full mb-3 rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="border p-2 w-full mb-3 rounded"
        />

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={important}
            onChange={() => setImportant(!important)}
          />
          Mark as Important
        </label>

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          Mark as Completed
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            {task ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}