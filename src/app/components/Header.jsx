// app/components/Header.jsx
import LoginBtn from "./LoginBtn";
import UserMenu from "./UserMenu";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Theme from "./Theme";

function Header({ profile }) {
    const authSlot = profile ? <UserMenu profile={profile} /> : <LoginBtn />;

    return (
        <header className="fixed z-20 top-0 left-0 flex items-center justify-between w-full backdrop-blur-sm bg-cream-50/5 dark:bg-night-700/50 px-4 sm:px-6 md:px-8">
            {/* راست: ورود + تم + همبرگری — همه کنار هم */}
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
