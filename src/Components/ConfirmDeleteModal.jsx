import React from "react";

export default function ConfirmDeleteModal({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-80 p-5 relative">
                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
                >
                    ×
                </button>

                <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>
                <p className="text-sm text-gray-600 mb-4">
                    This task will be deleted permanently.
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}