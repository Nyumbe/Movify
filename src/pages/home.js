import React, { useState, useRef } from "react";
import axios from "axios";
import NavBar from "../components/navbar";
import FormInput from "../components/formInput";
import MovieCard from "../components/moviecard";
import Pagination from "../components/pagination";
import { InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Home = () => {
    const searchTerm = useRef(null);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm.current.value}&page=${page}&include_adult=false`);
        setMovies(response.data.results);
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row d-flex justify-content-center py-5 my-5">
                    <div className="col-12 mt-2 mb-4 fs-1 fw-bold d-flex justify-content-center align-items-center">
                        <FaSearch className="mx-4 text-danger" />
                        <h4 className="fs-2 text-white">Welcome To Movify, Quality Entertainment</h4>
                    </div>
                    
                    <div className="col-12 pt-5 pb-3 mt-5 d-flex justify-content-center align-items-center search-container">
                        <form onSubmit={handleSearch}>
                            <InputGroup>
                                <FormInput
                                    placeholder="Search for a movie"
                                    type="search"
                                    ref={searchTerm}
                                />
                                <Button variant="secondary" type="submit" id="button-addon2"><FaSearch /></Button>
                            </InputGroup>
                        </form>
                    </div>

                    {
                        movies.map((movie) => (
                            <div className="col-md-3 col-sm-4 py-5" id="card" key={movie.id}>
                                <MovieCard movie={movie} mediaType={movie.media_type} />
                            </div>
                        ))
                    }
                    {page > 1 && <Pagination page={page} setPage={setPage} />}
                </div>
            </div>
        </>
    );
};

export default Home;