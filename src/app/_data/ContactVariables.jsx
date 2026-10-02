import {
    FaPhoneAlt,
    FaTelegramPlane,
    FaEnvelope,
    FaMapMarkerAlt,
    FaMobileAlt,
} from "react-icons/fa";

export const contactInfo = [
        {
            id: "phone",
            icon: <FaPhoneAlt className="w-10 h-10" />,
            title: "تلفن ثابت",
            values: ["051-3847-2210", "051-3847-2211"],
            href: "tel:05138472210",
        },
        {
            id: "mobile",
            icon: <FaMobileAlt className="w-10 h-10" />,
            title: "تلفن همراه",
            values: ["0915-123-4567", "0915-765-4321"],
            href: "tel:09151234567",
        },
        {
            id: "telegram",
            icon: <FaTelegramPlane className="w-10 h-10" />,
            title: "تلگرام",
            values: ["@elevator_support"],
            href: "https://t.me/elevator_support",
        },
        {
            id: "email",
            icon: <FaEnvelope className="w-10 h-10" />,
            title: "ایمیل",
            values: ["info@elevator-platform.ir"],
            href: "mailto:info@elevator-platform.ir",
        },
    ];
