import BASE_URL from "./baseURL";
import { WinnerData } from "../types/types";

export const updateWinner = async (winnerData: WinnerData): Promise<WinnerData> => {
    const { id, wins, time } = winnerData;
    try {
        const response = await fetch(`${BASE_URL}/winners/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wins: wins,
                time: time,
            })
        })
        return response.json();
    } catch (error) {
        console.error(error);
        throw error
    }
}