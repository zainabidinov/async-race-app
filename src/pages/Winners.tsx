import React from 'react';
import "../styles/styles.css";
import { Flex, Button, ConfigProviderProps } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { getWinners } from "../api/getWinners";
import { useCarContext } from "../store/CarContext";
import { getCars } from "../api/getCars";
import { GiRaceCar } from "react-icons/gi";
import { IconContext } from "react-icons";

type SizeType = ConfigProviderProps["componentSize"];

const Winners = () => {
  const [size, setSize] = useState<SizeType>("large");
  const { winners, setWinners, setCars } = useCarContext();

  useEffect(() => {
    const fetchWinnersAndCars = async () => {
      try {
        const fetchedWinners = await getWinners();
        const fetchedCars = await getCars();

        const enrichedWinners = fetchedWinners.map((winner) => {
          const car = fetchedCars.find((car) => car.id === winner.id);
          return car ? { ...winner, name: car.name, car: car.color } : winner;
        });

        setWinners(enrichedWinners);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWinnersAndCars();
  }, [setWinners]);
  const navigate = useNavigate();

  const winnersColumns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CAR",
      dataIndex: "car",
      key: "car",
      render: (color: string) => (
        <IconContext.Provider value={{ color: color, size: "6em" }}>
          <GiRaceCar />
        </IconContext.Provider>
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "WINS",
      dataIndex: "wins",
      key: "wins",
    },
    {
      title: "BEST TIME (SECONDS)",
      dataIndex: "time",
      key: "time",
      render: (time: number) => time.toFixed(2),
    },
  ];
  return (
    <div className='winners'>
      <div className='header'>
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
        <Table
          columns={winnersColumns}
          dataSource={winners}
          pagination={{ pageSize: 7, position: ["bottomLeft"] }}
        />
      </div>
    </div>
  );
};

export default Winners;
