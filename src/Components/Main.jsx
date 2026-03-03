import { useState } from "react";
import searchIcon from "../assets/search.svg";
import TaskCard from "./TaskCard";

export default function Main({
  activeTab,
  tasks,
  deleteTask,
  toggleComplete,
  toggleImportant,
  updateTask,
  openModal
}) {
  const [search, setSearch] = useState("");
  const today = new Date().toISOString().split("T")[0]; // today's date

  const filteredTasks = tasks
    .filter((task) => {
      if (activeTab === "completed") return task.completed;
      if (activeTab === "pending") return !task.completed;
      if (activeTab === "important") return task.important;
      if (activeTab === "today") return task.date === today; // only today's tasks
      return true; // 'all' tab
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">
          {activeTab} tasks ({filteredTasks.length})
        </h2>

        <div className="flex w-full max-w-64">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-4 border border-teal-700 rounded-l-lg focus:outline-none"
          />
          <div className="flex items-center justify-center px-3 bg-teal-700 rounded-r-lg">
            <img src={searchIcon} alt="search" className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={openModal}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg cursor-pointer"
        >
          Add new task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onComplete={toggleComplete}
            onImportant={toggleImportant}
            onUpdate={updateTask}
          />
        ))}
      </div>
    </div>
  );
}