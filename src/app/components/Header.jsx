import LoginBtn from "./LoginBtn";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Theme from "./Theme";

function Header() {
    return (
        <div className="fixed z-20 top-0 left-0 flex items-center justify-between w-full backdrop-blur-sm bg-cream-50/5 dark:bg-night-700/50 md:px-8">
            <div className="flex items-center gap-2">
                <LoginBtn />
                <Theme />
            </div>
            <Navigation />
            <Logo />
        </div>
    );
}

export default Header;
