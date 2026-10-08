import Link from "next/link";
import { almarai } from "./_fonts/fonts";

function notFound() {
    return (
        <section className="relative w-screen h-screen flex flex-col items-center justify-center">
            <p className="absolute text-red-400/12 z-10 text-[25rem]">404</p>
            <p
                className={`${almarai.className} relative z-20 text-red-400 text-[4rem]`}
            >
                صفحه مورد نظر یافت نشد.
            </p>
            <Link
                href="/"
                className="relative z-30 px-4 py-2 bg-red-400 rounded-sm cursor-pointer transition-all duration-200 hover:-translate-y-1"
            >
                بازگشت به خانه
            </Link>
        </section>
    );
}

export default notFound;
