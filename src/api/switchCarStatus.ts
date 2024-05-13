import BASE_URL from "./baseURL";
import { CarTypes } from "../types/types";

export const switchCarStatus = async (carData: { id: number, status: string }): Promise<CarTypes> => {
    try {
        const { id, status } = carData;
        const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, status })
        })

        const updatedCarData = await response.json();
        const updatedCar: CarTypes = { ...updatedCarData, id };
        return updatedCar;
    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
}
