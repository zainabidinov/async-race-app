import { Space, Button } from "antd";
import CustomButton from "./CustomButton";
import { IconContext } from "react-icons";
import { GiRaceCar } from "react-icons/gi";
import { CarTypes } from "../types/types";
import { useState } from "react";
import { useCarContext } from "../store/CarContext";

interface CarProps extends CarTypes {
  onDelete: () => void;
  onUpdate: () => void;
  onStart: () => void;
  onStop: () => void;
  carPosition: number;
  // onSwitchCarStatus: (
  //   carId: number,
  //   status: string,
  //   carRef: HTMLDivElement | null
  // ) => Promise<void>;
}

const Car: React.FC<CarProps> = ({
  name,
  color,
  id,
  onDelete,
  onUpdate,
  onStart,
  onStop,
  carPosition,
  // onSwitchCarStatus,
}) => {
  const [carStatus, setCarStatus] = useState<string>("stopped");

  const handleStartClick = () => {
    setCarStatus("started");
    onStart();
  };

  const handleStopClick = () => {
    setCarStatus("stopped");
    onStop();
  };

  return (
    <div className='car__component'>
      <Space>
        <Space direction='vertical'>
          <CustomButton color='#3BAEFE' text='SELECT' onUpdate={onUpdate} />
          <CustomButton color='#E22732' text='REMOVE' onDelete={onDelete} />
        </Space>

        <Space direction='vertical'>
          <Button
            color='#F7F420'
            onClick={handleStartClick}
            disabled={carStatus === "started"}
          >
            A
          </Button>
          <Button
            color='#42d392'
            onClick={handleStopClick}
            disabled={carStatus === "stopped"}
          >
            B
          </Button>
        </Space>
        <IconContext.Provider value={{ color: color, size: "6em" }}>
          <div
            className={`car-icon-${id}`}
            style={{ transform: `translateX(${carPosition}px)` }}
          >
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
