import Image from "next/image";
import { almarai, estedad, parastoo } from "../../layout";
import heroImage from "@/app/public/hero-image.png";
import Link from "next/link";

function HeroSection() {
    return (
        <>
            <div className="relative h-[calc(100vh-4rem)]">
                <div className="absolute left-[10%] top-[50%] translate-y-[-50%] text-center flex flex-col justify-center items-center px-12 py-6">
                    <h1
                        className={`${almarai.className} text-[4rem] font-extrabold`}
                    >
                        ELEVATOR
                    </h1>
                    <h2
                        className={`${parastoo.className} mb-4 text-center text-[3rem]`}
                    >
                        درخشان آبادیس آسانبر  
                    </h2>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/about"
                            className={`${estedad.className} px-4 py-2 rounded-sm hover:-translate-y-1 duration-300 text-[1rem] bg-red-600 dark:bg-red-400 text-cream-50 `}
                        >
                            درباره ما{" "}
                        </Link>
                        <Link
                            href="/contact"
                            className={`${estedad.className} px-4 py-2 rounded-sm hover:-translate-y-1 hover:bg-red-600 dark:hover:bg-red-400 duration-300 text-[1rem] text-red-600 hover:text-cream-50 dark:text-red-400  dark:text-red-500 bg-transparent border border-red-600 dark:border-red-400 `}
                        >
                            ارتباط با ما{" "}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;
