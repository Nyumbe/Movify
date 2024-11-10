import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/moviecard";
import Pagination from "../components/pagination";
import NavBar from "../components/navbar";
import { FaStar } from "react-icons/fa";

const TopRated = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");

    const fetchData = async (type) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/${type}/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
        );
        return response.data.results;
    };

    useEffect(() => {
        const fetchTopRated = async () => {
            const [moviesData, tvShowsData] = await Promise.all([
                fetchData("movie"),
                fetchData("tv")
            ]);
            setMovies(moviesData);
            setTvShows(tvShowsData);
        };
        fetchTopRated();
    }, [page]);

    useEffect(() => {
        let data = [];
        if (filter === "all") {
            data = [...movies.map(item => ({ ...item, media_type: "movie" })), ...tvShows.map(item => ({ ...item, media_type: "tv" }))];
        } else if (filter === "movies") {
            data = movies.map(item => ({ ...item, media_type: "movie" }));
        } else if (filter === "tv") {
            data = tvShows.map(item => ({ ...item, media_type: "tv" }));
        }
        setFilteredData(data.sort((a, b) => b.vote_average - a.vote_average));
    }, [filter, movies, tvShows]);

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row py-5 my-5">
                    <div className="col-12 mt-2 mb-4 fs-1 fw-bold d-flex justify-content-center align-items-center">
                        <FaStar className="mx-4 text-warning" />
                        <h4 className="fs-2 text-white">Top-Rated</h4>
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                        {["all", "movies", "tv"].map(type => (
                            <button
                                key={type}
                                className={`btn ${filter === type ? "btn-primary" : "btn-outline-primary"} mx-2`}
                                onClick={() => setFilter(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="row">
                        {filteredData.map(item => (
                            <div className="col-md-3 col-sm-4 py-3" key={item.id}>
                                <MovieCard movie={item} mediaType={item.media_type}/>
                            </div>
                        ))}
                    </div>

                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
        </>
    );
};

export default TopRated;