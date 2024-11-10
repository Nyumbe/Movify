import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({ movie, mediaType }) => {
    const baseImageUrl = "https://image.tmdb.org/t/p/w500"; // Base URL for images
    const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
// const response = await fetch(`https://api.themoviedb.org/3/${id}`);
    return (
        <>


            <div className="card rounded-5 h-100">
            <img 
                src={movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : unavailable } 
                alt={movie.title} 
                className="card-img-top pt-3 pb-0 px-3" 
            />                
            <div className="card-body d-flex flex-column">
                    <h3 className="card-title text-center fs-5">{movie.title || movie.name}</h3>
                    <div className="d-flex align-items-center justify-content-evenly">
                    <Link to={`/${mediaType}detail/${movie.id}`} className='h-100 w-100 shadow position-absolute'></Link>

                    {(movie.vote_average||0) > 7 ? <div className='fw-bold fs-6 text-success p-2 bg-dark rounded-circle'>{(movie.vote_average||0).toFixed(1)}</div> : (movie.vote_average||0) > 5.5 ? <div className='fw-bold fs-6 text-warning p-2 bg-dark rounded-circle'>{(movie.vote_average||0).toFixed(1)}</div> : <div className='fw-bold fs-6 text-danger p-2 bg-dark rounded-circle'>{(movie.vote_average||0).toFixed(1)}</div>}
                        <div>{movie.media_type === "tv" ? "TV" : "Movie"}</div>
                        </div>
                </div>
            </div>


        </>);
};

export default MovieCard;