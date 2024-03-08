import { baseUrl, tokenKey } from "../constants"

const authToken = window.localStorage.getItem(tokenKey)

export const authService = {

    isAuthenticated: authToken !== null,
    token : authToken,

    login: async (email, password) => {
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(baseUrl + "/login", options);

        if (response.ok) {
            const { token } = await response.json();
            window.localStorage.setItem(tokenKey, token);
            authService.isAuthenticated = true
        } else {
            const body = await response.json();
            const error =
                body.errors instanceof Array ? body.errors.join(", ") : body.errors;
            return Promise.reject(new Error(error));
        }
    },

    signUp: async (email, password) => {
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(baseUrl + "/signup", options);

        if (response.ok) {
            const { token } = await response.json();
            window.localStorage.setItem(tokenKey, token);
            authService.isAuthenticated = true
            return;
        } else {
            const body = await response.json();
            const error =
                body.errors instanceof Array ? body.errors.join(", ") : body.errors;
            return Promise.reject(new Error(error));
        }
    },

    logOut: () => {
        window.localStorage.removeItem(tokenKey);
        authService.isAuthenticated = false
        authService.token = null       
    }

}