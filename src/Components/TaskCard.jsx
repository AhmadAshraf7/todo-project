import { useState } from "react";
import star from "../assets/star-line.svg";
import trash from "../assets/trash.svg";
import date from "../assets/date.svg";
import edit from "../assets/edit.svg";

export default function TaskCard({ task, onDelete, onComplete, onImportant, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDate, setEditDate] = useState(task.date);
  const [editImportant, setEditImportant] = useState(task.important);
  const [editCompleted, setEditCompleted] = useState(task.completed);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription,
      date: editDate,
      important: editImportant,
      completed: editCompleted,
    });
    setIsEditing(false);
  };

  return (
    <>
      <div className="p-5 rounded-xl shadow-lg text-white bg-teal-600">
        <h3 className={`${task.completed ? "line-through opacity-80" : ""} font-semibold mb-1`}>
          {task.title}
        </h3>
        <p className="text-sm mb-2 text-gray-200">{task.description}</p>
        <div className="text-sm mb-4 flex items-center gap-2">
          <img src={date} alt="date" className="w-5 h-5" />
          <span>{task.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span
            onClick={() => onComplete(task.id)}
            className={`cursor-pointer px-3 py-1 rounded-full text-sm ${task.completed ? "bg-white text-black" : "bg-yellow-300 text-black"}`}
          >
            {task.completed ? "completed" : "pending"}
          </span>
          <div className="flex gap-3 text-xl items-center">
            <span onClick={() => onImportant(task.id)} className="cursor-pointer">
              <img
                src={star}
                alt="star"
                className={`w-6 h-6 transition-opacity duration-200 ${task.important ? "opacity-100" : "opacity-40"}`}
              />
            </span>
            <span onClick={() => setIsEditing(true)} className="cursor-pointer">
              <img src={edit} alt="edit" className="w-6 h-6" />
            </span>
            <span onClick={() => onDelete(task.id)} className="cursor-pointer">
              <img src={trash} alt="delete" className="w-6 h-6" />
            </span>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title"
              className="border p-2 w-full mb-3 rounded"
            />
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              min={todayDate}
              className="border p-2 w-full mb-3 rounded"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Task description"
              className="border p-2 w-full mb-3 rounded"
            />
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={editImportant} onChange={() => setEditImportant(!editImportant)} />
              Mark as Important
            </label>
            <label className="flex items-center gap-2 mb-3">
              <input type="checkbox" checked={editCompleted} onChange={() => setEditCompleted(!editCompleted)} />
              Mark as Completed
            </label>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}