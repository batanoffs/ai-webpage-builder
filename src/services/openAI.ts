import { requestData } from '../utils/chatRequest';
import { API } from '../constants/api';
import axios from 'axios';

const getCompletions = async (prompt: string) => {
    const response = await axios.post(API, requestData(prompt.toString()), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
    });

    return response;
};

export const aiService = {
    getCompletions,
};
