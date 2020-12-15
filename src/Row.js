import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [ movies, setMovies ] = useState([]);
    const [ trailerUrl, setTrailerUrl ] = useState(""); 

    // A snippet of code which runs based on a specific condition/varaible
    useEffect(() => {
        //if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            //"https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213",
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        console.log(movie)
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || "")
                .then((url) => {
                    console.log(url)
                    //https://www.youtube.com/watch?v=XtmThy8QKqU&banana=5
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{ title }</h2>
            <div className="row__posters">
                {/*  */}
                {movies.map((movie) => (
                    // "/mYsWyfiIMxx4HDm0Wck7oJ9ckez.jpg"
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`${base_url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
