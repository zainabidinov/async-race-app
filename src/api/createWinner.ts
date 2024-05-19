import BASE_URL from "./baseURL";
import { WinnerData } from "../types/types";

export const createWinner = async (winnerData: WinnerData): Promise<void> => {
    const { id, wins, time } = winnerData;
    try {
        await fetch(`${BASE_URL}/winners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, wins: wins, time: time })
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}