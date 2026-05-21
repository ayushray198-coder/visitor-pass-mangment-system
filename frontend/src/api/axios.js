import axios from "axios"


// yha pr hmne backend se frontend ko connect kiya hai yha pr ek issue ho rha tha regarding .env import me jo fir online search kr ke rsolve hui

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export default axiosInstance 