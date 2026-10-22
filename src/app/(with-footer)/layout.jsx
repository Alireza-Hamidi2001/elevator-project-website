import { createClient } from "@/lib/supabase/server";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default async function WithFooterLayout({ children }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    let profile = null;
    if (user) {
        const { data } = await supabase
            .from("profiles")
            .select("first_name, last_name, role")
            .eq("id", user.id)
            .single();
        profile = data;
    }
    return (
        <>
            <Header profile={profile} />
            {children}
            <Footer />
        </>
    );
}
