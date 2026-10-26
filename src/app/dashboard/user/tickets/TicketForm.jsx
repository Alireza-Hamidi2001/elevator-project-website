// app/dashboard/user/tickets/TicketForm.jsx
"use client";

import { useState, useActionState, useEffect } from "react";
import SubjectCombobox from "./SubjectCombobox";
import { submitTicketAction } from "./actions";
import { toast } from "@/app/components/toast";

function TicketFormInner({ onSuccess }) {
    // حالا subject همون مقدار انگلیسی رو نگه می‌داره
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [state, formAction, pending] = useActionState(submitTicketAction, {
        ok: null,
        errors: {},
        message: "",
        ts: null,
    });

    useEffect(() => {
        if (state.message && state.ts) {
            if (state.ok) {
                toast.success(state.message);
                onSuccess();
            } else {
                toast.error(state.message);
            }
        }
    }, [state.ts, state.ok, state.message, onSuccess]);

    const errors = state.errors || {};

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4 bg-white dark:bg-night-800 p-6 rounded-xl border border-cream-200 dark:border-night-700"
        >
            {/* موضوع (همون دسته‌بندی) */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-night-700 dark:text-cream-50">
                    موضوع تیکت
                </label>
                <SubjectCombobox
                    name="category" // 👈 اسم فیلد رو category می‌ذاریم که توی اکشن خونده بشه
                    value={subject}
                    onChange={setSubject}
                    error={errors.category}
                />
                {errors.category && (
                    <span className="text-xs text-red-500">
                        {errors.category}
                    </span>
                )}
            </div>

            {/* متن پیام */}
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="message"
                    className="text-sm font-medium text-night-700 dark:text-cream-50"
                >
                    متن پیام
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="مشکل یا درخواست خود را توضیح دهید..."
                    className="border border-night-700/10 dark:border-cream-50/10 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500/50 resize-none"
                />
                {errors.message && (
                    <span className="text-xs text-red-500">
                        {errors.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                disabled={pending}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/60 text-white rounded-md py-2 transition flex items-center justify-center gap-2"
            >
                {pending ? "در حال ارسال..." : "ثبت تیکت"}
            </button>
        </form>
    );
}

export default function TicketForm() {
    const [formKey, setFormKey] = useState(0);
    return (
        <TicketFormInner
            key={formKey}
            onSuccess={() => setFormKey((prev) => prev + 1)}
        />
    );
}
