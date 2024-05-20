import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { CarTypes, WinnerData } from "../types/types";
import { getCars } from "../api/getCars";
import { createCar } from "../api/createCar";
import { deleteCar } from "../api/deleteCar";
import { updateCar } from "../api/updateCar";
import { switchCarStatus } from "../api/switchCarStatus";
import { switchDriveMode } from "../api/switchDriveMode";
import { createWinner } from "../api/createWinner";
import anime from "animejs";
import { getWinner } from "../api/getWinner";
import { updateWinner } from "../api/updateWinner";

type CarContextType = {
  cars: CarTypes[];
  winners: WinnerData[];
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
  }) => Promise<boolean>;
  setCars: React.Dispatch<React.SetStateAction<CarTypes[]>>;
  setWinners: React.Dispatch<React.SetStateAction<WinnerData[]>>;
  setCarVelocity: React.Dispatch<React.SetStateAction<number>>;
  setCarDistance: React.Dispatch<React.SetStateAction<number>>;
  getCars: () => Promise<CarTypes[]>;
  carPosition: number;
  setCarPosition: React.Dispatch<React.SetStateAction<number>>;
  startCar: (carId: number, carStatus: string) => Promise<void>;
  stopCar: (carId: number, carStatus: string) => Promise<void>;
};

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cars, setCars] = useState<CarTypes[]>([]);
  const [winners, setWinners] = useState<WinnerData[]>([]);
  const [carVelocity, setCarVelocity] = useState<number>(0);
  const [carDistance, setCarDistance] = useState<number>(0);
  const [carPosition, setCarPosition] = useState<number>(0);
  const [carAnimations, setCarAnimations] = useState<{
    [key: number]: anime.AnimeInstance | null;
  }>({});
  const [winner, setWinner] = useState<CarTypes | null>(null);
  const winnerDeclared = useRef<boolean>(false);

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

  const switchCarEngineStatus = async (carData: {
    id: number;
    status: string;
  }): Promise<boolean> => {
    try {
      const updatedCarData = await switchDriveMode({
        id: carData.id,
        status: carData.status,
      });
      return updatedCarData;
    } catch (error) {
      console.error("Error switching car status:", error);
      throw error;
    }
  };

  const handleWinner = async (car: CarTypes, time: number) => {
    const { id } = car;
    setWinner(car);
    winnerDeclared.current = true;
    alert(`WINNER: ${car.name}! \nTIME: ${time.toFixed(2)} S`);

    try {
      const prevWinner = await getWinner(id);
      if (prevWinner && prevWinner.id === id) {
        await updateWinner({
          id: car.id,
          wins: prevWinner.wins + 1,
          time: Math.min(prevWinner.time, time),
        });
      } else {
        await createWinner({ id: car.id, wins: 1, time: time });
      }
    } catch (error) {
      console.error("Error updating winner:", error);
    }
  };

  const startCar = async (id: number, status: string) => {
    try {
      const updatedCarData = await switchCarStatus({
        id: id,
        status: status,
      });
      const { velocity, distance } = updatedCarData;
      const carElement = document.querySelector(
        `.car-icon-${id}`
      ) as HTMLElement;
      const startingPosition = carElement.getBoundingClientRect().left || 0;
      const containerWidth =
        document.querySelector(".car__component")?.getBoundingClientRect()
          .right || 0;
      const availableSpace = containerWidth - startingPosition;
      const animationDuration = distance / velocity;

      const carWidth = carElement.clientWidth || 0;
      const maxDistance = availableSpace - carWidth;
      const carAnimation = anime({
        targets: carElement,
        translateX: [0, maxDistance],
        direction: "normal",
        duration: animationDuration,
        easing: "linear",
        autoplay: false,
        complete: () => {
          anime.set(carElement, { translateX: maxDistance });
          if (!winnerDeclared.current) {
            const winningCar = cars.find((car) => car.id === id);
            if (winningCar) {
              handleWinner(winningCar, animationDuration / 1000);
            }
          }
        },
      });

      carAnimation.play();
      setCarAnimations((prev) => ({ ...prev, [id]: carAnimation }));

      const isEngineBroken = await switchDriveMode({ id, status: "drive" });

      if (isEngineBroken) {
        carAnimation.pause();
      }
    } catch (error) {
      console.error("Error starting car:", error);
    }
  };

  const stopCar = async (id: number, status: string) => {
    try {
      await switchCarStatus({ id, status });
      const carAnimation = carAnimations[id];
      if (carAnimation) {
        carAnimation.pause();
        carAnimation.restart();
        carAnimation.pause();
      }
      setCarAnimations((prev) => ({ ...prev, [id]: null }));
      setWinner(null);
      winnerDeclared.current = false;
    } catch (error) {
      console.error("Error stopping car:", error);
    }
  };

  const value: CarContextType = {
    cars,
    winners,
    carVelocity,
    carDistance,
    carPosition,
    createCar: createNewCar,
    deleteCar: removeCar,
    updateCar: updateExistingCar,
    switchCarStatus: switchCarDriveStatus,
    switchDriveMode: switchCarEngineStatus,
    setCars: setCars,
    setWinners,
    getCars: getCars,
    setCarDistance,
    setCarVelocity,
    setCarPosition,
    startCar: startCar,
    stopCar: stopCar,
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
