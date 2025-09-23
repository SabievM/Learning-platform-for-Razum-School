import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/config/db"
import jwt from "jsonwebtoken"
import { userModel } from "@/models/user"
import { uploadMedia } from "@/lib/cloudinary"

export async function POST(request: NextRequest) {
    await connectDB()

    const authHeaders = request.headers.get("authorization")
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "Вы не авторизованы" },
            { status: 401 }
        )
    }

    const token = authHeaders.split(" ")[1]

    try {
        const decode: any = jwt.verify(token, process.env.JWT_SECRET!)

        const userId = decode.id

        const formData = await request.formData()
        const name = formData.get("name") as string
        const file = formData.get("photo") as File

        let photoUrl = undefined

        // Upload if photo is present
        if (file && file.size > 0) {
            const buffer = await file.arrayBuffer()
            const base64String = Buffer.from(buffer).toString("base64")
            const mimeType = file.type
            const dataUri = `data:${mimeType};base64,${base64String}`
            const uploadResult = await uploadMedia(dataUri)
            photoUrl = uploadResult?.secure_url
        }

        const updateUser = await userModel
            .findByIdAndUpdate(
                userId,
                {
                    ...(name && { name }),
                    ...(file && { photo: file }),
                },
                { new: true }
            )
            .select("-password")

        return NextResponse.json(
            { message: "Профиль обновлен", user: updateUser },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Ошибка при обновлении данных" },
            { status: 500 }
        )
    }
}
