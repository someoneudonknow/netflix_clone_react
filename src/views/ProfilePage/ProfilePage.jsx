import React, { useState, useContext, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import classes from "./ProfilePage.module.scss";
import { AuthContext } from "../../store/Auth/AuthProvider";
import { db } from "../../firebase/config";
import { EditSVG } from "../../components/SVG";
import { uploadAvatarImage } from "../../functions";

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
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [docRef, setDocRef] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const userCtx = useContext(AuthContext);

  useEffect(() => {
    window.sessionStorage.setItem("currentPage", JSON.stringify("profile"));
    return () => {
      window.sessionStorage.removeItem("currentPage");
    };
  }, []);

  useEffect(() => {
    let timeoutId;
    if (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setError(null);
        setShowError(false);
        timeoutId = null;
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error]);

  useEffect(() => {
    if (userInfo?.displayName?.trim() !== "") {
      setValue("editedName", userInfo?.displayName?.trim());
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
        });
        setDocRef(docRef);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };
    getUserInfo();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image")) {
      setError("not image file");
      setShowError(true);
      return;
    }
    const src = URL.createObjectURL(file);
    const data = {
      imgSrc: src,
      imgFile: file,
    };
    setImageFile(data);
    setIsFormChanged(true);
  };

  const handleProfileUpdateSubmit = async (data) => {
    if (isFormChanged) {
      setIsLoading(true);
      try {
        const dataUpdated = {
          displayName: data.editedName,
        };
        await updateProfile(currentUser, { displayName: data.editedName });
        await updateDoc(docRef, dataUpdated);
        await uploadAvatarImage(
          imageFile.imgFile,
          userCtx.currentUser,
          setIsLoading
        );
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }

    navigate("/vn/home/" + userCtx?.currentUser?.uid);
  };

  const handleCancel = () => {
    navigate("/vn/home/" + userCtx?.currentUser?.uid);
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
          <Alert show={showError} variant="danger">
            <p style={{ fontSize: "1.7rem" }}>{error}</p>
          </Alert>
          <div className={classes.wrapper}>
            {isLoading && <Loading />}
            <div
              style={{
                background: `#fff url(${
                  imageFile?.imgSrc || userCtx?.currentUser?.photoURL
                }) no-repeat center/cover`,
              }}
              className={classes.avatarWrapper}
            >
              <label htmlFor="avatarInput">
                <EditSVG />
              </label>
              <input
                onChange={handleFileChange}
                type="file"
                hidden
                id="avatarInput"
                accept="image/*"
              />
            </div>
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