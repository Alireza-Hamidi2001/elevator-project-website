"use client";

import { useEffect, useState } from "react";
import { FaAngleUp, FaHeadset } from "react-icons/fa";
import ContactModal from "./ContactModal";

function UpBtn() {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                aria-label="ارتباط با ما"
                className="fixed z-30 bottom-[4.5rem] right-4 md:bottom-[5.5rem] md:right-6
                    w-12 h-12 rounded-full
                    flex items-center justify-center
                    bg-red-500 dark:bg-red-400
                    text-cream-50 dark:text-night-950
                    shadow-lg shadow-red-500/30 dark:shadow-red-400/20
                    transition-all duration-500 ease-out
                    hover:-translate-y-1 hover:scale-110
                    hover:bg-red-600 dark:hover:bg-red-300 cursor-pointer
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
                <FaHeadset className="text-xl" />
            </button>

            {/* دکمه بازگشت به بالا */}
            <button
                onClick={scrollToTop}
                aria-label="بازگشت به بالا"
                className={`fixed z-30 bottom-4 right-4 md:bottom-6 md:right-6
                    w-auto h-10 px-8 rounded-full
                    flex items-center justify-center gap-2
                    bg-night-700/70 dark:bg-cream-50/50 hover:bg-night-700 dark:hover:bg-cream-50
                    text-cream-50 dark:text-night-700
                    shadow-lg shadow-night-950/20 dark:shadow-black/40
                    transition-all duration-500 ease-out
                    hover:-translate-y-1
                    focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer
                    ${
                        isVisible
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
            >
                <FaAngleUp className="text-xl" />
                بازگشت به بالا
            </button>

            {/* مودال */}
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default UpBtn;
