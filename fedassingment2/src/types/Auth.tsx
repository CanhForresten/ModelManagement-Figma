export type LoginRequst = {
    email: string;
    password: string;
}

export type LoginRespons = {
    jwt: string;
}

export type User = {
    role: "manager" | "model";
    name?: string;
    modelId?: number;
}