import { LuLogIn } from "react-icons/lu";
import { estedad } from "../_fonts/fonts";
import Link from "next/link";

function LoginBtn() {
    return (
        <Link
            href="/login"
            className={`${estedad.className} text-cream-50 flex items-center gap-1 cursor-pointer bg-red-500 dark:bg-red-400 px-4 py-1 rounded-full hover:-translate-y-0.5 duration-300 transition-all`}
        >
            <LuLogIn />
            ورود
        </Link>
    );
}

export default LoginBtn;
