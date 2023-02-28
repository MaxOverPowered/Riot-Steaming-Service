import { useState, useEffect } from "react";
import { getMovieById } from "../util/ApiUtils";

const TorServer = ({ movieId, hash, backdrop_path }) => {
  const [movieObject, setMovieObject] = useState({});

  useEffect(() => {
    getMovieById(movieId)
      .then((response) => response.json())
      .then((data) => {
        setMovieObject(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId]);

  useEffect(() => {
    window.webtor = window.webtor || [];
    window.webtor.push({
      id: "player",
      magnet: "" + hash,
      on: function (e) {
        if (e.name === window.webtor.TORRENT_FETCHED) {
          console.log("Torrent fetched!", e.data);
        }
        if (e.name === window.webtor.TORRENT_ERROR) {
          console.log("Torrent error!");
        }
      },
      poster: "https://image.tmdb.org/t/p/w500" + backdrop_path,
      subtitles: [],
      lang: "en",
      i18n: {
        en: {
          common: {
            "prepare to play": "Preparing Video Stream... Please Wait...",
          },
          stat: {
            seeding: "Seeding",
            waiting: "Client initialization",
            "waiting for peers": "Waiting for peers",
            from: "from",
          },
        },
      },
    });
    console.log(window.webtor);
  }, [movieId, hash, backdrop_path]);

  return <div id="player" className="webtor w-full"></div>;
};
export default TorServer;
