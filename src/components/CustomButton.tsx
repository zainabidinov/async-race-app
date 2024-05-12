import { Button, ConfigProvider } from "antd";
import { PlayCircleTwoTone, UndoOutlined } from "@ant-design/icons";
import { ButtonTypes } from "../types/types";

interface customButtonTypes extends ButtonTypes {
  onDelete?: () => void;
  onUpdate?: () => void;
}

const CustomButton: React.FC<customButtonTypes> = ({ color, text, icon, btnType, btnSubmitType, onDelete,
  onUpdate }) => {
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
          onClick={onDelete ? onDelete : onUpdate}
        >
          {text}
        </Button>
      </ConfigProvider>
    </>
  );
};

export default CustomButton;
