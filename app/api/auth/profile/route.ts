import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/config/db"
import jwt from "jsonwebtoken"
import { userModel } from "@/models/user"

export async function GET(request: NextRequest) {
    await connectDB()
    try {
        const authHeaders = request.headers.get("authorization")

        if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Вы не авторизованы" },
                { status: 401 }
            )
        }

        const token = authHeaders.split(" ")[1]

        const decode: any = jwt.verify(token, process.env.JWT_SECRET!)

        const userId = decode.id

        const user = await userModel.findById(userId).select("-password")

        if (!user) {
            return NextResponse.json(
                { message: "Пользователь не найден" },
                { status: 404 }
            )
        }

        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Ошибка при получении данных" },
            { status: 500 }
        )
    }
}
