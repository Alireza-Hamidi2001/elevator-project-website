// app/components/Header.jsx
import LoginBtn from "./LoginBtn";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navigation from "./Navigation";
import Theme from "./Theme";
import UserMenu from "./UserMenu";

function Header({ profile }) {
    const authSlot = profile ? <UserMenu profile={profile} /> : <LoginBtn />;

    return (
        <header className="fixed z-20 top-0 left-0 flex items-center justify-between w-full backdrop-blur-sm bg-cream-100/50 dark:bg-night-700/50 px-4 sm:px-6 md:px-8">
            <div className="flex items-center gap-2">
                <MobileMenu />
                {authSlot}
                <Theme />
            </div>
            <Navigation />
            <Logo />
        </header>
    );
}

export default Header;
