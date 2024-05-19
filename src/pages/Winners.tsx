import "../styles/styles.css";
import { Flex, Button, ConfigProviderProps } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { winnersTableColumns } from "../data/winnersTableColumns";
import { getWinners } from "../api/getWinners";
import { useCarContext } from "../store/CarContext";

type SizeType = ConfigProviderProps["componentSize"];

const Winners = () => {
  const [size, setSize] = useState<SizeType>("large");
  const { winners, setWinners } = useCarContext();

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const fetchedWinners = await getWinners();
        setWinners(fetchedWinners);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWinners();
  }, []);

  const navigate = useNavigate();
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
          columns={winnersTableColumns}
          dataSource={winners}
          pagination={{ pageSize: 7, position: ["bottomLeft"] }}
        />
      </div>
    </div>
  );
};

export default Winners;
