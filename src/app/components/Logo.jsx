import logo from "@/app/logos/alireza4.png";
import Link from "next/link";

function Logo() {
    return (
        <Link href='/' className="relaative h-[4rem]">
            <img
                src={logo.src}
                alt="logo image"
                className="p-2 h-[4rem]"
            />
        </Link>
    );
}

export default Logo;
