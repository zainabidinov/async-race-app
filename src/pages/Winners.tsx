import "../styles/styles.css";
import { Flex, Button, ConfigProviderProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SizeType = ConfigProviderProps["componentSize"];

const Winners = () => {
  const [size, setSize] = useState<SizeType>("large");

  const navigate = useNavigate();
  return (
    <div className='winners'>
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
    </div>
  );
};

export default Winners;
