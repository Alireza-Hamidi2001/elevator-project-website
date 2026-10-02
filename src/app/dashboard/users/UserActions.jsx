"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";

export default function UserActions({ user }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setEditOpen(true)}
                    aria-label={`ویرایش ${user.firstName} ${user.lastName}`}
                    className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-md border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300"
                >
                    <FaEdit className="text-xs" />
                    ویرایش
                </button>

                <button
                    type="button"
                    onClick={() => setDeleteOpen(true)}
                    aria-label={`حذف ${user.firstName} ${user.lastName}`}
                    className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-md border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
                >
                    <FaTrash className="text-xs" />
                    حذف
                </button>
            </div>

            <DeleteUserModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                user={user}
                onDeleted={(id) => console.log("Deleted:", id)}
            />

            <EditUserModal
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                user={user}
                onSaved={(id, data) => console.log("Saved:", id, data)}
            />
        </>
    );
}
