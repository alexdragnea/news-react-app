import React from 'react';

const NewsItem = (props) => {
    const { title, imgSrc, url, source, scrapeddatetime } = props;

    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        <div className="card">
            <img src={imgSrc} alt="No source" style={{ height: "150px", objectFit: "cover" }} />
            <div className="card-body">
                <h5 className="card-title" title={title} onClick={handleClick}>{title}</h5>
                <h6>Source <b>{source}</b></h6>
                <p><b>{new Date(scrapeddatetime).toLocaleDateString()}</b></p>
                <button className="btn btn-dark" onClick={handleClick}>Go</button>
            </div>
        </div>
    );
};

export default NewsItem;
