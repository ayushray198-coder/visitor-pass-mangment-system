import axiosInstance from "../api/axios";

export const signupUser = async(userData) => {
    const response = await axiosInstance.post(
        "/auth/signup",
        userData
    )

    return response.data
}

export const logginUser = async (userData) => {
    const response = await axiosInstance.post(
        "/auth/login",
        userData
    )

    return response.data
}