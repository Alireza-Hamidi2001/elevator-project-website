// app/dashboard/admin/users/UserActionsMenu.jsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
    FaEllipsisV,
    FaRegEye,
    FaUserSlash,
    FaUserCheck,
    FaTrashAlt,
} from "react-icons/fa";
import UserDetailsModal from "./UserDetailsModal";
import SpinnerMini from "@/app/components/SpinnerMini";
import { estedad } from "@/app/_fonts/fonts";
import { toggleUserStatusAction, deleteUserAction } from "./actions";

const MENU_WIDTH = 224;
const MENU_HEIGHT_ESTIMATE = 190;
const GAP = 8;
const EDGE = 12;
const CLOSE_DELAY = 160;

// منو داخل Portal رندر می‌شود تا توسط overflow جدول بریده نشود،
// پس موقعیتش را از روی دکمه محاسبه می‌کنیم.
function computePosition(rect) {
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp =
        spaceBelow < MENU_HEIGHT_ESTIMATE + GAP + EDGE &&
        rect.top > MENU_HEIGHT_ESTIMATE;

    const left = Math.min(
        Math.max(EDGE, rect.left),
        window.innerWidth - MENU_WIDTH - EDGE,
    );
    const originX = rect.left + rect.width / 2 - left;

    return {
        left,
        ...(openUp
            ? { bottom: window.innerHeight - rect.top + GAP }
            : { top: rect.bottom + GAP }),
        transformOrigin: `${originX}px ${openUp ? "bottom" : "top"}`,
    };
}

export default function UserActionsMenu({ user, isCurrentUser }) {
    const router = useRouter();
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const closeTimer = useRef(null);

    const [mounted, setMounted] = useState(false); // داخل DOM است
    const [visible, setVisible] = useState(false); // وضعیت انیمیشن
    const [style, setStyle] = useState({});
    const [confirming, setConfirming] = useState(false);
    const [pending, setPending] = useState(null); // "toggle" | "delete" | null
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const canDelete = user.role !== "admin" && !isCurrentUser;
    const canToggle = !isCurrentUser;
    const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();

    const openMenu = useCallback(() => {
        clearTimeout(closeTimer.current);
        const rect = triggerRef.current.getBoundingClientRect();
        setStyle(computePosition(rect));
        setMounted(true);
        // دو فریم صبر می‌کنیم تا transition از حالت اولیه شروع شود
        requestAnimationFrame(() =>
            requestAnimationFrame(() => setVisible(true)),
        );
    }, []);

    const closeMenu = useCallback(() => {
        setVisible(false);
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            setMounted(false);
            setConfirming(false);
            setError(null);
        }, CLOSE_DELAY);
    }, []);

    // بستن با کلیک بیرون / Escape / اسکرول / تغییر سایز
    useEffect(() => {
        if (!mounted) return;

        const onPointerDown = (e) => {
            if (
                menuRef.current?.contains(e.target) ||
                triggerRef.current?.contains(e.target)
            )
                return;
            closeMenu();
        };
        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                closeMenu();
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("scroll", closeMenu, true);
        window.addEventListener("resize", closeMenu);

        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("scroll", closeMenu, true);
            window.removeEventListener("resize", closeMenu);
        };
    }, [mounted, closeMenu]);

    useEffect(() => () => clearTimeout(closeTimer.current), []);

    const closeModal = useCallback(() => setModalOpen(false), []);

    function handleView() {
        closeMenu();
        setModalOpen(true);
    }

    async function runAction(kind, fn) {
        setError(null);
        setPending(kind);
        try {
            const res = await fn();
            if (res?.error) {
                setError(res.error);
                return;
            }
            router.refresh();
            closeMenu();
        } catch {
            setError("خطایی رخ داد. دوباره تلاش کن.");
        } finally {
            setPending(null);
        }
    }

    function handleToggle() {
        runAction(
            "toggle",
            () => toggleUserStatusAction(user.id, user.is_active),
        );
    }
    function handleDelete() {
        runAction("delete", () => deleteUserAction(user.id));
    }

    // آیتم‌ها به‌ترتیب با کمی تأخیر وارد می‌شوند
    let order = 0;

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={mounted && visible ? closeMenu : openMenu}
                aria-haspopup="menu"
                aria-expanded={mounted && visible}
                aria-label={`عملیات ${fullName}`}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-night-700/60 transition-colors hover:bg-night-700/5 hover:text-night-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-cream-50/60 dark:hover:bg-cream-50/10 dark:hover:text-cream-50 ${
                    mounted && visible
                        ? "bg-night-700/5 text-night-900 dark:bg-cream-50/10 dark:text-cream-50"
                        : ""
                }`}
            >
                <FaEllipsisV className="h-4 w-4" />
            </button>

            {mounted &&
                createPortal(
                    <div
                        ref={menuRef}
                        role="menu"
                        dir="rtl"
                        style={{
                            position: "fixed",
                            width: MENU_WIDTH,
                            ...style,
                        }}
                        className={`${
                            estedad.className
                        } z-[110] rounded-2xl border border-night-700/10 bg-white/95 p-1.5 shadow-2xl shadow-night-950/20 backdrop-blur-xl transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none dark:border-cream-50/10 dark:bg-night-800/95 ${
                            visible
                                ? "scale-100 opacity-100"
                                : "scale-90 opacity-0"
                        }`}
                    >
                        {confirming ? (
                            <ConfirmPanel
                                name={fullName}
                                loading={pending === "delete"}
                                onCancel={() => {
                                    setConfirming(false);
                                    setError(null);
                                }}
                                onConfirm={handleDelete}
                            />
                        ) : (
                            <>
                                <MenuItem
                                    icon={FaRegEye}
                                    onClick={handleView}
                                    visible={visible}
                                    index={order++}
                                >
                                    مشاهده جزئیات
                                </MenuItem>

                                {canToggle && (
                                    <MenuItem
                                        icon={
                                            user.is_active
                                                ? FaUserSlash
                                                : FaUserCheck
                                        }
                                        onClick={handleToggle}
                                        loading={pending === "toggle"}
                                        disabled={pending !== null}
                                        visible={visible}
                                        index={order++}
                                    >
                                        {user.is_active
                                            ? "غیرفعال کردن کاربر"
                                            : "فعال کردن کاربر"}
                                    </MenuItem>
                                )}

                                {canDelete && (
                                    <>
                                        <div className="mx-2 my-1.5 h-px bg-night-700/10 dark:bg-cream-50/10" />
                                        <MenuItem
                                            icon={FaTrashAlt}
                                            danger
                                            onClick={() => setConfirming(true)}
                                            visible={visible}
                                            index={order++}
                                        >
                                            حذف کاربر
                                        </MenuItem>
                                    </>
                                )}
                            </>
                        )}

                        {error && (
                            <p className="px-3 pb-2 pt-1 text-xs text-red-500">
                                {error}
                            </p>
                        )}
                    </div>,
                    document.body,
                )}

            <UserDetailsModal
                userId={user.id}
                open={modalOpen}
                onClose={closeModal}
            />
        </>
    );
}

function MenuItem({
    icon: Icon,
    children,
    onClick,
    disabled,
    loading,
    danger,
    visible,
    index,
}) {
    return (
        <button
            type="button"
            role="menuitem"
            onClick={onClick}
            disabled={disabled}
            style={{
                transitionDelay: visible ? `${60 + index * 45}ms` : "0ms",
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm transition-[opacity,transform,background-color] duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-2 opacity-0"
            } ${
                danger
                    ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                    : "text-night-800 hover:bg-night-700/5 dark:text-cream-50 dark:hover:bg-cream-50/10"
            }`}
        >
            <span className="flex h-5 w-5 items-center justify-center">
                {loading ? (
                    <SpinnerMini />
                ) : (
                    <Icon className="h-4 w-4 opacity-80" />
                )}
            </span>
            {children}
        </button>
    );
}

function ConfirmPanel({ name, loading, onCancel, onConfirm }) {
    return (
        <div className="space-y-3 p-3">
            <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <FaTrashAlt className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-night-900 dark:text-cream-50">
                        حذف {name}؟
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-night-700/60 dark:text-cream-50/60">
                        این کار قابل بازگشت نیست.
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 rounded-xl bg-night-700/5 py-2 text-xs font-medium text-night-800 transition hover:bg-night-700/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-60 dark:bg-cream-50/10 dark:text-cream-50 dark:hover:bg-cream-50/15"
                >
                    انصراف
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-2 text-xs font-medium text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-night-800"
                >
                    {loading ? <SpinnerMini /> : "بله، حذف شود"}
                </button>
            </div>
        </div>
    );
}
