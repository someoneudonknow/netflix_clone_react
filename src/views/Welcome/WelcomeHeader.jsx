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
      state: { email: value?.toString() },
    });
  };
  return (
    <BackgroundImage src={welcomeImage}>
      <div className={classes.actions}>
        <SelectButton onSelect={handleSelectLanguage}>
          <Selection init data="en"> English </Selection>
          <Selection data="vn">
            Tiếng Việt
          </Selection>
        </SelectButton>
        <Link to="/vn/login_register/login" className={classes.loginBtn}>
          Sign in
        </Link>
      </div>

      <div className={classes.content}>
        <h1>Unlimited movies, TV <br/> shows, and more.</h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <p className={classes.subCap}>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <EmailForm onSubmit={handleSubcribes} />
      </div>
    </BackgroundImage>
  );
};

export default WelcomeHeader;
