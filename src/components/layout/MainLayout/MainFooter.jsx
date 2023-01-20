import React from "react";
import classes from "./MainFooter.module.scss";

const MainFooter = () => {
  return (
    <footer className={classes.footerWrapper}>
      <div className={classes.footerContent}>
        <ul className={classes.socialsList}>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li className={classes.socialItem}>
            <a href="#">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
        </ul>
        <div className={classes.contactInfo}>
          <ul>
            <li>
              <a href="#">Mô tả âm thanh</a>
            </li>
            <li>
              <a href="#">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="#">Thẻ quà tặng</a>
            </li>
            <li>
              <a href="#">Trung tâm đa phương tiện</a>
            </li>
            <li>
              <a href="#">Quan hệ với nhà đầu tư</a>
            </li>
            <li>
              <a href="#">Việc làm</a>
            </li>
            <li>
              <a href="#">Điều khoản sử dụng</a>
            </li>
            <li>
              <a href="#">Quyền riêng tư</a>
            </li>
            <li>
              <a href="#">Thông báo pháp lý</a>
            </li>
            <li>
              <a href="#">Tùy chọn cookie</a>
            </li>
            <li>
              <a href="#">Thông tin doanh nghiệp</a>
            </li>
            <li>
              <a href="#">Liên hệ với chúng tôi</a>
            </li>
          </ul>
        </div>
        <div className={classes.serviceCode}>
          <span>Mã Dịch vụ</span>
        </div>
        <div className={classes.copyright}>
          <p>
            © 1997-2022 Netflix, Inc.{" "}
            <span>2c931268-7254-48b0-a030-30002eb80847</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
