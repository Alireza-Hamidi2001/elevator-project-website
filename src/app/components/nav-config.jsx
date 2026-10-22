// components/nav-config.jsx
import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { LuMessageSquare, LuStar, LuClipboardCheck } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";

export const navItems = [
    // فقط کاربر عادی
    {
        name: "داشبورد",
        href: "/dashboard/user",
        icon: GoHome,
        roles: ["user"],
        exact: true,
    },
    // مشترک
    {
        name: "قوانین و مقررات",
        href: "/dashboard/rules",
        icon: IoDocumentTextOutline,
        roles: ["admin", "user"],
    },

    {
        name: "ثبت نظر",
        href: "/dashboard/reviews/new",
        icon: LuStar,
        roles: ["user"],
        exact: true,
    },
    {
        name: "نظرات من",
        href: "/dashboard/reviews",
        icon: LuClipboardCheck,
        roles: ["user"],
        exact: true,
    },
    {
        name: "تیکت‌های من",
        href: "/dashboard/tickets",
        icon: LuMessageSquare,
        roles: ["user"],
    },
    {
        name: "گزارشات من",
        href: "/dashboard/reports",
        icon: TbReportSearch,
        roles: ["user"],
    },

    // فقط ادمین
    {
        name: "داشبورد",
        href: "/dashboard/admin",
        icon: GoHome,
        roles: ["admin"],
        exact: true,
    },
    {
        name: "کاربران",
        href: "/dashboard/admin/users",
        icon: HiMiniUsers,
        roles: ["admin"],
    },
    {
        name: "ثبت نام جدید",
        href: "/dashboard/admin/register",
        icon: FaUserPlus,
        roles: ["admin"],
    },
    {
        name: "بررسی نظرات",
        href: "/dashboard/admin/reviews",
        icon: LuClipboardCheck,
        roles: ["admin"],
        badgeKey: "pendingReviews",
    },
    {
        name: "تیکت‌ها",
        href: "/dashboard/admin/tickets",
        icon: LuMessageSquare,
        roles: ["admin"],
        badgeKey: "openTickets",
    },
    {
        name: "گزارشات",
        href: "/dashboard/admin/reports",
        icon: TbReportSearch,
        roles: ["admin"],
    },
];
