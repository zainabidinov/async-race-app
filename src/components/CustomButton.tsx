import { Button, ConfigProvider } from "antd";
import { PlayCircleTwoTone, UndoOutlined } from "@ant-design/icons";
import { ButtonTypes } from "../types/types";

interface customButtonTypes extends ButtonTypes {
  onDelete?: () => void;
  carStatus?: string;
  onUpdate?: () => void;
  onSwitchCarStatus?: () => void;
  isDisabled?: boolean;
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
  isDisabled,
  carStatus
}) => {
  let buttonIcon;

  switch (icon) {
    case "play":
      buttonIcon = <PlayCircleTwoTone twoToneColor={color} />;
      break;
    case "reset":
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
          type={btnType ? "primary" : "default"}
          icon={buttonIcon}
          iconPosition='end'
          block
          htmlType={btnSubmitType ? "submit" : "button"}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {text}
        </Button>
      </ConfigProvider>
    </>
  );
};

export default CustomButton;
