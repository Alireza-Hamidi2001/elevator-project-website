"use client";

import Image from "next/image";
import { estedad } from "../../_fonts/fonts";
import { useEffect, useState, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PeopleGallery({ people }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef(null);
    const total = people.length;

    const next = useCallback(
        () => setActiveIndex((i) => (i + 1) % total),
        [total],
    );
    const prev = useCallback(
        () => setActiveIndex((i) => (i - 1 + total) % total),
        [total],
    );

    // چرخش خودکار هر ۳ ثانیه (با هاور/لمس متوقف می‌شود)
    useEffect(() => {
        if (paused || total < 2) return;
        const timer = setInterval(next, 3000);
        return () => clearInterval(timer);
    }, [next, paused, total]);

    // سوایپ روی موبایل
    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
    };
    const onTouchEnd = (e) => {
        if (touchStartX.current !== null) {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) {
                dx < 0 ? next() : prev();
            }
        }
        touchStartX.current = null;
        setPaused(false);
    };

    // -1 = چپ ، 0 = وسط ، 1 = راست ، بقیه = مخفی
    const getPosition = (personIndex) => {
        let diff = personIndex - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        if (diff < -1 || diff > 1) return null;
        return diff;
    };

    // مرکزچین کردن داخل خود transform انجام می‌شود (-50%) تا
    // با کلاس‌های translate تیلویند تداخل نداشته باشد.
    // --card-w , --gap , --lift در کانتینر بر اساس breakpoint تنظیم می‌شوند.
    const center = "calc(-50% + var(--x, 0px))";
    const positionStyles = {
        "-1": {
            "--x": "calc(var(--card-w) * var(--gap) * -1)",
            transform: `translate3d(${center}, -50%, 0) scale(0.85)`,
            opacity: 0.35,
            filter: "blur(1.5px)",
            zIndex: 5,
        },
        0: {
            "--x": "0px",
            transform: `translate3d(${center}, calc(-50% - var(--lift)), 0) scale(1.12)`,
            opacity: 1,
            filter: "blur(0)",
            zIndex: 10,
        },
        1: {
            "--x": "calc(var(--card-w) * var(--gap))",
            transform: `translate3d(${center}, -50%, 0) scale(0.85)`,
            opacity: 0.35,
            filter: "blur(1.5px)",
            zIndex: 5,
        },
    };

    const hiddenStyle = {
        "--x": "0px",
        transform: `translate3d(${center}, -50%, 0) scale(0.5)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div
                className="relative group"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* دکمه چپ */}
                <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-30
                        w-9 h-9 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur
                        flex items-center justify-center text-white
                        opacity-100 md:opacity-0 md:group-hover:opacity-100
                        transition-all duration-300
                        hover:bg-black/80 hover:scale-110"
                >
                    <FaChevronLeft className="text-sm md:text-xl" />
                </button>

                {/* دکمه راست */}
                <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-30
                        w-9 h-9 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur
                        flex items-center justify-center text-white
                        opacity-100 md:opacity-0 md:group-hover:opacity-100
                        transition-all duration-300
                        hover:bg-black/80 hover:scale-110"
                >
                    <FaChevronRight className="text-sm md:text-xl" />
                </button>

                {/* صحنه */}
                <div
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    className="relative w-full overflow-x-clip touch-pan-y select-none
                        [--card-w:210px] [--gap:0.78] [--lift:12px] [--pad:28px]
                        min-[420px]:[--card-w:240px]
                        sm:[--card-w:270px] sm:[--gap:0.95]
                        md:[--card-w:320px] md:[--gap:1.1] md:[--lift:24px] md:[--pad:40px]
                        lg:[--card-w:340px]"
                    style={{
                        perspective: "1200px",
                        // ارتفاع کارت = عرض × 4/3 ، ضربدر 1.12 برای اسکیل وسط
                        // این ارتفاع ثابت است و هیچ‌وقت هنگام تعویض تغییر نمی‌کند
                        height: "calc(var(--card-w) * 1.4934 + var(--lift) + var(--pad) * 2)",
                    }}
                >
                    {people.map((person, i) => {
                        const pos = getPosition(i);
                        const isHidden = pos === null;
                        const isCenter = pos === 0;
                        const style = {
                            width: "var(--card-w)",
                            left: "50%",
                            top: "50%",
                            willChange: "transform, opacity",
                            backfaceVisibility: "hidden",
                            ...(isHidden ? hiddenStyle : positionStyles[pos]),
                        };

                        return (
                            <div
                                key={person.id}
                                aria-hidden={isHidden}
                                className="absolute transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                style={style}
                            >
                                {/* کارت پروفایل */}
                                <div
                                    className={`group/card relative overflow-hidden rounded-2xl transition-shadow duration-700
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
                                            draggable={false}
                                            sizes="(max-width: 420px) 210px, (max-width: 640px) 240px, (max-width: 768px) 270px, (max-width: 1024px) 320px, 340px"
                                            className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                                        />

                                        {/* نوار تار پایین */}
                                        <div
                                            className="absolute bottom-0 inset-x-0 h-24 sm:h-28 md:h-32 backdrop-blur-md pointer-events-none"
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
                                    <div className="absolute bottom-0 inset-x-0 px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4">
                                        <h3
                                            className={`${
                                                estedad.className
                                            } text-cream-50 font-bold truncate transition-all duration-500
                                            ${
                                                isCenter
                                                    ? "text-base sm:text-lg md:text-xl"
                                                    : "text-sm sm:text-base"
                                            }`}
                                        >
                                            {person.name}
                                        </h3>
                                        <p
                                            className={`text-cream-50/85 truncate transition-all duration-500 mt-0.5
                                            ${
                                                isCenter
                                                    ? "text-xs sm:text-sm md:text-base"
                                                    : "text-[11px] sm:text-xs md:text-sm"
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

            {/* نقطه‌های ناوبری */}
            <div className="flex justify-center items-center gap-1.5 md:gap-2 mt-5 md:mt-8 flex-wrap px-4">
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
                                    ? "w-7 h-2.5 md:w-9 md:h-3 bg-teal-500 dark:bg-teal-400"
                                    : "w-2.5 h-2.5 md:w-3 md:h-3 bg-night-700/20 dark:bg-night-700/40 hover:bg-night-700/50 dark:hover:bg-cream-50/50"
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
