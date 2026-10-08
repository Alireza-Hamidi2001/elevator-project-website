"use client";
import { estedad, parastoo } from "../../_fonts/fonts";

function HeroSection() {
    const handleScroll = (e, id) => {
        e.preventDefault();
        const elem = document.getElementById(id);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative h-[calc(100vh-4rem)]">
            <div className="absolute left-[10%] top-[50%] translate-y-[-50%] text-center flex flex-col justify-center items-center px-12 py-6">
                <h2
                    className={`${parastoo.className} mb-4 text-center text-[5rem]`}
                >
                    درخشان آبادیس آسانبر
                </h2>
                <div className="flex items-center gap-4">
                    <a
                        href="#about"
                        onClick={(e) => handleScroll(e, "about")}
                        className={`${estedad.className} px-4 py-2 rounded-sm hover:-translate-y-1 duration-300 text-[1rem] bg-red-600 dark:bg-red-400 text-cream-50`}
                    >
                        درباره ما
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleScroll(e, "contact")}
                        className={`${estedad.className} px-4 py-2 rounded-sm hover:-translate-y-1 hover:bg-red-600 dark:hover:bg-red-400 duration-300 text-[1rem] text-red-600 hover:text-cream-50 dark:text-red-400 bg-transparent border border-red-600 dark:border-red-400`}
                    >
                        ارتباط با ما
                    </a>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
