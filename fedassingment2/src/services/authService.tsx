import type{ LoginRequst } from "../types/Auth";

const API_URL = "http://localhost:8080/api";

export async function login(data: LoginRequst) {
    const respons = await fetch(`${API_URL}/Account/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if(!respons.ok){
        const body = await respons.text();
        console.error("Login fejl:", respons.status, body);
        throw new Error("Login failed");
    }

    const token = await respons.text();

    localStorage.setItem("token", token);

    return token;
}