"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAuthStore, UserType } from "@/store/authStore"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import axios from "axios"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

const StudentProfilePage = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userDetails, setUerDetails] = useState<UserType | null>(null)
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState<File | null>(null)
    const { token } = useAuthStore()

    const fetchUserDetails = async () => {
        try {
            console.log("wwwwww", token)

            if (!token) return

            const response = await axios.get("/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = response.data.user
            setUerDetails(data)
        } catch (error) {
            console.log(error)
            toast.error("Ошибка получения данных")
        }
    }

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", name)
            if (photo) {
                formData.append("photo", photo)
            }
            const response = await axios.post(
                "/api/auth/update-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            toast.success("Профиль обнавлен")
            setOpenDialog(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
            toast.error("Ошибка редактирования профиля")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchUserDetails()
        }
    }, [token])

    console.log({ ...userDetails })
    console.log("wwwwww", token)

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-blue-700 to-purple-600 pt-36">
            <div className="max-w-md mx-auto p-4 space-y-4 rounded-sm shadow-lg bg-white/5">
                <div className="flex items-center gap-4">
                    {userDetails?.photo ? (
                        <Image
                            src={userDetails.photo}
                            alt="profile photo"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-black">
                            {userDetails?.name?.charAt(0)}
                        </div>
                    )}
                    <div>
                        <p className="text-lg text-white font-semibold">
                            {userDetails?.name}
                        </p>
                        <p className="text-sm text-blue-100">
                            {userDetails?.email}
                        </p>
                    </div>
                </div>
                <Dialog
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                >
                    <DialogTrigger asChild>
                        <Button>Радактировать профиль</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Редактирование профиля</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Введите новое имя пользователя"
                            />
                            <Input
                                onChange={(e) =>
                                    setPhoto(e.target.files?.[0] || null)
                                }
                                type="file"
                                accept="image/*"
                            />
                        </div>
                        <DialogFooter className="mt-4">
                            <Button
                                onClick={handleUpdate}
                                disabled={loading}
                            >
                                {loading ? "Сохранение..." : "Сохранить"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="max-w-7xl mx-auto p-4 text-center">
                <h2 className="text-3xl md:text-5xl text-white font-extrabold">
                    У вас пока нет выбранных курсов
                </h2>
            </div>
        </div>
    )
}
export default StudentProfilePage
