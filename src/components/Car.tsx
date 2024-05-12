import { Space } from "antd";
import CustomButton from "./CustomButton";
import { IconContext } from "react-icons";
import { GiRaceCar } from "react-icons/gi";
import { CarTypes } from "../types/types";

interface CarProps extends CarTypes {
  onDelete: () => void;
  onUpdate: () => void;
}

const Car: React.FC<CarProps> = ({ name, color, id, onDelete, onUpdate }) => {
  return (
    <div className='car__component'>
      <Space>
        <Space direction='vertical'>
          <CustomButton color='#3BAEFE' text='SELECT' onUpdate={onUpdate}/>
          <CustomButton color='#E22732' text='REMOVE' onDelete={onDelete}/>
        </Space>

        <Space direction='vertical'>
          <CustomButton color='#F7F420' text='A' />
          <CustomButton color='#42d392' text='B' />
        </Space>
        <IconContext.Provider
          value={{ color: color, className: "car-icon", size: "6em" }}
        >
          <GiRaceCar />
        </IconContext.Provider>
        <span className='car__name' style={{color: "#929F99"}}>{name}</span>
      </Space>
      <hr />
    </div>
  );
};

export default Car;
