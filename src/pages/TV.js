import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/moviecard";
import Pagination from "../components/pagination";
import Genre from "../components/genre";
import useGenre from "../components/useGenre";

import NavBar from "../components/navbar";
import { FaFilm } from "react-icons/fa";

const TV = () => {
    const [movies, setMovies] = useState([]); //store the fetched data
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState([]); //used to store the origional genre values
    const [value, setValue] = useState([]); //used to store the selected genre values
    const genreURL = useGenre(value);


    
      useEffect(() => {
        const fetchTrending = async () => {
            const response = await axios.get(`
            https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
            setMovies(response.data.results.map(movie => ({ ...movie, media_type: "tv" })));

            // const tvShows = response.data.results.map(show => ({
            //     ...show,
            //     media_type: "tv" // Add media_type property
            // }));

            // setMovies(tvShows);
          };
        fetchTrending();
      }, [page, genreURL]);

    return (<>
        <NavBar />
        <div className="container">
            <div className="row py-5 my-5">
                <div className="col-12 mt-2 mb-4 fs-1 fw-bold d-flex justify-content-center align-items-center">
                    <FaFilm className="mx-4 text-danger" />
                    <h4 className="fs-2 text-white">TV Series</h4>
                </div>

                <Genre
                    genre={genre}
                    setGenre={setGenre}
                    setPage={setPage}
                    type="tv"
                    value={value}
                    setValue={setValue}
                />

                {movies.map((movie) => (
                    <div className="col-md-3 col-sm-4 py-3" key={movie.id}>
                        <MovieCard movie={movie} mediaType="tv" />

                    </div>
                ))}
                <Pagination page={page} setPage={setPage} />
            </div>
        </div>

    </>);
};

export default TV;