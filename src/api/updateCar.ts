import BASE_URL from "./baseURL";
import { CarTypes } from "../types/types";

export const updateCar = async (carData: { name: string; color: string; id: number }): Promise<CarTypes> => {
    try {
        const { id, ...restData } = carData;
        const response = await fetch(`${BASE_URL}/garage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restData),
        });

        const updatedCar = await response.json();
        return updatedCar as CarTypes;
    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
};
