// app/components/toast.jsx
"use client";

import { toast as sonnerToast } from "sonner";
import { FaCircleCheck } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { IoWarning } from "react-icons/io5";

const icons = {
    success: FaCircleCheck,
    error: FaTimesCircle,
    warning: IoWarning,
    info: HiOutlineInformationCircle,
};

const iconStyles = {
    success: "text-emerald-600",
    error: "text-red-600",
    warning: "text-amber-600",
    info: "text-blue-600",
};

function makeToast(type) {
    return (message, options = {}) => {
        const Icon = icons[type];
        const iconColor = iconStyles[type];

        return sonnerToast(message, {
            ...options,
            icon: <Icon className={`w-5 h-5 ${iconColor}`} />,
        });
    };
}

export const toast = {
    success: makeToast("success"),
    error: makeToast("error"),
    warning: makeToast("warning"),
    info: makeToast("info"),
    loading: sonnerToast.loading,
    promise: sonnerToast.promise,
    dismiss: sonnerToast.dismiss,
    custom: sonnerToast.custom,
};
