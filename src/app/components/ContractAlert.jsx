"use client";

import { useState } from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

export default function ContractAlert({ remainingDays }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || remainingDays === null) return null;

    return (
        <div className="w-full bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800/50 px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm font-medium">
                <FaExclamationTriangle className="w-4 h-4 shrink-0" />
                <span>
                    {remainingDays < 0
                        ? "قرارداد شما منقضی شده است. لطفاً برای تمدید با پشتیبانی تماس بگیرید."
                        : `تنها ${remainingDays} روز تا پایان قرارداد شما باقی مانده است. لطفاً برای تمدید اقدام کنید.`}
                </span>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-md text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/50 transition"
                aria-label="بستن هشدار"
            >
                <FaTimes className="w-4 h-4" />
            </button>
        </div>
    );
}
