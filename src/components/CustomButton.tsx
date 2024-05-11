import { Button, ConfigProvider } from "antd";
import { PlayCircleTwoTone, UndoOutlined } from "@ant-design/icons";

interface Props {
  color: string;
  text: string;
  icon?: string;
  btnType?: string;
  btnSubmitType?: string;
}

const CustomButton: React.FC<Props> = ({ color, text, icon, btnType, btnSubmitType }) => {
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
        >
          {text}
        </Button>
      </ConfigProvider>
    </>
  );
};

export default CustomButton;
