// TODO fix env for client

export const baseURL = process.env.serverURL || 'http://localhost:3000/api/';

export const API = {
    chat: baseURL + 'completions',
};
