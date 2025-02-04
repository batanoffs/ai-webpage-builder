import axios from 'axios';

import { API } from '../constants/api';

const getSteamData = async (prompt: string) => {
    try {
        const response = await axios.post(
            API.chat,
            { prompt },
            {
                responseType: 'stream',
                headers: {
                    Accept: 'text/event-stream',
                    'Content-Type': 'application/json',
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error in getSteamData:', error);
        throw error;
    }
};

export const aiService = {
    getSteamData,
};
