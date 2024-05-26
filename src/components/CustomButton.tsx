import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, ConfigProviderProps } from 'antd';
import { PlayCircleTwoTone, UndoOutlined } from '@ant-design/icons';
import { ButtonTypes } from '../types/types';

type SizeType = ConfigProviderProps['componentSize'];

interface customButtonTypes extends ButtonTypes {
  onDelete?: () => void;
  carStatus?: string;
  onUpdate?: () => void;
  onSwitchCarStatus?: () => void;
  onGenerateCars?: () => void;
  isDisabled?: boolean;
  onStartRace?: () => void;
  onStopRace?: () => void;
}

const CustomButton: React.FC<customButtonTypes> = ({
  color,
  text,
  icon,
  btnType,
  btnSubmitType,
  onDelete,
  onUpdate,
  onSwitchCarStatus,
  onGenerateCars,
  isDisabled,
  carStatus,
  onStartRace,
  onStopRace,
}) => {
  let buttonIcon;

  const [buttonSize, setButtonSize] = useState<SizeType>('middle');

  useEffect(() => {
    const updateButtonSize = () => {
      setButtonSize(window.innerWidth <= 501 ? 'small' : 'middle');
    };

    updateButtonSize();

    window.addEventListener('resize', updateButtonSize);
    return () => window.removeEventListener('resize', updateButtonSize);
  }, []);

  switch (icon) {
    case 'play':
      buttonIcon = <PlayCircleTwoTone twoToneColor={color} />;
      break;
    case 'reset':
      buttonIcon = <UndoOutlined />;
      break;
    default:
      buttonIcon = null;
      break;
  }

  const handleClick = () => {
    if (onDelete) {
      onDelete();
    } else if (onUpdate) {
      onUpdate();
    } else if (onSwitchCarStatus) {
      onSwitchCarStatus();
    } else if (onGenerateCars) {
      onGenerateCars();
    } else if (onStartRace) {
      onStartRace();
    } else if (onStopRace) {
      onStopRace();
    }
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: color,
              colorText: color,
              colorBorder: color,
              lineWidth: 1.6,
              algorithm: true,
            },
          },
        }}
      >
        <Button
          type={btnType ? 'primary' : 'default'}
          icon={buttonIcon}
          iconPosition="end"
          block
          htmlType={btnSubmitType ? 'submit' : 'button'}
          onClick={handleClick}
          disabled={isDisabled}
          size={buttonSize}
        >
          {text}
        </Button>
      </ConfigProvider>
    </>
  );
};

export default CustomButton;
