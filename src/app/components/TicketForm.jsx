// app/dashboard/ticket/TicketForm.jsx
"use client";

import { useState } from "react";
import SubjectCombobox from "./SubjectCombobox";

export default function TicketForm() {
    const [subject, setSubject] = useState("");
    const [priority, setPriority] = useState("medium");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!subject || !message) {
            alert("لطفاً موضوع و متن پیام را وارد کنید");
            return;
        }

        const ticket = { subject, priority, message, createdAt: new Date() };
        console.log("Ticket submitted:", ticket);

        setSubmitted(true);
        setSubject("");
        setPriority("medium");
        setMessage("");
        setTimeout(() => setSubmitted(false), 3000);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white dark:bg-night-800 p-6 rounded-xl shadow-sm"
        >
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-night-700 dark:text-cream-50">
                    موضوع
                </label>
                <SubjectCombobox
                    value={subject}
                    onChange={setSubject}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label
                    htmlFor="priority"
                    className="text-sm font-medium text-night-700 dark:text-cream-50"
                >
                    اولویت
                </label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-night-700/10 dark:border-cream-50/10 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="low">کم</option>
                    <option value="medium">متوسط</option>
                    <option value="high">زیاد</option>
                    <option value="urgent">فوری</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label
                    htmlFor="message"
                    className="text-sm font-medium text-night-700 dark:text-cream-50"
                >
                    متن پیام
                </label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="مشکل یا درخواست خود را توضیح دهید..."
                    className="border border-night-700/10 dark:border-cream-50/10 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 transition"
            >
                ثبت تیکت
            </button>

            {submitted && (
                <p className="text-green-600 text-sm text-center">
                    تیکت شما با موفقیت ثبت شد ✓
                </p>
            )}
        </form>
    );
}
