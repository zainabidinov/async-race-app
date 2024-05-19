import BASE_URL from "./baseURL";
import { WinnerData } from "../types/types";

export const getWinners = async (): Promise<WinnerData[]> => {
    try {
        const response = await fetch(`${BASE_URL}/winners`, {
            method: 'GET',
        })
        const data = await response.json();
        return data as WinnerData[];
    } catch (error) {
        console.error(error);
        throw error;
    }
}