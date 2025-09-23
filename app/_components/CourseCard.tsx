import { Button } from "@/components/ui/button"
import React from "react"
import ImageCard from "@/public/3.jpg"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const courses = [
    {
        id: 1,
        title: "Программирование на языке python",
        tutor: "Сабиев Муса",
        image: ImageCard,
    },
    {
        id: 2,
        title: "Основы JavaScript",
        tutor: "Сабиев Муса",
        image: ImageCard,
    },
    {
        id: 3,
        title: "Математика",
        tutor: "Хурцаев Усман",
        image: ImageCard,
    },
    {
        id: 4,
        title: "Физика",
        tutor: "Бециев Эмин",
        image: ImageCard,
    },
    {
        id: 5,
        title: "Русский язык",
        tutor: "Исроилова Белита",
        image: ImageCard,
    },
]

const CourseCard = () => {
    return (
        <div className="max-w-7xl mx-auto mb-8">
            <div className="flex justify-between items-center mb-6 mt-6">
                <h2 className="text-2xl font-bold">My Course</h2>
                <Button
                    variant="outline"
                    className="whitespace-nowrap cursor-pointer"
                >
                    View All
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        className={`overflow-hidden hover:shadow-lg transition-shadow bg-white cursor-pointer`}
                    >
                        <div className="h-40 overflow-hidden">
                            <img
                                src={course.image.src}
                                alt={course.title}
                                className="w-full h-full object-cover transition-all duration-150 hover:scale-105"
                            />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle>{course.title}</CardTitle>
                            </div>
                            <CardDescription>
                                <span className="flex items-center">
                                    <i className="fas fa-user-tie mr-2 text-blue-500">
                                        Преподаватель: {course.tutor}
                                    </i>
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full whitespace-nowrap cursor-pointer"
                            >
                                Continue
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CourseCard
