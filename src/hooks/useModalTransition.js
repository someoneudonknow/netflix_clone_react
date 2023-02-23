import { useSelector } from "react-redux";

const useModalTransition = () => {
  const modalList = useSelector((state) => state.modals.currentModals);
  const haveModal = modalList?.length > 1;
  let appearAni = {};
  let outAni = "";

  if (haveModal) {
    appearAni = { animation: `slide-in-left ease .4s` };
    outAni = "slide-out-right";
  } else {
    outAni = "slide-out";
    appearAni = { animation: `appear ease .4s` };
  }
  return {
    outAni,
    appearAni,
  };
};

export default useModalTransition;
