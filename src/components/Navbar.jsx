import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleScrapeNews = () => {
        fetch('http://localhost:5000/api/v1/scrapenews')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg">
                <div className="container-fluid">
                    <div className="navbar-brand">Tech News</div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    style={{ color: 'blanchedalmond' }}
                                    onClick={() => window.location.reload()}
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                        </ul>

                        <button className="btn btn-outline-light ms-2" style={{ fontSize: "1.2rem", fontFamily: "inherit", border: "none" }} onClick={handleScrapeNews}>
                            Scrape News
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
