// app/login/page.jsx
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = { title: "ورود" };

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="grid grid-cols-1 w-full max-w-[80vw] md:max-w-[50vw] lg:max-w-[30vw] rounded-lg overflow-hidden shadow-lg">
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
