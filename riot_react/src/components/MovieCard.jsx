import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {ACCESS_TOKEN} from "../constants";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {addFavoriteMovie, getCurrentUser, getFavoriteFilm, removeFavoriteMovie} from "../util/ApiUtils";
import {Button} from "antd";
import ifCurrentUser from "./useCurrentUser";
import {navigate} from "@reach/router";

function MovieCard({id, enName, year, imbd, time, img}) {
    if (!img || !enName || !imbd) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isFavorite, setIsFavorite] = useState(false);

    const isLoggedIn = ifCurrentUser();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (isLoggedIn) {
            getFavoriteFilm(localStorage.getItem("userId"))
                .then(data => {
                    console.log("favorite movies: ", data);
                    const favoriteMovieIds = data.map(movie => movie.id);
                    setIsFavorite(favoriteMovieIds.includes(id));
                })
                .catch(error => {
                    console.log("Error occurred while fetching favorite movies: ", error);
                });
        }
    }, [id, isLoggedIn]);

    function handleFavorite() {
        if (isLoggedIn) {
            setIsFavorite(!isFavorite);
            if (isFavorite) {
                removeFavoriteMovie(localStorage.getItem("userId"), id)
                    .then(() => setIsFavorite(false))
                    .catch(error => {
                        console.log("Error occurred while removing favorite movie: ", error);
                    });
            } else {
                addFavoriteMovie(localStorage.getItem("userId"), id)
                    .then(() => setIsFavorite(true))
                    .catch(error => {
                        console.log("Error occurred while adding favorite movie: ", error);
                    });
            }
        }
    }

    const handleClick = () => {
        localStorage.setItem("from", `/watch/${id}`);
    };


 const movieLink = isLoggedIn ? `/watch/${id}` : `/auth/login`;

    return (
        <div className="static m-5 w-auto rounded-2xl bg-opacity-70 bg-clip-padding backdrop-blur drop-shadow-1g ">
            <Link to={movieLink} onClick={handleClick}>
                {img ? (
                    <img
                        name="image"
                        className={" w-full rounded-xl bg-cover "}
                        style={{height: "100%"}}
                        alt={enName}
                        src={"https://image.tmdb.org/t/p/w500" + img}
                    />
                ) : (
                    <div className="w-full rounded-xl bg-cover bg-gray-400">
                        No Image Available
                    </div>
                )}
            </Link>
            <div className="clear-both"/>
            <p className="pl-1 pt-1 mt-0.5 text-white font-sans text-l">
                {enName} ({year})
            </p>
            <div className="clear-both"/>
            <div
                className="bg-slate-900
        rounded-full
        p-1
        shadow-lg
        absolute 
        right-4
        bg-opacity-50
        bottom-4
        mb-2
        "
            >
                <h4
                    className="
         text-white
         text-sm
         ml-2
         mr-2
         font-sans
         font-normal
        "
                >
                    {time}
                </h4>
            </div>
            <div
                className="bg-white
        rounded-full
        p-2
        absolute 
        left-4
        top-4
        bg-opacity-30
        mb-2
        "
            >
                <h4
                    className="
         text-white
         text-sm
         ml-2
         mr-2
         font-sans
         font-normal
        "
                    style={{textShadow: "1px 1px #000000"}}
                >
                    <FontAwesomeIcon
                        className="text-yellow-400 mr-1.5 shadow-lg font-bold"
                        icon={faStar}
                    />
                    IMDb {imbd}
                </h4>
                {isLoggedIn && (<div>
                    <Button
                        variant="outline-danger"
                        onClick={handleFavorite}
                    >
                        {isFavorite ? '❤️ Favorite' : '♡ Favorite'}
                    </Button>
                </div>)}

            </div>
        </div>
    );
}

export default MovieCard;
