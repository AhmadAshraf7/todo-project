export default function Sidebar({ activeTab, setActiveTab, openModal }) {
  const menu = [
    { id: "today", label: "Today's tasks" },
    { id: "all", label: "All tasks" },
    { id: "important", label: "Important tasks" },
    { id: "completed", label: "Completed tasks" },
    { id: "pending", label: "Uncompleted tasks" },
  ];

  return (
    <div className="w-70 min-h-screen bg-teal-200 border-r px-5 py-6 flex flex-col">
      <h1 className="text-xl font-bold mb-8 text-center">TO-DO LIST</h1>

      <button
        onClick={openModal}
        className="bg-teal-700 text-white py-2 rounded-lg mb-8 cursor-pointer hover:bg-teal-800 transition"
      >
        Add new task
      </button>

      <div className="space-y-3 text-lg">
        {menu.map((item) => (
          <p
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer pl-3 border-2 transition ${activeTab === item.id
              ? "text-teal-600 border-teal-600 font-semibold"
              : "text-gray-600 border-transparent"
              }`}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}