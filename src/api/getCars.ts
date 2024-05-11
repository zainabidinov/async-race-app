import BASE_URL from "./baseURL";
import { CarTypes } from "../types/types"

export const getCars = async (): Promise<CarTypes[]> => {
    try {
      const response = await fetch(`${BASE_URL}/garage`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const cars = await response.json();
      return cars as CarTypes[];
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  };