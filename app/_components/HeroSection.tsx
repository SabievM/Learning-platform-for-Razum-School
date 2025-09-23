"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { div } from "framer-motion/client"
import { BookOpen, PlayCircle } from "lucide-react"
import React from "react"

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen bg-gradient-to-br from-violet-950 via-indigo-900 to-gray-900 flex items-center justify-center overflow-hidden px-4">
            <div className="absolute top-[100px] left-[-100px] w-[300px] h-[300px] bg-purple-600 opacity-30 rounded-full blur-[150px] z-0" />
            <div className="absolute bottom-[100px] right-[-100px] w-[300px] h-[300px] bg-purple-600 opacity-30 rounded-full blur-[150px] z-0" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-3xl text-center space-y-6"
            >
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
                    Empower Your Learning
                    <span className="ml-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        LMS
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                    Discover a world of knowledge and skills at ypur fingertips.
                    Join us today and unlock your potential with our
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 cursor-pointer"
                    >
                        <BookOpen className="mr-2 h-4 w-5" />
                        Explore Course
                    </Button>
                    <Button
                        size="lg"
                        className="bg-gray-400 text-white hover:bg-gray-800 cursor-pointer"
                    >
                        <PlayCircle className="mr-2 h-4 w-5" />
                        Watch Demo
                    </Button>
                </div>
            </motion.div>
        </section>
    )
}

export default HeroSection
