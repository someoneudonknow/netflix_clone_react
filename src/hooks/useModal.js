import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeModal } from "../store/modalSlice";

const useModal = () => {
  const [show, setShow] = useState(false);
  const [currentModal, setCurrentModal] = useState();
  const modalList = useSelector((state) => state.modals.currentModals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalList.length > 0) {
      setCurrentModal(modalList[modalList.length - 1]);
      setShow(true);
    } else {
      setCurrentModal(null);
    }
  }, [modalList, dispatch]);

  useEffect(() => {
    let timer;
    if (!show && modalList.length > 0 && currentModal?.id) {
      timer = setTimeout(() => {
        dispatch(removeModal({ id: currentModal?.id }));
      }, 500);
    }
    return () => {
      if(timer) {
        clearTimeout(timer);
      }
    };
  }, [show]);

  const handleHideModal = () => {
    setShow(false);
  };

  return {
    currentModal,
    hideModal: handleHideModal,
    isShow: show,
  };
};

export default useModal;
