import BASE_URL from "./baseURL";
import { CarTypes } from "../types/types"

export const createCar = async (carData: { name: string; color: string }): Promise<CarTypes> => {
    try {
      const response = await fetch(`${BASE_URL}/garage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      const newCar = await response.json();
      return newCar as CarTypes;
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  };