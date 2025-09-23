import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface UserType {
    id: string | null
    name: string | null
    email: string | null
    photo?: string
}

interface AuthStoreType {
    user: UserType | null
    token: string | null
    setUser: (user: UserType | null) => void
    setToken: (token: string | null) => void
    logOut: () => void
}

export const useAuthStore = create<AuthStoreType>()(
    persist(
        (set) => ({
            user: {
                id: null,
                name: null,
                email: null,
            },
            token: "",
            setUser: (user) => {
                set({ user })
            },
            setToken: (token) => {
                set({ token })
            },
            logOut: () => {
                set({
                    user: null,
                    token: null,
                })
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
