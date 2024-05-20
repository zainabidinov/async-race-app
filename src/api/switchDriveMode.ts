import BASE_URL from "./baseURL";

export const switchDriveMode = async (carData: { id: number, status: string }): Promise<boolean> => {
    try {
        const { id, status } = carData;
        const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, status })
        })
        if (response.ok) {
            return false;
        } else {
            return true
        }

    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
}