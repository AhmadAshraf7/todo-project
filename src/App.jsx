import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";
import AddTaskModal from "./Components/AddTaskModal";
import RightPanel from "./Components/RightPanel";
import Toast from "./Components/toast";
import ConfirmDeleteModal from "./Components/ConfirmDeleteModal";

export default function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or update task from AddTaskModal
  const handleSaveTask = (task, actionType) => {
    if (actionType === "add") {
      setTasks([...tasks, task]);
      setToastMessage("Task Added Successfully!");
      setToastType("success");
    } else if (actionType === "update") {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setToastMessage("Task Updated Successfully!");
      setToastType("info");
    }
    setShowToast(true);
  };

  // Update task from TaskCard edit modal
  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)));
    setToastMessage("Task Updated Successfully!");
    setToastType("info");
    setShowToast(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setToastMessage("Task Deleted Successfully!");
    setToastType("error");
    setShowToast(true);

    setIsDeleteModalOpen(false);
    setDeleteTaskId(null);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const toggleImportant = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, important: !t.important } : t)));
  };

  const openAddModal = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteTaskId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openModal={openAddModal}
      />

      <Main
        activeTab={activeTab}
        tasks={tasks}
        deleteTask={openDeleteModal}
        toggleComplete={toggleComplete}
        toggleImportant={toggleImportant}
        updateTask={updateTask} // <-- correct function for edit
        openModal={openAddModal}
      />

      <AddTaskModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />

      <RightPanel />

      <Toast
        message={toastMessage}
        show={showToast}
        type={toastType}
        onClose={() => setShowToast(false)}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteTask(deleteTaskId)}
      />
    </div>
  );
}