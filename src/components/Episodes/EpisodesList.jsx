import React, { useState, useEffect } from "react";
import EpisodeItem from "./EpisodeItem";
import classes from "./EpisodesList.module.scss";
import { usePlayTV } from "../../hooks";
import { LoadMoreButton } from "../UI";
import { EpisodeItemSkeleton } from "./EpisodeItem";

export const EpisodesListSkeleton = () => {
  return (
    <div>
      <EpisodeItemSkeleton />
      <EpisodeItemSkeleton />
      <EpisodeItemSkeleton />
      <EpisodeItemSkeleton />
    </div>
  );
};

const EpisodesList = ({ seriesName, type, episodesList, defaultImage, id }) => {
  const playTV = usePlayTV();
  const [visible, setVisible] = useState(10);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const unRealeasedList = episodesList?.filter(
    (episode) => episode?.unReleased
  );
  const releasedList = episodesList?.filter((episode) => !episode?.unReleased);
  const finalList = [...releasedList, ...unRealeasedList];
  const listLength = episodesList?.length;

  const handlePlayMovie = (season, episode) => {
    playTV(id, season, episode);
  };

  useEffect(() => {
    if (listLength > 10) {
      setIsLoadMore(true);
    }
  }, [listLength]);

  const handleLoadMore = () => {
    if (visible < listLength - 1) {
      setVisible((prevState) => prevState + listLength - prevState);
    } else {
      setVisible((prevState) => prevState - (listLength - 10));
    }
  };

  return (
    <div>
      <div className={classes.listTitle}>
        <h3>{type === "movie" ? "Collection" : "Episodes"}</h3>
        <h3>{seriesName}</h3>
      </div>
      {finalList?.slice(0, visible)?.map((episode, i) => {
        return (
          <EpisodeItem
            index={i}
            key={episode?.id}
            name={episode?.title}
            posterURL={episode?.posterURL}
            defaultImage={defaultImage}
            desc={episode?.overview}
            onClick={handlePlayMovie}
            isUnReleased={episode?.unReleased}
            seasonNumber={episode?.seasonNumber}
            episodeNumber={episode?.episodeNumber}
          />
        );
      })}
      {isLoadMore && (
        <LoadMoreButton
          style={
            visible >= listLength - 1
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
          onClick={handleLoadMore}
        />
      )}
    </div>
  );
};

export default EpisodesList;
