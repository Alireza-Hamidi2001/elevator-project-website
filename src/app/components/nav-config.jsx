// components/nav-config.jsx
import { BiMessage, BiSolidMessage } from "react-icons/bi";
import { FaClipboardCheck, FaRegStar, FaStar, FaUserPlus } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { IoDocument, IoDocumentOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { RiHeadphoneFill, RiHeadphoneLine } from "react-icons/ri";
import { TbEdit, TbEditFilled, TbReportAnalytics, TbReportAnalyticsFilled } from "react-icons/tb";

export const navItems = [
    // فقط کاربر عادی-----------------
    {
        name: "داشبورد",
        href: "/dashboard/user",
        icon: GoHome,
        iconActive: GoHomeFill,
        roles: ["user"],
        exact: true,
    },

    {
        name: "ثبت نظر",
        href: "/dashboard/user/review/new",
        icon: FaRegStar,
        iconActive: FaStar,
        roles: ["user"],
        exact: true,
    },
    {
        name: "نظرات من",
        href: "/dashboard/user/review",
        icon: LuClipboardCheck,
        iconActive: FaClipboardCheck,
        roles: ["user"],
        exact: true,
    },
    {
        name: "درخواست پشتیبانی",
        href: "/dashboard/user/tickets",
        icon: RiHeadphoneLine,
        iconActive: RiHeadphoneFill,
        roles: ["user"],
    },
    {
        name: "گزارشات من",
        href: "/dashboard/user/reports",
        icon: TbReportAnalytics,
        iconActive: TbReportAnalyticsFilled,
        roles: ["user"],
    },

    //----------------- فقط ادمین -----------------
    {
        name: "داشبورد",
        href: "/dashboard/admin",
        icon: GoHome,
        iconActive: GoHomeFill,
        roles: ["admin"],
        exact: true,
    },
    {
        name: "کاربران",
        href: "/dashboard/admin/users",
        icon: HiOutlineUsers,
        iconActive: HiUsers,
        roles: ["admin"],
    },
    {
        name: "ثبت نام جدید",
        href: "/dashboard/admin/register",
        icon: FiUserPlus,
        iconActive: FaUserPlus,
        roles: ["admin"],
    },
    {
        name: "بررسی نظرات",
        href: "/dashboard/admin/reviews",
        icon: LuClipboardCheck,
        iconActive: FaClipboardCheck,
        roles: ["admin"],
        badgeKey: "pendingReviews",
    },
    {
        name: "بررسی تیکت ها",
        href: "/dashboard/admin/ticketInbox",
        icon: BiMessage,
        iconActive: BiSolidMessage,
        roles: ["admin"],
        badgeKey: "openTickets",
    },
    {
        name: "گزارشات",
        href: "/dashboard/admin/reports",
        icon: TbReportAnalytics,
        iconActive: TbReportAnalyticsFilled,
        roles: ["admin"],
    },
    //----------------- مشترک -----------------
    {
        name: "ویرایش اطلاعات",
        href: "/dashboard/edit",
        icon: TbEdit,
        iconActive: TbEditFilled,
        roles: ["admin", "user"],
    },
    {
        name: "قوانین و مقررات",
        href: "/dashboard/rules",
        icon: IoDocumentOutline,
        iconActive: IoDocument,
        roles: ["admin", "user"],
    },
];
