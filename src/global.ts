export const BASE_URL = "http://localhost:3001/api";

export const AUTH_TOKEN = 'auth-token';
export const TYPE = 'type';

export const getTodaysDate = (dateString?: string) => {
    if (!dateString) {
        return new Date().toISOString().substring(0, 10)
    }
}
