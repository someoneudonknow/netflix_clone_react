import React from "react";
import classes from "./WelcomeFooter.module.scss";
import { SelectButton, Selection } from "../../components/SelectButton";
import { WelcomeFooterLayout } from "../../components/layout";
import { Link } from "react-router-dom";

const WelcomeFooter = () => {
  const handleSelect = (data) => {};
  return (
    <WelcomeFooterLayout>
      <ul className={classes.questionsList}>
        <li>
          <Link className="text-muted" to="/">Câu hỏi thường gặp</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Trung tâm trợ giúp</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Tài khoản</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Trung tâm đa phương tiện</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Quan hệ với nhà đầu tư</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Việc làm</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Các cách xem</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Điều khoản sử dụng</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Quyền riêng tư</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Tùy chọn cookie</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Thông tin doanh nghiệp</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Liên hệ với chúng tôi</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Kiểm tra tốc độ</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Thông báo pháp lý</Link>
        </li>
        <li>
          <Link className="text-muted" to="/">Chỉ có trên Netflix</Link>
        </li>
      </ul>
      <SelectButton className={classes.selectBtn} onSelect={handleSelect}>
        <Selection className={classes.selection} data="en">
          {" "}
          English{" "}
        </Selection>
        <Selection className={classes.selection} init data="vn">
          {" "}
          Tiếng Việt{" "}
        </Selection>
      </SelectButton>
      <p className={classes.location}>Netflix Việt Nam</p>
    </WelcomeFooterLayout>
  );
};

export default WelcomeFooter;
