"use client"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import clsx from "clsx"
import { GraduationCapIcon, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const Navbar = () => {
    const { user, setUser, setToken, logOut } = useAuthStore()
    const [scrolled, setScrolled] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <nav
                className={clsx(
                    "fixed top-0 w-full z-60 transition-all duration-300",
                    scrolled
                        ? "bg-white shadow-md text-gray"
                        : "bg-transparent text-white backdrop-blur-sm"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    {/* logo */}
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <GraduationCapIcon className="h-6 w-6 " />
                        <Link href="/">LMS</Link>
                    </div>
                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <a
                            href="/"
                            className=" hover:text-purple-500 transition"
                        >
                            Home
                        </a>
                        <a
                            href="/"
                            className=" hover:text-purple-500 transition"
                        >
                            Course
                        </a>
                        <a
                            href="/"
                            className=" hover:text-purple-500 transition"
                        >
                            About
                        </a>
                        <a
                            href="/"
                            className=" hover:text-purple-500 transition"
                        >
                            Contact
                        </a>
                    </div>
                    {/* Desktop Actions */}
                    {user ? (
                        <div className="hidden md:flex gap-2">
                            <Button
                                onClick={() => router.push("/student/profile")}
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-700 text-white cursor-pointer"
                            >
                                Профиль
                            </Button>
                            <Button
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-700 text-white cursor-pointer"
                                onClick={() => logOut()}
                            >
                                {user.name} Выйти
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <Button
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-700 text-white cursor-pointer"
                                onClick={() => router.push("/auth")}
                            >
                                Войти
                            </Button>
                        </div>
                    )}

                    {/* Mobile menu icons */}
                    <div className="md:hidden cursor-pointer">
                        {openMobileMenu ? (
                            <X
                                className=""
                                onClick={() => setOpenMobileMenu(false)}
                            />
                        ) : (
                            <Menu
                                className=""
                                onClick={() => setOpenMobileMenu(true)}
                            />
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}

            {openMobileMenu && (
                <div
                    className={clsx(
                        "md:hidden fixed top-16 left-0 w-full z-40 px-6 py-4 bg-white text-gray-900 shadow-md space-y-4 transition-all duration-300"
                    )}
                >
                    <a
                        href="/"
                        className="block text-black hover:text-purple-500 transition"
                    >
                        Home
                    </a>
                    <a
                        href="/"
                        className="block text-black hover:text-purple-500 transition"
                    >
                        Course
                    </a>
                    <a
                        href="/"
                        className="block text-black hover:text-purple-500 transition"
                    >
                        About
                    </a>
                    <a
                        href="/"
                        className="block text-black hover:text-purple-500 transition"
                    >
                        Contact
                    </a>
                    {user ? (
                        <div className="pt-4 flex flex-col gap-5">
                            <Button
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-700 text-white cursor-pointer"
                            >
                                Профиль
                            </Button>
                            <Button
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-700 text-white cursor-pointer"
                            >
                                Выйти
                            </Button>
                        </div>
                    ) : (
                        <div className="pt-4 flex flex-col">
                            <Button
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-700 text-white cursor-pointer"
                            >
                                Войти
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Navbar
