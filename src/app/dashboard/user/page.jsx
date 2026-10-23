import ProfileCard from "@/app/components/ProfileCard";
import { getCurrentProfile } from "@/lib/profile";

async function page() {
    const profile = await getCurrentProfile();

    return (
        <div className="py-6 px-6 bg-white dark:bg-night-900 shadow-sm min-h-[calc(100vh-4rem)]">
            <ProfileCard profile={profile} />
        </div>
    );
}

export default page;
