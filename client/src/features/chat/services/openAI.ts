import axios from 'axios';

import { API } from '../constants/api';

const getSteamData = async (message: string) => {
    try {
        return await axios.post(API.chat, { message });
    } catch (error) {
        console.error('Error in getSteamData:', error);
    }
};

export const aiService = {
    getSteamData,
};
