import { useEffect, useState, useMemo } from "react";
import React from "react";
import "../styles/styles.css";
import {
  ConfigProviderProps,
  Flex,
  Button,
  Space,
  Input,
  ColorPicker,
  Form,
  Pagination,
} from "antd";
import CustomButton from "../components/CustomButton";
import Car from "../components/Car";
import type { ColorPickerProps, GetProp } from "antd";
import { useNavigate } from "react-router-dom";
import { useCarContext } from "../store/CarContext";
import anime from "animejs";
import { genRandomColor, genRandomCar } from "../utils/genRandomCars";
import { CarTypes } from "../types/types";

type Color = GetProp<ColorPickerProps, "value">;
type Format = GetProp<ColorPickerProps, "format">;
type SizeType = ConfigProviderProps["componentSize"];

const Garage: React.FC = () => {
  const {
    cars,
    setCars,
    getCars,
    createCar,
    deleteCar,
    updateCar,
    switchCarStatus,
    switchDriveMode,
  } = useCarContext();

  const [size, setSize] = useState<SizeType>("large");
  const [color, setColor] = useState<Color>("#42d392");
  const [formatHex, setFormatHex] = useState<Format | undefined>("hex");
  const [carId, setCarId] = useState<number>(0);
  const [carName, setCarName] = useState<string>("");
  const navigate = useNavigate();
  let animation = anime({});

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageElements, setCurrentPageElements] = useState<CarTypes[]>(
    []
  );
  const [totalElementsCount, setTotalElementsCount] = useState(0);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const newOffset = (pageNumber - 1) * 7;
    const currentPageCars = cars.slice(newOffset, newOffset + 7);
    setCurrentPageElements(currentPageCars);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await getCars();
        setCars(fetchedCars);
        setTotalElementsCount(fetchedCars.length);
        const currentPageCars = fetchedCars.slice(0, 7);
        setCurrentPageElements(currentPageCars);
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
      setTotalElementsCount(cars.length);
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const hexString = useMemo<string>(
    () => (typeof color === "string" ? color : color?.toHexString()),
    [color]
  );

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
        setCurrentPageElements(cars);
        setTotalElementsCount(cars.length);
      } catch (error) {
        console.error("Error updating car:", error);
      }
    }
  };

  const onDeleteCar = async (carId: number) => {
    try {
      await deleteCar(carId);
      setCars(cars.filter((car) => car.id !== carId));
      setTotalElementsCount(cars.length);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const onStartCar = async (
    carId: number,
    carStatus: string,
    carRef: HTMLDivElement | null,
    carWrapperRef: HTMLDivElement | null
  ) => {
    try {
      const updatedCarData = await switchCarStatus({
        id: carId,
        status: carStatus,
      });
      const { velocity, distance } = updatedCarData;

      const startingPosition = carRef?.getBoundingClientRect().left || 0;
      const containerWidth = carWrapperRef?.getBoundingClientRect().right || 0;
      const availableSpace = containerWidth - startingPosition;
      const animationDuration = distance / velocity;
      console.log(animationDuration);

      const carIconWidth = carRef?.clientWidth || 0;
      const maxDistance = availableSpace - carIconWidth;
      animation = anime({
        targets: carRef,
        translateX: [0, maxDistance],
        direction: "normal",
        duration: animationDuration,
        easing: "linear",
        autoplay: false,
        complete: () => {
          anime.set(carRef, { translateX: maxDistance });
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

  const onStopCar = async (
    carId: number,
    carStatus: string,
    carRef: HTMLDivElement | null,
    carWrapperRef: HTMLDivElement | null
  ) => {
    try {
      await switchCarStatus({ id: carId, status: carStatus });
      animation.restart();
      animation.pause();
    } catch (error) {
      console.error("Error stopping car:", error);
    }
  };

  const generateCars = async () => {
    try {
      const generatedCars = await Promise.all(
        Array.from({ length: 100 }, async () => {
          const randomModel = genRandomCar();
          const newCar = await createCar({
            name: randomModel,
            color: genRandomColor(),
          });
          return newCar;
        })
      );
      setCars([...cars, ...generatedCars]);
    } catch (error) {
      console.error("Error generating cars:", error);
    }
  };

  return (
    <div className='garage'>
      <div className='garage__header'>
        <Flex gap='middle'>
          <Button
            type='primary'
            size={size}
            onClick={() => navigate("/garage")}
          >
            GARAGE
          </Button>
          <Button
            type='primary'
            size={size}
            onClick={() => navigate("/winners")}
          >
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
              onGenerateCars={generateCars}
            />
          </Space>
        </div>
        <div className='garage__body'>
          <hr />
          {currentPageElements.map((car) => (
            <Car
              key={car.id}
              {...car}
              onDelete={() => onDeleteCar(car.id)}
              onUpdate={() => setCarId(car.id)}
              onStart={onStartCar}
              onStop={onStopCar}
            />
          ))}
          <Pagination
            current={currentPage}
            pageSize={7}
            total={totalElementsCount}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} cars`
            }
            onChange={handlePageClick}
            showSizeChanger={false}
            simple
          />
        </div>
      </div>
    </div>
  );
};

export default Garage;
