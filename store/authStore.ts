import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface UserType {
    id?: string | null
    name: string | null
    email: string | null
}

interface AuthStoreType {
    user: UserType | null
    token: string | null
    setUser: (user: UserType | null) => void
    setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthStoreType>()(
    persist(
        (set) => ({
            user: {
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
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
