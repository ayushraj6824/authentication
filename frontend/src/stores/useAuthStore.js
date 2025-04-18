import { create } from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';
import { toast } from "sonner"



export const useAuthStore = create((set, get)=>({
    loginLoading: false,
    signupLoading: false,
    checkAuthLoading: false,
    getAllUsersLoading: false,
    allUsers: [],
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

    getAllUsers: async () => {
        set({ getAllUsersLoading: true });
        try {
            const response = await axiosInstance.get('/auth/users');
            const users = response.data.users;
            set({ allUsers: users });
            return users;
        } catch (error) {
            console.error("Get all users error:", error);
            set({ allUsers: [] });
            return false;
        } finally {
            set({ getAllUsersLoading: false });
        }
    },

    getUser: async(id) => {
        set({ getUserLoading: true });
        try {
            const response = await axiosInstance.get(`/auth/users/${id}`);
            const user = response.data.user;
            return user;
        } catch (error) {
            console.error("Get user error:", error);
            return false;
        } finally {
            set({ getUserLoading: false });
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

    logout : async () => {
        set({ logoutLoading: true });
        try {
            await axiosInstance.post('/auth/logout');
            set({ user: null });
            toast.success("Logout successful");
            return true;
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response.data.message);
            return false;
        } finally {
            set({ logoutLoading: false });
        }
    }
}))
