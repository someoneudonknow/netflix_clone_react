import React, { useState, useContext, useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import classes from "./ProfilePage.module.scss";
import { EditSVG } from "../../components/SVG";
import { AuthContext } from "../../store/Auth/AuthProvider";
import { db } from "../../firebase/config";
import defaultAvt from "../../assets/images/avatar_bigger.png";

const Loading = () => {
  return (
    <div className={classes.overlay}>
      <Spinner animation="border" variant="light" />
    </div>
  );
};

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onTouched" });
  const [userInfo, setUserInfo] = useState({});
  const { currentUser } = useContext(AuthContext);
  const fileRef = useRef();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [docRef, setDocRef] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("profile"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  useEffect(() => {
    if (userInfo?.displayName?.trim() !== "") {
      setValue("editedName", userInfo?.displayName?.trim());
    }
    if (userInfo?.phoneNumber?.trim() !== "") {
      setValue("editedPhoneNumber", userInfo?.phoneNumber?.trim());
    }
  }, [userInfo]);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "users", currentUser?.uid);
        const userData = await getDoc(docRef);
        setUserInfo({
          displayName: userData?.data().displayName,
          phoneNumber: userData?.data().phoneNumber,
          photoURL: userData?.data().photoURL,
        });
        setDocRef(docRef);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };

    getUserInfo();
  }, []);

  const handleProfileUpdateSubmit = async (data) => {
    if (isFormChanged) {
      console.log(data);
      setIsLoading(true);
      try {
        await updateProfile(currentUser, {
          displayName: data.editedName,
        });
        const dataFireStore = {
          displayName: data.editedName,
        };
        await updateDoc(docRef, dataFireStore);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }

    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div className={classes.container}>
      <div className={classes.mainContent}>
        <h1>Edit Profile</h1>
        <hr />
        <form
          className={classes.editProfileForm}
          onSubmit={handleSubmit(handleProfileUpdateSubmit)}
        >
          <div className={classes.wrapper}>
            {isLoading && <Loading />}
            <div className={classes.rigthPart}>
              <div
                className={`${classes.formControl} ${
                  "editedName" in errors ? classes.invalid : ""
                }`}
              >
                <input
                  {...register("editedName", {
                    required: true,
                    onChange: () => setIsFormChanged(true),
                  })}
                  type="text"
                  name="editedName"
                  placeholder="Name"
                />
                {errors && errors?.editedName && (
                  <small className={classes.invalidText}>
                    {errors?.editedName?.type === "required" &&
                      "Please enter a name"}
                  </small>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className={classes.actions}>
            <button
              type="submit"
              disabled={isLoading}
              className={`${classes.action} ${classes.saveBtn}`}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={`${classes.action} ${classes.cancelBtn}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
