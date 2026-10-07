"use client";

import Image from "next/image";
import { estedad } from "../../_fonts/fonts";
import { useEffect, useState, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PeopleGallery({ people }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = people.length;

    const next = useCallback(
        () => setActiveIndex((i) => (i + 1) % total),
        [total],
    );
    const prev = useCallback(
        () => setActiveIndex((i) => (i - 1 + total) % total),
        [total],
    );

    // چرخش خودکار هر ۳ ثانیه
    useEffect(() => {
        const timer = setInterval(next, 3000);
        return () => clearInterval(timer);
    }, [next]);

    // محاسبه‌ی موقعیت نسبت به کارت فعال
    // -1 = چپ ، 0 = وسط ، 1 = راست ، بقیه = مخفی
    const getPosition = (personIndex) => {
        let diff = personIndex - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        if (diff < -1 || diff > 1) return null;
        return diff;
    };

    const positionStyles = {
        "-1": {
            transform: "translateX(-110%) translateY(0) scale(0.85)",
            opacity: 0.35,
            filter: "blur(1.5px)",
            zIndex: 5,
        },
        0: {
            transform: "translateX(0%) translateY(-24px) scale(1.12)",
            opacity: 1,
            filter: "blur(0)",
            zIndex: 10,
        },
        1: {
            transform: "translateX(110%) translateY(0) scale(0.85)",
            opacity: 0.35,
            filter: "blur(1.5px)",
            zIndex: 5,
        },
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="relative group">
                {/* دکمه چپ */}
                <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30
                        w-12 h-12 rounded-full bg-black/50 backdrop-blur
                        flex items-center justify-center text-white
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        hover:bg-black/80 hover:scale-110"
                >
                    <FaChevronLeft size={20} />
                </button>

                {/* دکمه راست */}
                <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30
                        w-12 h-12 rounded-full bg-black/50 backdrop-blur
                        flex items-center justify-center text-white
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        hover:bg-black/80 hover:scale-110"
                >
                    <FaChevronRight size={20} />
                </button>

                {/* صحنه‌ی سه‌بعدی */}
                <div
                    className="relative h-[420px] md:h-[480px] flex items-center justify-center"
                    style={{ perspective: "1200px" }}
                >
                    <div className="relative w-[320px] md:w-[360px] h-full">
                        {people.map((person, i) => {
                            const pos = getPosition(i);
                            const isHidden = pos === null;
                            const isCenter = pos === 0;

                            const style = isHidden
                                ? {
                                      transform: "translateX(0) scale(0.5)",
                                      opacity: 0,
                                      zIndex: 0,
                                      pointerEvents: "none",
                                  }
                                : positionStyles[pos];

                            return (
                                <div
                                    key={person.id}
                                    className="absolute top-1/2 left-1/2 w-[300px] md:w-[340px] -translate-x-1/2 -translate-y-1/2
                                        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                    style={style}
                                >
                                    {/* کارت پروفایل */}
                                    <div
                                        className={`group/card relative overflow-hidden rounded-2xl transition-all duration-700
                                        ${
                                            isCenter
                                                ? "shadow-2xl shadow-night-950/30 dark:shadow-black/60 ring-1 ring-night-700/10 dark:ring-cream-50/10"
                                                : "shadow-lg"
                                        }`}
                                    >
                                        {/* عکس پروفایل */}
                                        <div className="relative w-full aspect-[3/4]">
                                            <Image
                                                src={person.image}
                                                alt={person.name}
                                                fill
                                                sizes="(max-width: 768px) 300px, 340px"
                                                className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                                            />

                                            {/* نوار تار پایین با محو شدن تدریجی به بالا */}
                                            <div
                                                className="absolute bottom-0 inset-x-0 h-28 md:h-32 backdrop-blur-md pointer-events-none"
                                                style={{
                                                    backgroundColor:
                                                        "rgba(10, 10, 15, 0.35)",
                                                    maskImage:
                                                        "linear-gradient(to top, black 50%, transparent 100%)",
                                                    WebkitMaskImage:
                                                        "linear-gradient(to top, black 50%, transparent 100%)",
                                                }}
                                            />
                                        </div>

                                        {/* نام و سمت */}
                                        <div className="absolute bottom-0 inset-x-0 px-4 py-3 md:px-5 md:py-4">
                                            <h3
                                                className={`${
                                                    estedad.className
                                                } text-cream-50 font-bold transition-all duration-500
                                                ${
                                                    isCenter
                                                        ? "text-lg md:text-xl"
                                                        : "text-base"
                                                }`}
                                            >
                                                {person.name}
                                            </h3>
                                            <p
                                                className={`text-cream-50/85 transition-all duration-500 mt-0.5
                                                ${
                                                    isCenter
                                                        ? "text-sm md:text-base"
                                                        : "text-xs md:text-sm"
                                                }`}
                                            >
                                                {person.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* نقطه‌های ناوبری */}
            <div className="flex justify-center items-center gap-2 mt-8">
                {people.map((person, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <button
                            key={person.id}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Go to ${person.name}`}
                            className={`rounded-full transition-all duration-500 ease-out
                    ${
                        isActive
                            ? "w-9 h-3 bg-teal-500 dark:bg-teal-400"
                            : "w-3 h-3 bg-night-700/20 dark:bg-night-700/40 hover:bg-night-700/50 dark:hover:bg-cream-50/50"
                    }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
