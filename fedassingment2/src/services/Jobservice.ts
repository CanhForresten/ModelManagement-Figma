import { apiFetch } from "./apiClient";

const API_URL = "http://localhost:8080/api";

export function getMyJobs() {
    return apiFetch(`${API_URL}/Jobs`);
}


