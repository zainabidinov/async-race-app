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
import { deleteCar } from "../api/deleteCar";
import { updateCar } from "../api/updateCar";

type Color = GetProp<ColorPickerProps, "value">;
type Format = GetProp<ColorPickerProps, "format">;
type SizeType = ConfigProviderProps["componentSize"];

const Garage: React.FC = () => {
  const [size, setSize] = useState<SizeType>("large");
  const [cars, setCars] = useState<CarTypes[]>([]);
  const [color, setColor] = useState<Color>("#42d392");
  const [formatHex, setFormatHex] = useState<Format | undefined>("hex");
  const [carId, setCarId] = useState<number>(0);
  const [carName, setCarName] = useState<string>("");

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
    if (!carName) {
      alert("Please enter a car name!");
      return;
    }
    try {
      const newCar = await createCar({ ...values, color: hexString });
      setCars([...cars, newCar]);
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const hexString = useMemo<string>(
    () => (typeof color === "string" ? color : color?.toHexString()),
    [color]
  );

  const onDeleteCar = async (carId: number) => {
    try {
      await deleteCar(carId);
      setCars(cars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const onUpdateCar = async (values: {
    name: string;
    color: string;
    id: number;
  }) => {
    if (carId === 0) {
      alert("Please select a car to update!");
      return;
    } else if (!carName) {
      alert("Please enter a car name!");
      return;
    } else {
      try {
        const updatedCar = await updateCar({
          ...values,
          color: hexString,
          id: carId,
        });
        setCarId(0);
        setCars(cars.map((car) => (car.id === carId ? updatedCar : car)));
      } catch (error) {
        console.error("Error updating car:", error);
      }
    }
  };

  console.log(carName);

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
            <Form onFinish={onCreateCar} layout='inline'>
              <Form.Item name='name'>
                <Input
                  placeholder='TYPE CAR BRAND'
                  variant='filled'
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                />
              </Form.Item>
              <Form.Item name='color'>
                <ColorPicker
                  defaultValue={color}
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
            <Form onFinish={onUpdateCar} layout='inline'>
              <Form.Item name='name'>
                <Input
                  placeholder='TYPE CAR BRAND'
                  variant='filled'
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                />
              </Form.Item>
              <Form.Item name='color'>
                <ColorPicker
                  defaultValue={color}
                  format={formatHex}
                  value={color}
                  onChange={setColor}
                  onFormatChange={setFormatHex}
                />
              </Form.Item>
              <Space>
                <CustomButton
                  color='#6921C2'
                  text='UPDATE'
                  btnType='primary'
                  btnSubmitType='submit'
                />
              </Space>
            </Form>
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
            <Car
              key={car.id}
              {...car}
              onDelete={() => onDeleteCar(car.id)}
              onUpdate={() => setCarId(car.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Garage;
