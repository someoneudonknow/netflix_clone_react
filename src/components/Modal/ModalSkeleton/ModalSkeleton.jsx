import classes from "./ModalSkeleton.module.scss";
import { EpisodeItemSkeleton } from "../../Episodes/EpisodeItem";
import Skeleton from "react-loading-skeleton";

const ModalSkeleton = () => {
  return (
    <div className={`${classes.modalSkeleton}`}>
      <div className={classes.backgroundSkeleton}>
        <Skeleton height="100%" width="100%" />
      </div>
      <div>
        <div>
          <EpisodeItemSkeleton />
          <EpisodeItemSkeleton />
          <EpisodeItemSkeleton />
        </div>
        <div className="p-0 d-flex mt-5 w-100 justify-content-around">
          <Skeleton height="32rem" width="27rem" />
          <Skeleton height="32rem" width="27rem" />
          <Skeleton height="32rem" width="27rem" />
        </div>
        <div className="p-3 mt-5">
          <Skeleton height="20rem" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default ModalSkeleton;