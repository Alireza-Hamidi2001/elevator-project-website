"use client";

import { useState, useEffect, useActionState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "@/app/components/toast";
import { submitReviewAction } from "./../actions";
import PersianNumber from "@/app/components/PersianNumber";
import { TiWarningOutline } from "react-icons/ti";
import { LuMessageSquareText } from "react-icons/lu";

export default function ReviewForm() {
    // ۱. مدیریت Toast و ریست با یک key
    const [formKey, setFormKey] = useState(0);

    return (
        <ReviewFormInner
            key={formKey}
            onSuccess={() => setFormKey((prev) => prev + 1)}
        />
    );
}

// کامپوننت داخلی که فرم رو نگه می‌داره
function ReviewFormInner({ onSuccess }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [body, setBody] = useState("");

    const [state, formAction, pending] = useActionState(submitReviewAction, {
        ok: null,
        message: "",
    });

    useEffect(() => {
        if (state.message) {
            if (state.ok) {
                toast.success(state.message);
                // به جای setState تو خود این کامپوننت، به والد خبر میدیم
                onSuccess();
            } else {
                toast.error(state.message);
            }
        }
    }, [state.ts, state.ok, state.message, onSuccess]);

    const maxLen = 2000;
    const canSubmit = body.trim().length >= 10 && !pending;

    return (
        <form
            action={formAction}
            className="flex flex-col gap-4 bg-white dark:bg-night-800 p-6 rounded-xl border border-cream-200 dark:border-night-700"
        >
            {/* امتیاز */}
            <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 text-sm font-medium text-night-700 dark:text-cream-50">
                    <FaStar /> امتیاز شما (اختیاری)
                </label>
                <div
                    className="flex items-center gap-1 my-4"
                    dir="rtl"
                >
                    {[1, 2, 3, 4, 5].map((star) => {
                        const filled = (hover || rating) >= star;
                        return (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="transition-transform duration-150 hover:scale-110"
                                aria-label={`${star} ستاره`}
                            >
                                <FaStar
                                    className={`w-7 h-7 transition-colors duration-150 ${
                                        filled
                                            ? "text-amber-400"
                                            : "text-night-700/20 dark:text-cream-50/20"
                                    }`}
                                />
                            </button>
                        );
                    })}
                    {rating > 0 && (
                        <span className="text-xs text-night-700/60 dark:text-cream-50/60 mr-2">
                            امتیاز شما&nbsp;
                            <PersianNumber value={rating} /> از{" "}
                            <PersianNumber value={5} />
                        </span>
                    )}
                </div>
                <input
                    type="hidden"
                    name="rating"
                    value={rating || ""}
                />
            </div>

            {/* متن نظر */}
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="body"
                    className="flex items-center gap-1 text-sm font-medium text-night-700 dark:text-cream-50"
                >
                    <LuMessageSquareText /> متن نظر
                </label>
                <textarea
                    id="body"
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={6}
                    maxLength={maxLen}
                    placeholder="تجربه یا نظر خود را با ما به اشتراک بگذارید..."
                    className="border border-night-700/10 dark:border-cream-50/10 rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500/50 resize-none bg-transparent text-night-700 dark:text-cream-50"
                />
                <div className="flex justify-between text-xs text-night-700/50 dark:text-cream-50/50">
                    <span>&bull; حداقل ۱۰ کاراکتر</span>
                    <span dir="ltr">
                        <PersianNumber value={body.length} /> /{" "}
                        <PersianNumber value={maxLen} />
                    </span>
                </div>
            </div>

            <button
                type="submit"
                disabled={!canSubmit}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-md py-2 transition flex items-center justify-center gap-2"
            >
                {pending ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        در حال ثبت
                    </>
                ) : (
                    "ثبت نظر"
                )}
            </button>

            <p className="flex items-center gap-2 justify-center text-xs text-night-700/50 dark:text-cream-50/50 text-center">
                <TiWarningOutline className="text-xl text-amber-500" />
                نظر شما پس از تایید توسط مدیریت نمایش داده می‌شود.
            </p>
        </form>
    );
}
