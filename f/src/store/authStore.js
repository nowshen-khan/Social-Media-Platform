import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
	persist(
		(set) => ({
			isLoggedIn: false,
			user: null,
			login: (user) => set({ isLoggedIn: true, user }),
			logout: () => set({ isLoggedIn: false, user: null }),
		}),
		{
			name: "auth-storage", // localStorage key
			getStorage: () => localStorage, // default is `localStorage`
		}
	)
);

export default useAuthStore;
