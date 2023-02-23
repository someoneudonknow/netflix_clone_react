import React from "react";
import video from "../../assets/videos/video-tv-0819.mp4";
import TV from "../../assets/images/our_story_img.png";
import mobile from "../../assets/images/mobile.jpg";
import poster from "../../assets/images/boxshot.png";
import kidImage from "../../assets/images/kid_img.png";
import { SectionWrapper, SectionCard } from "../../components/UI";
import classes from "./WelcomeMain.module.scss";
import { Accordion, AccordionItem } from "../../components/Accordion";
import { EmailForm } from "../../components/Forms";
import { useNavigate } from "react-router-dom";

const WelcomeMain = () => {
  const navigate = useNavigate();

  const handleSubmit = (value) => {
    console.log("Your email has been sent", value);
    navigate("/vn/login_register/login", {
      state: { email: value?.toString() },
    });
  };

  return (
    <main>
      <SectionWrapper>
        <SectionCard className={classes.textWrapper}>
          <h1>Enjoy on your TV.</h1>
          <h3>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
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
              <p className={classes.title}>Stranger Things</p>
              <p className={classes.loading}>Downloading...</p>
            </span>
            <div className={classes.animation}>
              <i className="fa-solid fa-download"></i>
            </div>
          </div>
        </SectionCard>
        <SectionCard className={classes.textWrapper}>
          <h1>Download your shows to watch offline.</h1>
          <h3>
            Save your favorites easily and always have something to watch.
          </h3>
        </SectionCard>
      </SectionWrapper>

      <SectionWrapper>
        <SectionCard className={classes.textWrapper}>
          <h1>Watch everywhere.</h1>
          <h3>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </h3>
        </SectionCard>
      </SectionWrapper>
      <SectionWrapper>
        <SectionCard>
          <img src={kidImage} alt="kid" />
        </SectionCard>
        <SectionCard className={classes.textWrapper}>
          <h1>Create profiles for kids.</h1>
          <h3>
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </h3>
        </SectionCard>
      </SectionWrapper>
      <SectionWrapper>
        <SectionCard className={classes.contactAndInfo}>
          <h1 className={classes.contactAndInfoTittle}>
            Frequently Asked Questions
          </h1>
          <Accordion>
            <AccordionItem title="What is Netflix?">
              <p className={classes.accordionText}>
                Netflix is a streaming service that offers a wide variety of
                award-winning TV shows, movies, anime, documentaries, and more
                on thousands of internet-connected devices.
                <br />
                <br />
                You can watch as much as you want, whenever you want without a
                single commercial – all for one low monthly price. There's
                always something new to discover and new TV shows and movies are
                added every week!
              </p>
            </AccordionItem>
            <AccordionItem title="How much does Netflix cost?">
              <p className={classes.accordionText}>
                Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
                streaming device, all for one fixed monthly fee. Plans range
                from 70,000 ₫ to 260,000 ₫ a month. No extra costs, no
                contracts.
              </p>
            </AccordionItem>
            <AccordionItem title="Where can I watch?">
              <p className={classes.accordionText}>
                Watch anywhere, anytime. Sign in with your Netflix account to
                watch instantly on the web at netflix.com from your personal
                computer or on any internet-connected device that offers the
                Netflix app, including smart TVs, smartphones, tablets,
                streaming media players and game consoles.
                <br />
                <br />
                You can also download your favorite shows with the iOS, Android,
                or Windows 10 app. Use downloads to watch while you're on the go
                and without an internet connection. Take Netflix with you
                anywhere.
              </p>
            </AccordionItem>
            <AccordionItem title="How do I cancel?">
              <p className={classes.accordionText}>
                Netflix is flexible. There are no pesky contracts and no
                commitments. You can easily cancel your account online in two
                clicks. There are no cancellation fees – start or stop your
                account anytime.
              </p>
            </AccordionItem>
            <AccordionItem title="What can I watch on Netflix?">
              <p className={classes.accordionText}>
                Netflix has an extensive library of feature films,
                documentaries, TV shows, anime, award-winning Netflix originals,
                and more. Watch as much as you want, anytime you want.
              </p>
            </AccordionItem>
            <AccordionItem title="Is Netflix good for kids?">
              <p className={classes.accordionText}>
                The Netflix Kids experience is included in your membership to
                give parents control while kids enjoy family-friendly TV shows
                and movies in their own space.
                <br />
                <br />
                Kids profiles come with PIN-protected parental controls that let
                you restrict the maturity rating of content kids can watch and
                block specific titles you don’t want kids to see.
              </p>
            </AccordionItem>
          </Accordion>
          <p className={classes.contactAndInfoText}>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <EmailForm onSubmit={handleSubmit} />
        </SectionCard>
      </SectionWrapper>
    </main>
  );
};

export default WelcomeMain;
