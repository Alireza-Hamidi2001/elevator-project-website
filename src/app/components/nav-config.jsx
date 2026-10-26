// components/nav-config.jsx
import { GoHome } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { LuMessageSquare, LuStar, LuClipboardCheck } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";

export const navItems = [
    // فقط کاربر عادی-----------------
    {
        name: "داشبورد",
        href: "/dashboard/user",
        icon: GoHome,
        roles: ["user"],
        exact: true,
    },

    {
        name: "ثبت نظر",
        href: "/dashboard/user/review/new",
        icon: LuStar,
        roles: ["user"],
        exact: true,
    },
    {
        name: "نظرات من",
        href: "/dashboard/user/review",
        icon: LuClipboardCheck,
        roles: ["user"],
        exact: true,
    },
    {
        name: "درخواست پشتیبانی",
        href: "/dashboard/user/tickets",
        icon: LuMessageSquare,
        roles: ["user"],
    },
    {
        name: "گزارشات من",
        href: "/dashboard/user/reports",
        icon: TbReportSearch,
        roles: ["user"],
    },

    //----------------- فقط ادمین -----------------
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
        name: "بررسی تیکت ها",
        href: "/dashboard/admin/ticketInbox",
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
    //----------------- مشترک -----------------
    {
        name: "ویرایش اطلاعات",
        href: "/dashboard/edit",
        icon: IoDocumentTextOutline,
        roles: ["admin", "user"],
    },
    {
        name: "قوانین و مقررات",
        href: "/dashboard/rules",
        icon: IoDocumentTextOutline,
        roles: ["admin", "user"],
    },
];
