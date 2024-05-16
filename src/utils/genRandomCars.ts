import { carsList } from "../data/carsList";

export const genRandomColor = (): string => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

export const genRandomCar = (): string => {
    const brandIndex = Math.floor(Math.random() * carsList.length);
    const brand = carsList[brandIndex];
    const modelIndex = Math.floor(Math.random() * brand.models.length);
    return `${brand.brand} ${brand.models[modelIndex]}`;
};

