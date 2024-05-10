import { useState } from "react";
import "../styles/styles.css";
import {
  ConfigProviderProps,
  Flex,
  Button,
  Space,
  Input,
  ColorPicker,
} from "antd";
import CustomButton from "../components/CustomButton";
import Car from "../components/Car";

type SizeType = ConfigProviderProps["componentSize"];

const Garage: React.FC = () => {
  const [size, setSize] = useState<SizeType>("large");
  return (
    <div className='garage'>
      <div className='garage__header'>
        <Flex gap='middle'>
          <Button type='primary' size={size}>
            GARAGE
          </Button>
          <Button type='primary' size={size}>
            WINNERS
          </Button>
        </Flex>
        <h2>ASYNC RACE</h2>
      </div>
      <div className='container'>
        <div className='garage__body-header'>
          <Space>
            <CustomButton
              color='#42d392'
              text='RACE'
              icon='play'
              btnType='primary'
            />
            <CustomButton
              color='#6921C2'
              text='RESET'
              icon='reset'
              btnType='primary'
            />
          </Space>

          <Space>
            <Input placeholder='TYPE CAR BRAND' variant='filled' />
            <ColorPicker defaultValue='#388C5C' />
            <CustomButton color='#6921C2' text='CREATE' btnType='primary' />
          </Space>

          <Space>
            <Input placeholder='TYPE CAR BRAND' variant='filled' />
            <ColorPicker defaultValue='#1390F0' />
            <CustomButton color='#6921C2' text='UPDATE' btnType='primary' />
          </Space>

          <Space>
            <CustomButton
              color='#42d392'
              text='GENERATE CARS'
              btnType='primary'
            />
          </Space>
        </div>
        <div className='garage__body'>
          <hr />
          <Car />
          <Car />
        </div>
      </div>
    </div>
  );
};

export default Garage;
