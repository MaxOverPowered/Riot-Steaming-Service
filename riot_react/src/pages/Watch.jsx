import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  getGenresNameByMovieId,
  getMovieById,
  getMovieGenre,
} from "../util/ApiUtils";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import TorServer from "../components/TorServer";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SimilarMovies from "../components/SimilarMovies";
import useCurrentUser from "../components/useCurrentUser";
import { Container } from "react-bootstrap";

const Watch = (props) => {
  const [movieGenre, setMovieGenre] = useState([false]);
  const [movie, setMovie] = useState([false]);
  const { id } = useParams();
  const isLoggedIn = useCurrentUser();

  const movieGenreList = async () => {
    getGenresNameByMovieId(id)
      .then((data) => {
        setMovieGenre(data);
      })
      .then(function (response) {
        console.log(`Fetch complete. (Not aborted)`);
      })
      .catch(function (err) {
        console.error(` Err: ${err}`);
      });
  };

  useEffect(() => {
    movieGenreList();
    getMovieById(id)
      .then((response) => {
        setMovie(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <Container>
      <Navbar showSearchBox={false} />
      {isLoggedIn && (
        <div className="bg-gray-900 h-screen flex items-center justify-center">
          <div className="text-white text-center p-20 font-sans">
            <div className="absolute">
              <Link to="/home">
                <button className="bg-black hover:bg-purple-600 hover:text-black text-purple-600 py-2 px-4 rounded">
                  <IoMdArrowRoundBack />
                </button>
              </Link>
            </div>
            <h2 className="font-semibold mb-5 text-xl">
              {movie?.english_title}
            </h2>
            <img
              name="image"
              className={" w-full rounded-xl bg-cover "}
              style={{ height: "100%" }}
              alt={movie?.english_title}
              src={"https://image.tmdb.org/t/p/w500" + movie?.backdrop_path}
            />
            <div className="mt-6">
              <h2>
                IMDb: {movie?.imdb}
                <FontAwesomeIcon
                  className="fa-2xs mb-1 ml-0.5 text-yellow-400 shadow-lg font-bold"
                  icon={faStar}
                />
              </h2>
              <h2>Release: {movie?.release_date}</h2>
              <h2>
                Duration:{" "}
                {Math.floor(movie?.runtime / 60) +
                  "h" +
                  (movie.runtime % 60) +
                  "m"}
              </h2>
              <h2>
                Genres:
                {movieGenre.map((option, i) => (
                  <h2 key={i}>{option}</h2>
                ))}
              </h2>
            </div>
          </div>
          <div>
            <TorServer
              movieId={id}
              hash={movie?.hash}
              backdrop_path={movie?.backdrop_path}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-36">
            <SimilarMovies genreIds={movie.genre_ids} />
          </div>
        </div>
      )}
    </Container>
  );
};
export default Watch;
