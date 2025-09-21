import Image from "next/image"
import HeroSection from "./_components/HeroSection"
import CourseCard from "./_components/CourseCard"

export default function Home() {
    return (
        <div>
            <HeroSection />
            <CourseCard />
        </div>
    )
}
