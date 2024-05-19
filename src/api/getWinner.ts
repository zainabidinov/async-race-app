import BASE_URL from "./baseURL";
import { WinnerData } from "../types/types";

export const getWinner = async (carId: number): Promise<WinnerData> => {
    try {
        const respone = await fetch(`${BASE_URL}/winners/${carId}`, {
            method: "GET"
        })
        const data = await respone.json();
        return data as WinnerData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}