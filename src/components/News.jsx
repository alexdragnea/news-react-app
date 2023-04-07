import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('DESC');

  document.title = `Latest Tech News`;

  const maxPages = Math.ceil((totalResults / 30) - 1);

  const handleSearch = (event) => {
    event.preventDefault();
    UpdateNews(0, searchTerm);
  };

  const UpdateNews = async (pageNumber, searchTerm) => {
    let url = `http://localhost:5000/api/v1/news?page=${pageNumber}&order=${order}`;
    if (searchTerm) {
      url = `http://localhost:5000/api/v1/news/search?keyword=${searchTerm}`;
    }
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      if (parsedData.news.length > 0) {
        setArticles(parsedData.news);
        setTotalResults(parsedData.totalResults);
        setError('');
      } else {
        setArticles([]);
        setError('No news found.');
      }
    } catch (error) {
      console.error(error);
      setArticles([]);
      setError('Error fetching news. Please try again later.');
    }
  };

  useEffect(() => {
    UpdateNews(page, searchTerm);
  }, [page, order, searchTerm]);

  const handleNext = async () => {
    setPage(page + 1);
    UpdateNews(page + 1, searchTerm);
  };

  const handlePrev = async () => {
    setPage(page - 1);
    UpdateNews(page - 1, searchTerm);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const isSearchTermPresent = searchTerm.trim().length > 0;

  return (
    <div className="container my-3 news">
      <div className="d-flex align-items-center">
        <form className="d-flex flex-grow-1 ms-2" role="search" onSubmit={handleSearch}>
          <input
            className="form-control me-1"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn news-button" type="submit">
            Search
          </button>
        </form>
        <div className="form-check form-switch ms-2">
          <select className="form-select form-select-sm" value={order} onChange={handleOrderChange} disabled={searchTerm !== ""}>
            <option value="DESC">Newest first</option>
            <option value="ASC">Oldest first</option>
          </select>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {articles.map((element) => {
          return (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title}
                imgSrc={
                  element.imgSrc
                    ? element.imgSrc
                    : "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                }
                source={element.source}
                scrapeddatetime={element.scrapedDateTime}
                url={element.url}
              />
            </div>
          );
        })}
      </div>
      <div className="container d-flex justify-content-between align-items-center">
        <button
          type="button"
          disabled={page <= 0}
          className="btn news-button"
          onClick={handlePrev}
        >
          Prev
        </button>
        <h6 className="news-page m-0">Page <b>{page + 1}</b></h6>
        <button
          type="button"
          disabled={page >= maxPages}
          className="btn news-button"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default News;
