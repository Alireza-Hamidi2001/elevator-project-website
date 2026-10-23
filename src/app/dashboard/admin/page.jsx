import ProfileCard from "@/app/components/ProfileCard";
import { getCurrentProfile } from "@/lib/profile";

async function page() {
    const profile = await getCurrentProfile();

    return (
        <div className="py-4 px-6 bg-white dark:bg-night-900 shadow-sm overflow-auto h-[calc(100vh-0rem)]">
            <ProfileCard profile={profile} />
            
        </div>
    );
}

export default page;
