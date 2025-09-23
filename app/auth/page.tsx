"use client"
import React, { useState } from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

const Authpage = () => {
    const { setUser, setToken } = useAuthStore()
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const router = useRouter()

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (isLogin) {
                const response = await axios.post("/api/auth/sign-in", {
                    email: formData.email,
                    password: formData.password,
                })
                const { user, token } = response.data
                setUser(user)
                setToken(token)
                if (!token) {
                    toast.error("Неправильный логин или пароль!")
                } else {
                    toast.success("Вы успешно авторизовались")
                    router.push("/student/profile")
                }
            } else {
                const response = await axios.post("/api/auth/sign-up", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
                toast.success("Вы успешно зарегитсрировались")
            }
        } catch (error) {
            console.log("Возникла ошибка при авторизации", error)
            toast.error("Возникла ошибка при обработке данных")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 via-indigo-900 to-gray-900 text-white">
            <Card className="w-full max-w-md p-6 bg-blue/30 backdrop-blur-md border border-white/10 shadow-lg text-white">
                <CardHeader className="text-center text-3xl font-bold">
                    <CardTitle>{isLogin ? "Sign Up" : " Login"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {!isLogin && (
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-white/10 border-white/20 text-white placeholder-white/60"
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-white/10 border-white/20 text-white placeholder-white/60"
                                type="email"
                                placeholder="email"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            <Input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-white/10 border-white/20 text-white placeholder-white/60"
                                type="password"
                                placeholder="password"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full mt-2 bg-indigo-700 hover:bg-indigo-600 text-white"
                            disabled={isLoading}
                        >
                            Отправить
                        </Button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        {isLogin
                            ? "Уже есть аккаунт"
                            : "Не зарегистрировались?"}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-400 hover:underline cursor-pointer ml-2"
                        >
                            {isLogin ? "Авторизоваться" : "Зарегистрироваться"}
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Authpage
