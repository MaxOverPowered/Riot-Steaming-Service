import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getFavoriteMovie, getUserId } from "../util/ApiUtils";
import { Carousel } from "antd";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserId(localStorage.getItem("userId")).then((data) => setUser(data));
  }, []);

  useEffect(() => {
    getFavoriteMovie(localStorage.getItem("userId")).then((data) =>
      setMovies(data)
    );
  }, []);

  return (
    <div
      className="bg-center bg-fixed h-screen flex-col justify-center items-center text-center text-white bg-cover"
      style={{ backgroundImage: "url(https://i.imgur.com/zn8ODjk.jpg)" }}
    >
      <Navbar showSearchBox={false} />
      <div>
        <br></br>
        <h1 className="text-4xl font-semibold font-sans mb-10 bottom-5">
          Hello, {user.username}
        </h1>
        <p className="mb-4">
          Username:
          <input
            type="text"
            value={user.username}
            className="bg-transparent text-white mx-2 "
            style={{ textAlign: "center" }}
          />
        </p>
        <p className="mb-4">
          Date of Birth:
          <input
            type="text"
            value={user.userDateOfBirth}
            className="bg-transparent text-white  "
            style={{ textAlign: "center" }}
          />
        </p>
        <p className="mb-4">
          Email:
          <input
            type="text"
            value={user.userEmail}
            className="bg-transparent text-white  "
            style={{ textAlign: "center" }}
          />
        </p>
        <Link to="/home">
          <button className="font-sans bg-gradient-to-r from-purple-600 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center m-7 absolute left-0 top-12 text-black">
            Back to Homepage
          </button>
        </Link>
      </div>
      <div>
        <h2 className="text-3xl font-sans font-semibold mb-5">
          Your Watchlist
        </h2>
        <Carousel
          dots={false}
          infinite={movies.length > 2}
          autoplay
          speed={300}
          slidesToShow={3}
          slidesToScroll={1}
        >
          {movies.length > 0 ? (
            movies.map((e, i) => {
              return (
                <MovieCard
                  key={i}
                  id={e.id}
                  enName={e.english_title}
                  img={e.backdrop_path}
                  imbd={e.imdb}
                  object={e}
                  time={e.runtime + "min"}
                  year={new Date(e.release_date).getFullYear()}
                />
              );
            })
          ) : (
            <h4 className="text-white text-center p-20 font-bold flex-col items-center">
              Your Watchlist is empty
            </h4>
          )}
        </Carousel>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
