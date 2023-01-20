import React from "react";
import video from "../../assets/videos/video-tv-0819.mp4";
import TV from "../../assets/images/our_story_img.png";
import mobile from "../../assets/images/mobile.jpg";
import poster from "../../assets/images/boxshot.png";
import kidImage from "../../assets/images/kid_img.png";
import twoMobile from "../../assets/images/2_phone_img.jpg";
import { SectionWrapper, SectionCard } from "../../components/UI";
import classes from "./WelcomeMain.module.scss";
import { Accordion, AccordionItem } from "../../components/Accordion";
import { EmailForm } from "../../components/Forms";
import { useNavigate } from "react-router-dom";

const WelcomeMain = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (value) => {
    console.log('Your email has been sent', value);
    navigate("/vn/login_register/login", {
      state: {email: value?.toString()}
    });
  }

  return (
    <main>
      <SectionWrapper>
        <SectionCard className={classes.textWrapper}>
          <h1>Thưởng thức trên TV của bạn.</h1>
          <h3>
            Xem trên TV thông minh, Playstation, Xbox, Chromecast, Apple TV, đầu
            phát Blu-ray và nhiều thiết bị khác.
          </h3>
        </SectionCard>
        <SectionCard className={classes.tvWrapper}>
          <img src={TV} alt="TV" />
          <video autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
        </SectionCard>
      </SectionWrapper>

      <SectionWrapper>
        <SectionCard className={classes.mobileWrapper}>
          <img className={classes.mobileImg} src={mobile} alt="mobile" />
          <div className={classes.downloadAnimation}>
            <div className={classes.posterWrapper}>
              <img src={poster} alt="Stranger thing poster" />
            </div>
            <span>
              <p className={classes.title}>Cậu bé mất tích</p>
              <p className={classes.loading}>Đang tải xuống...</p>
            </span>
            <div className={classes.animation}>
              <i className="fa-solid fa-download"></i>
            </div>
          </div>
        </SectionCard>
        <SectionCard className={classes.textWrapper}>
          <h1>Tải xuống nội dung để xem ngoại tuyến.</h1>
          <h3>
            Lưu lại những nội dung yêu thích một cách dễ dàng và luôn có thứ để
            xem.
          </h3>
        </SectionCard>
      </SectionWrapper>

      <SectionWrapper>
        <SectionCard className={classes.textWrapper}>
          <h1>Xem ở mọi nơi.</h1>
          <h3>
            Phát trực tuyến không giới hạn phim và chương trình truyền hình trên
            điện thoại, máy tính bảng, máy tính xách tay và TV.
          </h3>
        </SectionCard>
      </SectionWrapper>
      <SectionWrapper>
        <SectionCard>
          <img src={kidImage} alt="kid" />
        </SectionCard>
        <SectionCard className={classes.textWrapper}>
          <h1>Tạo hồ sơ cho trẻ em.</h1>
          <h3>
            Đưa các em vào những cuộc phiêu lưu với nhân vật được yêu thích
            trong một không gian riêng. Tính năng này đi kèm miễn phí với tư
            cách thành viên của bạn.
          </h3>
        </SectionCard>
      </SectionWrapper>

      <SectionWrapper>
        <SectionCard className={classes.textWrapper}>
          <h1>
            Bạn có điện thoại Android? Hãy thử gói dịch vụ miễn phí mới của
            chúng tôi!
          </h1>
          <h3>
            Xem các bộ phim và chương trình truyền hình mới được tuyển chọn mà
            không cần cung cấp thông tin thanh toán!
          </h3>
          <a
            href="https://play.google.com/store/apps/details?id=com.netflix.mediaclient"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tải ứng dụng >
          </a>
        </SectionCard>
        <SectionCard>
          <img
            style={{
              height: "40rem",
            }}
            src={twoMobile}
            alt="kid"
          />
        </SectionCard>
      </SectionWrapper>
      <SectionWrapper>
        <SectionCard className={classes.contactAndInfo}>
          <h1 className={classes.contactAndInfoTittle}>Câu hỏi thường gặp</h1>
          <Accordion>
            <AccordionItem title="Netflix là gì?">
              Netflix là dịch vụ phát trực tuyến mang đến đa dạng các loại
              chương trình truyền hình, phim, anime, phim tài liệu đoạt giải
              thưởng và nhiều nội dung khác trên hàng nghìn thiết bị có kết nối
              Internet.
              <br />
              <br />
              Bạn có thể xem bao nhiêu tùy thích, bất cứ lúc nào bạn muốn mà
              không gặp phải một quảng cáo nào – tất cả chỉ với một mức giá thấp
              hàng tháng. Luôn có những nội dung mới để bạn khám phá và những
              chương trình truyền hình, phim mới được bổ sung mỗi tuần!
            </AccordionItem>
            <AccordionItem title="Tôi phải trả bao nhiêu tiền để xem Netflix?">
              Xem Netflix trên điện thoại thông minh, máy tính bảng, TV thông
              minh, máy tính xách tay hoặc thiết bị phát trực tuyến, chỉ với một
              khoản phí cố định hàng tháng. Các gói dịch vụ với mức giá từ
              70.000 ₫ đến 260.000 ₫ mỗi tháng. Không phụ phí, không hợp đồng.
            </AccordionItem>
            <AccordionItem title="Tôi có thể xem ở đâu?">
              Xem mọi lúc, mọi nơi. Đăng nhập bằng tài khoản Netflix của bạn để
              xem ngay trên trang web netflix.com từ máy tính cá nhân, hoặc trên
              bất kỳ thiết bị nào có kết nối Internet và có cài đặt ứng dụng
              Netflix, bao gồm TV thông minh, điện thoại thông minh, máy tính
              bảng, thiết bị phát đa phương tiện trực tuyến và máy chơi game.
              <br />
              <br />
              Bạn cũng có thể tải xuống các chương trình yêu thích bằng ứng dụng
              trên iOS, Android hoặc Windows 10. Vào phần nội dung đã tải xuống
              để xem trong khi di chuyển và khi không có kết nối Internet. Mang
              Netflix theo bạn đến mọi nơi.
            </AccordionItem>
            <AccordionItem title="Làm thế nào để hủy?">
              Netflix rất linh hoạt. Không có hợp đồng phiền toái, không ràng
              buộc. Bạn có thể dễ dàng hủy tài khoản trực tuyến chỉ trong hai cú
              nhấp chuột. Không mất phí hủy – bạn có thể bắt đầu hoặc ngừng tài
              khoản bất cứ lúc nào.
            </AccordionItem>
            <AccordionItem title="Tôi có thể xem gì trên Netflix?">
              Netflix có một thư viện phong phú gồm các phim truyện, phim tài
              liệu, chương trình truyền hình, anime, tác phẩm giành giải thưởng
              của Netflix và nhiều nội dung khác. Xem không giới hạn bất cứ lúc
              nào bạn muốn.
            </AccordionItem>
            <AccordionItem title="Netflix có phù hợp cho trẻ em không?">
              Trải nghiệm Netflix Trẻ em có sẵn trong gói dịch vụ của bạn, trao
              cho phụ huynh quyền kiểm soát trong khi các em có thể thưởng thức
              các bộ phim và chương trình phù hợp cho gia đình tại không gian
              riêng.
              <br />
              <br />
              Hồ sơ Trẻ em đi kèm tính năng kiểm soát của cha mẹ (được bảo vệ
              bằng mã PIN), cho phép bạn giới hạn độ tuổi cho nội dung con mình
              được phép xem, cũng như chặn những phim hoặc chương trình mà bạn
              không muốn các em nhìn thấy.
            </AccordionItem>
          </Accordion>
          <p className={classes.contactAndInfoText}>
            Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư
            cách thành viên của bạn.
          </p>
          <EmailForm onSubmit={handleSubmit}/>
        </SectionCard>
      </SectionWrapper>
    </main>
  );
};

export default WelcomeMain;
