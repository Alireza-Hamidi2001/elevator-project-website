// app/components/Logo.jsx
import Image from "next/image";
import logo_white from "./../public/Abadis-raw-white.png";
import logo_black from "./../public/Abadis-raw-black.png";
import Link from "next/link";

function Logo() {
    return (
        <Link
            href="/"
            className="relative w-[4rem] block"
        >
            <Image
                alt="لوگو"
                src={logo_black}
                className="p-2 dark:hidden"
                priority
            />
            <Image
                alt="لوگو"
                src={logo_white}
                className="p-2 hidden dark:block"
                priority
            />
        </Link>
    );
}

export default Logo;
