import { Space } from "antd";
import CustomButton from "./CustomButton";
import { IconContext } from "react-icons";
import { GiRaceCar } from "react-icons/gi";
import { CarTypes } from "../types/types";

const Car: React.FC<CarTypes> = ({name, color, id}) => {
  return (
    <div className='car__component'>
      <Space>
        <Space direction='vertical'>
          <CustomButton color='#3BAEFE' text='SELECT' />
          <CustomButton color='#E22732' text='REMOVE' />
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
      </Space>
      <hr />
    </div>
  );
};

export default Car;
