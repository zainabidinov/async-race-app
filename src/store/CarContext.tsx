import React, { createContext, useContext, useState, useEffect } from "react";
import { CarTypes } from "../types/types";
import { getCars } from "../api/getCars";
import { createCar } from "../api/createCar";
import { deleteCar } from "../api/deleteCar";
import { updateCar } from "../api/updateCar";
import { switchCarStatus } from "../api/switchCarStatus";
import { switchDriveMode } from "../api/switchDriveMode";

type Color = string;
type Format = string | undefined;

type CarContextType = {
  cars: CarTypes[];
  color: Color;
  formatHex: Format;
  carId: number;
  carName: string;
  carVelocity: number;
  carDistance: number;
  createCar: (carData: { name: string; color: string }) => Promise<CarTypes>;
  deleteCar: (carId: number) => Promise<void>;
  updateCar: (carData: {
    name: string;
    color: string;
    id: number;
  }) => Promise<CarTypes>;
  switchCarStatus: (carData: {
    id: number;
    status: string;
  }) => Promise<CarTypes>;
  switchDriveMode: (carData: {
    id: number;
    status: string;
  }) => Promise<CarTypes>;
  setCars: React.Dispatch<React.SetStateAction<CarTypes[]>>;
  setCarVelocity: React.Dispatch<React.SetStateAction<number>>;
  setCarDistance: React.Dispatch<React.SetStateAction<number>>;
  getCars: () => Promise<CarTypes[]>;
  carPosition: number;
  setCarPosition: React.Dispatch<React.SetStateAction<number>>;
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cars, setCars] = useState<CarTypes[]>([]);
  const [color, setColor] = useState<Color>("#42d392");
  const [formatHex, setFormatHex] = useState<Format>("hex");
  const [carId, setCarId] = useState<number>(0);
  const [carName, setCarName] = useState<string>("");
  const [carVelocity, setCarVelocity] = useState<number>(0);
  const [carDistance, setCarDistance] = useState<number>(0);
  const [carPosition, setCarPosition] = useState<number>(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await getCars();
        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const createNewCar = async (carData: {
    name: string;
    color: string;
  }): Promise<CarTypes> => {
    try {
      const newCar = await createCar(carData);
      setCars((prevCars) => [...prevCars, newCar]);
      return newCar;
    } catch (error) {
      console.error("Error creating car:", error);
      throw error;
    }
  };

  const removeCar = async (carId: number) => {
    try {
      await deleteCar(carId);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const updateExistingCar = async (carData: {
    name: string;
    color: string;
    id: number;
  }): Promise<CarTypes> => {
    try {
      const updatedCar = await updateCar({
        ...carData,
        color: carData.color,
        id: carData.id,
      });
      return updatedCar;
    } catch (error) {
      console.error("Error updating car:", error);
      throw error;
    }
  };

  const switchCarDriveStatus = async (carData: {
    id: number;
    status: string;
  }): Promise<CarTypes> => {
    try {
      const updatedCarData = await switchCarStatus({
        id: carData.id,
        status: carData.status,
      });
      return updatedCarData;
    } catch (error) {
      console.error("Error switching car status:", error);
      throw error;
    }
  };

  const value: CarContextType = {
    cars,
    color,
    formatHex,
    carId,
    carName,
    carVelocity,
    carDistance,
    carPosition,
    createCar: createNewCar,
    deleteCar: removeCar,
    updateCar: updateExistingCar,
    switchCarStatus: switchCarDriveStatus,
    switchDriveMode: switchCarDriveStatus,
    setCars: setCars,
    getCars: getCars,
    setCarDistance,
    setCarVelocity,
    setCarPosition,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCarContext must be used within a CarProvider");
  }
  return context;
};
