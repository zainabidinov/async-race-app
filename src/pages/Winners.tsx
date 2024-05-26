import React from 'react';
import '../styles/styles.css';
import { Flex, Button, ConfigProviderProps } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { getWinners } from '../api/getWinners';
import { useCarContext } from '../store/CarContext';
import { getCars } from '../api/getCars';
import { GiRaceCar } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { WinnerData } from '@src/types/types';

type SizeType = ConfigProviderProps['componentSize'];

const Winners = () => {
  const [buttonSize, setButtonSize] = useState<SizeType>('large');
  const [carSize, setCarSize] = useState<string>('6em');
  const { winners, setWinners } = useCarContext();

  useEffect(() => {
    const updateButtonSize = () => {
      setButtonSize(window.innerWidth <= 501 ? 'small' : 'middle');
      setCarSize(window.innerWidth <= 501 ? '2.8em' : '6em');
    };

    updateButtonSize();

    window.addEventListener('resize', updateButtonSize);
    return () => window.removeEventListener('resize', updateButtonSize);
  }, []);

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
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'CAR',
      dataIndex: 'car',
      key: 'car',
      render: (color: string) => (
        <IconContext.Provider value={{ color: color, size: carSize }}>
          <GiRaceCar />
        </IconContext.Provider>
      ),
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'WINS',
      dataIndex: 'wins',
      key: 'wins',
      sorter: (a: WinnerData, b: WinnerData) => a.wins - b.wins,
    },
    {
      title: 'BEST TIME (SECONDS)',
      dataIndex: 'time',
      key: 'time',
      render: (time: number) => time.toFixed(2),
      sorter: (a: WinnerData, b: WinnerData) => a.time - b.time,
    },
  ];
  return (
    <div className="winners">
      <div className="header">
        <Flex gap="middle">
          <Button
            type="primary"
            size={buttonSize}
            onClick={() => navigate('/garage')}
          >
            GARAGE
          </Button>
          <Button
            type="primary"
            size={buttonSize}
            onClick={() => navigate('/winners')}
          >
            WINNERS
          </Button>
        </Flex>
        <h2>ASYNC RACE</h2>
      </div>

      <div className="container">
        <Table
          columns={winnersColumns}
          dataSource={winners}
          pagination={{ pageSize: 7, position: ['bottomLeft'] }}
        />
      </div>
    </div>
  );
};

export default Winners;
