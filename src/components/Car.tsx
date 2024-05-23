import React from 'react';
import { Space, Button } from "antd";
import CustomButton from "./CustomButton";
import { IconContext } from "react-icons";
import { GiRaceCar } from "react-icons/gi";
import { CarTypes } from "../types/types";
import { useCarContext } from "../store/CarContext";
import anime from "animejs";

interface CarProps extends CarTypes {
  onDelete: () => void;
  onUpdate: () => void;
}

const Car: React.FC<CarProps> = ({ name, color, id, onDelete, onUpdate }) => {
  const { switchCarStatus, switchDriveMode } = useCarContext();
  let animation = anime({});

  const onStartCar = async (carId: number, carStatus: string) => {
    try {
      const updatedCarData = await switchCarStatus({
        id: carId,
        status: carStatus,
      });
      const { velocity, distance } = updatedCarData;

      const car = document.querySelector(`.car-icon-${carId}`) as HTMLElement;
      const startingPosition = car.getBoundingClientRect().left || 0;
      const containerWidth =
        document.querySelector(".car__component")?.getBoundingClientRect()
          .right || 0;
      const availableSpace = containerWidth - startingPosition;
      const animationDuration = distance / velocity;

      const carWidth = car.clientWidth || 0;
      const maxDistance = availableSpace - carWidth;
      animation = anime({
        targets: car,
        translateX: [0, maxDistance],
        direction: "normal",
        duration: animationDuration,
        easing: "linear",
        autoplay: false,
        complete: () => {
          anime.set(car, { translateX: maxDistance });
        },
      });

      animation.play();

      const isEngineBroken = await switchDriveMode({
        id: carId,
        status: "drive",
      });

      if (isEngineBroken) {
        animation.pause();
      }
    } catch (error) {
      console.error("Error starting car:", error);
    }
  };

  const onStopCar = async (carId: number, carStatus: string) => {
    try {
      await switchCarStatus({ id: carId, status: carStatus });
      animation.restart();
      animation.pause();
    } catch (error) {
      console.error("Error stopping car:", error);
    }
  };

  return (
    <div className='car__component'>
      <Space>
        <Space direction='vertical'>
          <CustomButton color='#3BAEFE' text='SELECT' onUpdate={onUpdate} />
          <CustomButton color='#E22732' text='REMOVE' onDelete={onDelete} />
        </Space>

        <Space direction='vertical'>
          <Button color='#F7F420' onClick={() => onStartCar(id, "started")}>
            A
          </Button>
          <Button color='#42d392' onClick={() => onStopCar(id, "started")}>
            B
          </Button>
        </Space>
        <IconContext.Provider value={{ color: color, size: "6em" }}>
          <div className={`car-icon-${id}`}>
            <GiRaceCar />
          </div>
        </IconContext.Provider>
        <span className='car__name' style={{ color: "#929F99" }}>
          {name}
        </span>
      </Space>
      <hr />
    </div>
  );
};

export default Car;
