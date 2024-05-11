import { useEffect, useState, useMemo } from "react";
import "../styles/styles.css";
import {
  ConfigProviderProps,
  Flex,
  Button,
  Space,
  Input,
  ColorPicker,
  Form,
} from "antd";
import CustomButton from "../components/CustomButton";
import Car from "../components/Car";
import { CarTypes } from "../types/types";
import { getCars } from "../api/getCars";
import { createCar } from "../api/createCar";
import type { ColorPickerProps, GetProp } from "antd";

type Color = GetProp<ColorPickerProps, "value">;
type Format = GetProp<ColorPickerProps, "format">;
type SizeType = ConfigProviderProps["componentSize"];

const Garage: React.FC = () => {
  const [size, setSize] = useState<SizeType>("large");
  const [cars, setCars] = useState<CarTypes[]>([]);
  const [color, setColor] = useState<Color>("#42d392");
  const [formatHex, setFormatHex] = useState<Format | undefined>("hex");

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

  const onCreateCar = async (values: { name: string; color: string }) => {
    try {
      const newCar = await createCar({...values, color: hexString});
      setCars([...cars, newCar]);
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const hexString = useMemo<string>(
    () => (typeof color === "string" ? color : color?.toHexString()),
    [color]
  );

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

          {/* <Space>
            <Input placeholder='TYPE CAR BRAND' variant='filled' />
            <ColorPicker defaultValue='#388C5C' />
            <CustomButton color='#6921C2' text='CREATE' btnType='primary' />
          </Space> */}

          <Space>
            <Form onFinish={onCreateCar} layout='inline'>
              <Form.Item name='name'>
                <Input placeholder='TYPE CAR BRAND' variant='filled' />
              </Form.Item>
              <Form.Item name='color'>
                <ColorPicker
                  defaultValue="#1390F0"
                  format={formatHex}
                  value={color}
                  onChange={setColor}
                  onFormatChange={setFormatHex}
                />
              </Form.Item>
              <Space>
                <CustomButton
                  color='#6921C2'
                  text='CREATE'
                  btnType='primary'
                  btnSubmitType='submit'
                />
              </Space>
            </Form>
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
          {cars.map((car) => (
            <Car key={car.id} {...car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Garage;
