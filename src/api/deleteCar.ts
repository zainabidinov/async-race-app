import BASE_URL from "./baseURL";

export const deleteCar = async (carId: number): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/garage/${carId}`, {
        method: 'DELETE',
      });

    } catch (error) {
      console.error('Error deleting car:', error);
      throw error;
    }
};
