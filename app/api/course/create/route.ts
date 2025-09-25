import { connectDB } from "@/config/db"
import jwt from "jsonwebtoken"
import { uploadMedia } from "@/lib/cloudinary"
import { userModel } from "@/models/user"
import { Course } from "@/models/course"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    await connectDB()
    try {
        const {
            courseTitle,
            subtitle,
            description,
            category,
            coursePrice,
            courseThumbnail,
            courseLanguage,
            studentLearning,
        } = await request.json()
        if (
            !courseTitle ||
            !subtitle ||
            !description ||
            !category ||
            !coursePrice ||
            !courseThumbnail ||
            !courseLanguage ||
            !studentLearning
        ) {
            return NextResponse.json(
                { message: "Заполните все поля" },
                { status: 400 }
            )
        }
        const autHeaders = await request.headers.get("Authorization")

        if (!autHeaders || !autHeaders.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Вы не авторизованы" },
                { status: 400 }
            )
        }

        const token = autHeaders.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string
        }

        console.log(decoded.id)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return NextResponse.json(
                { message: "Пользователь не найден" },
                { status: 404 }
            )
        }

        const uploadThumbnail = await uploadMedia(courseThumbnail)
        if (!uploadThumbnail) {
            return NextResponse.json(
                { message: "Загрузка миниатюры не удалась" },
                { status: 500 }
            )
        }

        const savedCourse = await new Course({
            courseTitle,
            subtitle,
            description,
            category,
            coursePrice,
            courseLanguage,
            courseThumbnail,
            studentLearning,
            isPublished: true,
            creator: user,
        }).save()

        //console.log(savedCourse)

        return NextResponse.json(
            { message: "Курс успешно создан", course: savedCourse },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Что-то пошло не так", err: error },
            { status: 500 }
        )
    }
}
