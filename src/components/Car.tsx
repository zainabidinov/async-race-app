import { Space, Button } from "antd";
import CustomButton from "./CustomButton";
import { IconContext } from "react-icons";
import { GiRaceCar } from "react-icons/gi";
import { CarTypes } from "../types/types";
import { useRef } from "react";
import { useCarContext } from "../store/CarContext";

interface CarProps extends CarTypes {
  onDelete: () => void;
  onUpdate: () => void;
  onStart: (
    carId: number,
    carStatus: string,
    carRef: HTMLDivElement | null,
    carWrapperRef: HTMLDivElement | null
  ) => void;
  onStop: (
    carId: number,
    carStatus: string,
    carRef: HTMLDivElement | null,
    carWrapperRef: HTMLDivElement | null
  ) => void;
}

const Car: React.FC<CarProps> = ({
  name,
  color,
  id,
  onDelete,
  onUpdate,
  onStart,
  onStop,
}) => {
  const { switchCarStatus } = useCarContext();
  const carRef = useRef<HTMLDivElement | null>(null);
  const carWrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className='car__component' ref={carWrapperRef}>
      <Space>
        <Space direction='vertical'>
          <CustomButton color='#3BAEFE' text='SELECT' onUpdate={onUpdate} />
          <CustomButton color='#E22732' text='REMOVE' onDelete={onDelete} />
        </Space>

        <Space direction='vertical'>
          <Button
            color='#F7F420'
            onClick={() =>
              onStart(id, "started", carRef.current, carWrapperRef.current)
            }
          >
            A
          </Button>
          <Button
            color='#42d392'
            onClick={() =>
              onStop(id, "started", carRef.current, carWrapperRef.current)
            }
          >
            B
          </Button>
        </Space>
        <IconContext.Provider value={{ color: color, size: "6em" }}>
          <div ref={carRef} className={`car-icon-${id}`}>
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
