import React from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./WelcomeHeader.module.scss";
import { BackgroundImage } from "../../components/UI";
import { SelectButton, Selection } from "../../components/SelectButton";
import { EmailForm } from "../../components/Forms";
import welcomeImage from "../../assets/images/welcome_header_img.jpg";

const WelcomeHeader = () => {
  const navigate = useNavigate();

  const handleSelectLanguage = (language) => {
    //...language switching logic here...
  };

  const handleSubcribes = (value) => {
    navigate("/vn/login_register/login", {
      state: {email: value?.toString()}
    });
  };
  return (
    <BackgroundImage src={welcomeImage}>
      <div className={classes.actions}>
        <SelectButton onSelect={handleSelectLanguage}>
          <Selection data="en"> English </Selection>
          <Selection init data="vn">
            Tiếng Việt
          </Selection>
        </SelectButton>
        <Link
          to="/vn/login_register/login"
          className={classes.loginBtn}
        >
          Đăng nhập
        </Link>
      </div>

      <div className={classes.content}>
        <h1>
          Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.
        </h1>
        <h3>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</h3>
        <p className={classes.subCap}>
          Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
          thành viên của bạn.
        </p>
        <EmailForm onSubmit={handleSubcribes} />
      </div>
    </BackgroundImage>
  );
};

export default WelcomeHeader;
