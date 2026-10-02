import SideNavigation from "../components/SideNavigation";

function layout({ children }) {
    return (
        <div className="grid grid-cols-[15rem_1fr] gap-4 my-[4rem] px-4 pt-2">
            <SideNavigation />
            {children}
        </div>
    );
}

export default layout;
