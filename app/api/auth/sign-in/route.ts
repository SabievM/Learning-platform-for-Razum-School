import { connectDB } from "@/config/db"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { userModel } from "@/models/user"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    await connectDB()
    try {
        const body = await request.json()

        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { message: "Заполните все поля" },
                { status: 401 }
            )
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { message: "Пожалуйста, пройдите регитсрацию" },
                { status: 400 }
            )
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return NextResponse.json({
                message: "Неправильный пароль или email",
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        // await redisConfig.set(user._id.toString(), token, {
        //     EX: 60 * 60,
        // })

        return NextResponse.json({
            message: "Пользователь успешно авторизовался",
            token,
            user: {
                id: user._id,
                email: user.email,
                password: user.password,
                role: user.role,
            },
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Возникла ошибка при авторизации" },
            { status: 500 }
        )
    }
}
