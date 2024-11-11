import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { HiChevronLeft } from "react-icons/hi"; // Import the icon


const baseImageUrl = "https://image.tmdb.org/t/p/w500";
const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

const Detail = () => {
    const { id } = useParams();
    const location = useLocation();
    const mediaType = location.pathname.includes("tvdetail") ? "tv" : "movie";
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const endpoint = mediaType === "tv" ? "tv" : "movie";
            const response = await fetch(`https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            const data = await response.json();
            setSelected({...data,
                genres: data.genres});
        };
        fetchDetails();
    }, [id, mediaType]);

    if (!selected) return null;

    const { title, name, release_date, first_air_date, vote_average, poster_path, overview, genres } = selected;
    const displayTitle = title || name;
    const displayYear = release_date || first_air_date;
    const imageUrl = poster_path ? `${baseImageUrl}${poster_path}` : unavailable;

    return (
        <Container className="detail my-5 p-4 text-white rounded">
           <HiChevronLeft
                    size={30}
                    onClick={() => window.history.back()}
                    className="bg-white text-dark rounded-circle p-1 mb-3"
                    style={{ cursor: 'pointer' }}
                />
            <Row>
                <Col md={4} className="d-flex justify-content-center align-items-center">
                    <img src={imageUrl} alt={displayTitle} className="img-fluid rounded" />
                </Col>
                <Col md={8}>
                    <h2 className="mb-3">{displayTitle}</h2>
                    <p className="mb-2"><strong>Year:</strong> {displayYear}</p>
                    <p className="mb-2"><strong>Rating:</strong> {vote_average}</p>
                    <p>{overview}</p>
                    <p className="mb-2"><strong>Genres:</strong> {genres.map(genre => genre.name).join(', ')}</p>

                </Col>
            </Row>
        </Container>
    );
};

export default Detail;