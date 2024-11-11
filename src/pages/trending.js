import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/moviecard";
import Pagination from "../components/pagination";
import NavBar from "../components/navbar";
import { FaFire } from "react-icons/fa";


const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`);
                setMovies(response.data.results);
                console.log(`Page: ${page}`, response.data);
            } catch (e) {
                console.error("Error fetching movies:", e);
            }
        };
        fetchMovies();
    }, [page]);
    console.log(movies);

    return (<>
        <NavBar />
        <div className="container">
            <div className="row py-5 my-5">
                <div className="col-12 mt-2 mb-4 fs-1 fw-bold d-flex justify-content-center align-items-center">
                    <FaFire className="mx-4 text-danger" />
                    <h4 className="fs-2">Trending Today</h4>
                </div>
                {movies.map((movie) => (
                    <div className="col-md-3 col-sm-4 py-3" key={movie.id}>
                        <MovieCard movie={movie} mediaType={movie.media_type} />

                    </div>
                ))}
                <Pagination page={page} setPage={setPage} />
            </div>
        </div>

    </>);
};

export default Trending;