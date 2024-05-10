import { Space } from "antd";
import CustomButton from "./CustomButton";
import { IconContext } from "react-icons";
import { GiRaceCar } from "react-icons/gi";

const Car: React.FC = () => {
  return (
    <div className='car__component'>
      <Space>
        <Space direction='vertical'>
          <CustomButton color='#3BAEFE' text='SELECT' />
          <CustomButton color='#6921C2' text='REMOVE' />
        </Space>

        <Space direction='vertical'>
          <CustomButton color='#D9D02F' text='A' />
          <CustomButton color='#42d392' text='B' />
        </Space>
        <IconContext.Provider
          value={{ color: "#42d392", className: "car-icon", size: "6em" }}
        >
          <GiRaceCar />
        </IconContext.Provider>
      </Space>
      <hr />
    </div>
  );
};

export default Car;
