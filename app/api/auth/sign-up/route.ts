import { connectDB } from "@/config/db"
import { userModel } from "@/models/user"
import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
    await connectDB()
    try {
        const body = await request.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Пожалуйста, заполните все поля" },
                { status: 409 }
            )
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return NextResponse.json(
                { message: "Такой пользователь уже есть" },
                { status: 409 }
            )
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            name,
            email,
            password: hashpassword,
        }).save()

        return NextResponse.json(
            {
                message: "Пользователь успешно зарегистрирован",
                newUser: {
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password,
                    role: newUser.role,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Возникла какая-то ошибка!" },
            { status: 500 }
        )
    }
}
