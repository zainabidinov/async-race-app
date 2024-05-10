import { Button, ConfigProvider } from "antd";
import { PlayCircleTwoTone, UndoOutlined } from "@ant-design/icons";

interface Props {
  color: string;
  text: string;
  icon?: string;
  btnType?: string;
}

const CustomButton: React.FC<Props> = ({ color, text, icon, btnType }) => {
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
        <Button type={btnType ? "primary" : "default"} icon={buttonIcon} block>
          {text}
        </Button>
      </ConfigProvider>
    </>
  );
};

export default CustomButton;
