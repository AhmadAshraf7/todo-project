import { useState, useEffect } from "react";

export default function Toast({ message, show, onClose, type }) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setVisible(true); // show toast
            const timer = setTimeout(() => setVisible(false), 2500); // fade out
            const removeTimer = setTimeout(() => onClose(), 3000); // remove from DOM
            return () => {
                clearTimeout(timer);
                clearTimeout(removeTimer);
            };
        }
    }, [show, onClose]);

    if (!show) return null;

    let bgColor = "bg-green-500"; // default success
    if (type === "error") bgColor = "bg-red-500";
    if (type === "info") bgColor = "bg-blue-500";

    return (
        <div
            className={`${bgColor} fixed top-5 right-5 z-50 text-white px-6 py-3 rounded-lg shadow-lg
        ${visible ? "opacity-100" : "opacity-0"}
        transition-opacity duration-700 ease-in-out`}
        >
            {message}
        </div>
    );
}