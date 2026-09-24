// app/page.jsx

import PeopleGallery from "./PeopleClient";
import user_1 from "@/app/public/user-1.png";
import user_2 from "@/app/public/user-2.png";

const person_about = [
    {
        id: 1,
        name: "علی رضایی",
        role: "توسعه‌دهنده فرانت‌اند",
        image: user_1,
    },
    {
        id: 2,
        name: "مریم احمدی",
        role: "طراح UI/UX",
        image: user_2,
    },
    {
        id: 3,
        name: "رضا کریمی",
        role: "برنامه‌نویس بک‌اند",
        image: user_1,
    },
];

export default function PeopleServer() {
    return <PeopleGallery people={person_about} />;
}
