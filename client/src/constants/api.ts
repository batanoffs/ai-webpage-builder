// TODO fix env for client

export const baseURL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:3000/api/';

export const API = {
    chat: baseURL + 'completions',
};
