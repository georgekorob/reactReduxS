import axios from "axios";

const axios_instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { "API-KEY": "61f03c2c-f3ab-4d90-b993-e347aacc8c6d" }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axios_instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    followUser(id = 1, isFollowed = false) {
        if (isFollowed) {
            return axios_instance
                .delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
                .then(response => response.data);
        } else {
            return axios_instance
                .post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
                .then(response => response.data);
        }
    },
    getProfile(userId) {
        console.warn('Absolete methode. Please use profileAPI object.')
        return axios_instance
            .get(`profile/${userId}`)
            .then(response => response.data);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return axios_instance
            .get(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId) {
        return axios_instance
            .get(`profile/status/${userId}`)
            .then(response => response.data);
    },
    updateStatus(status) {
        return axios_instance
            .put(`profile/status`, { status })
            .then(response => response.data);
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append('image', file);
        return axios_instance
            .put(`profile/photo`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => response.data);
    },
    saveProfile(profile) {
        return axios_instance
            .put(`profile`, profile)
            .then(response => response.data);
    },
}

export const authAPI = {
    isAuth() {
        return axios_instance
            .get('auth/me')
            .then(response => response.data);
    },
    login(email, password, rememberMe = false, captcha = null) {
        return axios_instance
            .post('auth/login', { email, password, rememberMe, captcha })
            .then(response => response.data);
    },
    logout() {
        return axios_instance
            .delete('auth/login')
            .then(response => response.data);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return axios_instance
            .get('security/get-captcha-url')
            .then(response => response.data);
    },
    g2etCaptchaUrl() {
        return axios_instance
            .get('security/get-captcha-url')
            .then(response => response.data);
    },
}