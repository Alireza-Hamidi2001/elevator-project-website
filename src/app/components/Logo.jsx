import Image from "next/image";
import logo from "./../public/Abadis-raw-black.png";
import Link from "next/link";

function Logo() {
    return (
        <Link
            href="/"
            className="relaative bg-white w-[4rem]"
        >
            <Image
                alt="logo image"
                src={logo}
                className="p-2"
            />
        </Link>
    );
}

export default Logo;
