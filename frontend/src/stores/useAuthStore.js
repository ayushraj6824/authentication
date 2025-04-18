import { create } from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';
import { toast } from "sonner"



export const useAuthStore = create((set, get)=>({
    loginLoading: false,
    signupLoading: false,
    checkAuthLoading: false,
    user: null,

    checkAuth: async () => {
        set({ checkAuthLoading: true });
        try {
            const response = await axiosInstance.get('/auth/check-auth');
            const user = response.data.user;
            if(user) set({ user });
            return true;
        } catch (error) {
            set({user: null});
            console.error("Check auth error:", error);
            return false;
        } finally {
            set({ checkAuthLoading: false });
        }
    },
    login: async (data) => {
        console.log(data)
        set({ loginLoading: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            const user = response.data.user;
            if(user) set({ user });
            toast.success("Login successful");
            return true;

        } catch (error) {
            set({user: null});
            console.error("Login error:", error);
            toast.success(error.response.data.message);
            return false;
        } finally {
            set({ loginLoading: false });
        }
    },

    signup: async (data) => {
        set({ signupLoading: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            const user = response.data.user;
            if(user) set({ user });
            toast.success("Signup successful");
            return true;
        } catch (error) {
            set({user: null});
            toast.error(error.response.data.message);
            console.error("signup error:", error);
            console.log(error.response.data.message);
            return false;
        } finally {
            set({ signupLoading: false });
        }
    },
}))
