import React, { useState, useRef, useEffect } from 'react';
import '../css/resource.css';
import Nav from './nav';




export default function Resource() {
    useEffect(() => {
        document.body.style.overflow = 'auto';
      }, [])
    return (
        <body>
            <Nav color = 'black' page = 'resource' rIcon = 'black' absolute = 'true'/>
            <Resource_main />
        </body>
    );
}

function Resource_main (){
    useEffect(() => {
        document.body.style.overflow = 'auto';
      }, [])

    const [resources, setResources] = useState({
    });

    useEffect(() => {
        fetch('http://89.116.21.45:8000/api/resource')
        .then(res => res.json())
        .then(data => {
          setResources(data)
        })
    }, [])



    const [mobileFilter, setMobileFilter] = useState(false);

    const filterOpen = () => {
        setMobileFilter(!mobileFilter);
    };

    const filterClose = () => {
        setMobileFilter(false);
    };


    useEffect (() => {
        
        const handleWindowResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth >= 1020) {
                setMobileFilter(false);
              }
            };
          
            window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [mobileFilter]);

    // filterOpt-all

    const [filter_all, setFilter_all] = useState(true);
    const [filter_news, setFilter_news] = useState(false);
    const [filter_video, setFilter_video] = useState(false);
    const [filter_article, setFilter_article] = useState(false);

    const selectFilterAll = () => {
        setFilter_all(true);
        setFilter_news(false);
        setFilter_video(false);
        setFilter_article(false);
    };

    const selectFilterArticle = () => {
        setFilter_all(false);
        setFilter_news(false);
        setFilter_video(false);
        setFilter_article(true);
    };

    const selectFilterNews = () => {
        setFilter_all(false);
        setFilter_news(true);
        setFilter_video(false);
        setFilter_article(false);
    };

    const selectFilterVideo = () => {
        setFilter_all(false);
        setFilter_news(false);
        setFilter_video(true);
        setFilter_article(false);
    };


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        
        setFilter_all(true);
        setFilter_news(false);
        setFilter_video(false);
        setFilter_article(false);
    };


    const filteredNews = resources.news ? resources.news.filter((resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const filteredArticles = resources.article ? resources.article.filter((resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const filteredVideos = resources.video ? resources.video.filter((resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return(
        <div>
            <div className="hero-rs">
        <div className="hero-cntxt-rs">
            <h1>Practical Tips for a Balanced Mind</h1>
            <p>Explore our Mental Wellness Hub for concise and effective mental health tips. From stress management to mindfulness techniques, discover actionable advice designed to help you maintain balance and promote overall well-being.</p>
        </div>
    </div>

    <div className="resource-main">
        {/* <!--search bar--> */}
        <div className="search-bar">
            <input type = "text"  name="search-bar" placeholder="Search" onChange={handleSearchInputChange}/>
            <a className='srch-icon'>
                <ion-icon name="search" ></ion-icon>
            </a>
        </div>
        {/* <!--filter--> */}
        <div className="result-main-container">
            <div className="result-filter">
                <div className="filter-choice">
                    <h3>Filter</h3>
                </div>

                {/* <!--mobile filter options--> */}
                <div className="filter-choice mobile">
                    <h3>Filter</h3>
                    <ion-icon name="chevron-down" id = "fltr-chc-open" onClick={filterOpen} style = {{display: mobileFilter === true ? 'none' : 'flex'}}></ion-icon>
                    <ion-icon name="chevron-up" id = "fltr-chc-close" onClick={filterClose} style = {{display: mobileFilter === true ? 'flex' : 'none'}}></ion-icon>
                </div>

                <a hrel = "#" className = "filter-opt mobile" id = "filterOpt-all-mb" style = {{display: mobileFilter === true ? 'flex' : 'none',
                backgroundColor: filter_all === true? 'lightgray' : '' }} onClick={selectFilterAll}>
                    <div className="filter-opt-visual">
                        <ion-icon name="albums"></ion-icon>
                        <p className = "filter-opt-text">All</p>
                    </div>
                    <p className = "filter-opt-count">
                        { 
                            (resources.news ? resources.news.length : 0) +
                            (resources.article ? resources.article.length : 0) +
                            (resources.video ? resources.video.length : 0)
                        }
                    </p>
                </a>

                <a hrel = "#" className = "filter-opt mobile" id = "filterOpt-article-mb" style = {{display: mobileFilter === true ? 'flex' : 'none',
                backgroundColor: filter_article === true? 'lightgray' : ''  }} onClick={selectFilterArticle}>
                    <div className="filter-opt-visual">
                        <ion-icon name="newspaper"></ion-icon>
                        <p className = "filter-opt-text">Articles</p>
                    </div>
                    <p className = "filter-opt-count">{resources.article ? resources.article.length : 0}</p>
                </a>

                <a hrel = "#" className = "filter-opt mobile" id = "filterOpt-news-mb" style = {{display: mobileFilter === true ? 'flex' : 'none',
                backgroundColor: filter_news === true? 'lightgray' : ''  }} onClick={selectFilterNews}>
                    <div className="filter-opt-visual">
                        <ion-icon name="globe"></ion-icon>
                        <p className = "filter-opt-text">News</p>
                    </div>
                    <p className = "filter-opt-count">{resources.news ? resources.news.length : 0}</p>
                </a>

                <a hrel = "#" className = "filter-opt mobile" id = "filterOpt-video-mb" style = {{display: mobileFilter === true ? 'flex' : 'none',
                backgroundColor: filter_video === true? 'lightgray' : ''  }} onClick={selectFilterVideo}>
                    <div className="filter-opt-visual">
                        <ion-icon name="videocam"></ion-icon>
                        <p className = "filter-opt-text">Videos</p>
                    </div>
                    <p className = "filter-opt-count">{resources.video ? resources.video.length : 0}</p>
                </a>

                {/* <!--desktop filter options--> */}

                <a hrel = "#" className = "filter-opt" id = "filterOpt-all" onClick={selectFilterAll} 
                style={{backgroundColor: filter_all === true? 'lightgray' : ''}}>
                    <div className="filter-opt-visual">
                        <ion-icon name="albums"></ion-icon>
                        <p className = "filter-opt-text">All</p>
                    </div>
                    <p className = "filter-opt-count">
                        { 
                            (resources.news ? resources.news.length : 0) +
                            (resources.article ? resources.article.length : 0) +
                            (resources.video ? resources.video.length : 0)
                        }
                    </p>
                </a>
                <a hrel = "#" className = "filter-opt" id = "filterOpt-article" onClick={selectFilterArticle}
                style={{backgroundColor: filter_article === true? 'lightgray' : ''}}>
                    <div className="filter-opt-visual">
                        <ion-icon name="newspaper"></ion-icon>
                        <p className = "filter-opt-text">Articles</p>
                    </div>
                    <p className = "filter-opt-count">{resources.article ? resources.article.length : 0}</p>
                    
                </a>
                <a hrel = "#" className = "filter-opt" id = "filterOpt-news" onClick={selectFilterNews}
                style={{backgroundColor: filter_news === true? 'lightgray' : ''}}>
                    <div className="filter-opt-visual">
                        <ion-icon name="globe"></ion-icon>
                        <p className = "filter-opt-text">News</p>
                    </div>
                    <p className = "filter-opt-count">{resources.news ? resources.news.length : 0}</p>
                </a>
                <a hrel = "#" className = "filter-opt" id = "filterOpt-video" onClick={selectFilterVideo}
                style={{backgroundColor: filter_video === true? 'lightgray' : ''}}>
                    <div className="filter-opt-visual">
                        <ion-icon name="videocam"></ion-icon>
                        <p className = "filter-opt-text">Videos</p>
                    </div>
                    <p className = "filter-opt-count">{resources.video ? resources.video.length : 0}</p>
                </a>

                {/* <!--script for filter options--> */}

            </div>

            {/* <!--results/ list of results--> */}

            <div className="result-container">
                {resources.news && resources.news.map((resource, index) => (
                    <div key={index} className="result-wrapper" style={{display: searchQuery ? 'none' : filter_news ? 'flex' : filter_all ? 'flex' : 'none'}}>
                        <div className="result-img">
                            <img src={`http://127.0.0.1:8000/${resource.image}`} alt={`Image for ${resource.title}`} />
                        </div>
                        <div className="result-info">
                            <h3>{resource.title}</h3>
                            <p className="result-type">{resource.resource_type}</p>
                            <p className="result-text">{resource.description}</p>
                            <a href={resource.link} target="_blank" className="button">Let's go</a>
                        </div>
                    </div>
                ))}
                {resources.article && resources.article.map((resource, index) => (
                    <div key={index} className="result-wrapper" style={{display: searchQuery ? 'none' : filter_article ? 'flex' : filter_all ? 'flex' : 'none'}}>
                        <div className="result-img">
                            <img src={`http://127.0.0.1:8000/${resource.image}`} alt={`Image for ${resource.title}`} />
                        </div>
                        <div className="result-info">
                            <h3>{resource.title}</h3>
                            <p className="result-type">{resource.resource_type}</p>
                            <p className="result-text">{resource.description}</p>
                            <a href={resource.link} target="_blank" className="button">Let's go</a>
                        </div>
                    </div>
                ))}
                {resources.video && resources.video.map((resource, index) => (
                    <div key={index} className="result-wrapper" style={{display: searchQuery ? 'none' : filter_video ? 'flex' : filter_all ? 'flex' : 'none'}}>
                        <div className="result-img">
                            <img src={`http://127.0.0.1:8000/${resource.image}`} alt={`Image for ${resource.title}`} />
                        </div>
                        <div className="result-info">
                            <h3>{resource.title}</h3>
                            <p className="result-type">{resource.resource_type}</p>
                            <p className="result-text">{resource.description}</p>
                            <a href={resource.link} target="_blank" className="button">Let's go</a>
                        </div>
                    </div>
                ))}
                {filteredNews.map((resource, index) => (
                    <div key={index} className="result-wrapper" style={{display: searchQuery ? 'flex' : 'none'}}>
                    <div className="result-img">
                        <img src={`http://127.0.0.1:8000/${resource.image}`} alt={`Image for ${resource.title}`} />
                    </div>
                    <div className="result-info">
                        <h3>{resource.title}</h3>
                        <p className="result-type">{resource.resource_type}</p>
                        <p className="result-text">{resource.description}</p>
                        <a href={resource.link} target="_blank" className="button">Let's go</a>
                    </div>
                </div>
                ))}
                {filteredArticles.map((resource, index) => (
                    <div key={index} className="result-wrapper" style={{display: searchQuery ? 'flex' : 'none'}}>
                    <div className="result-img">
                        <img src={`http://127.0.0.1:8000/${resource.image}`} alt={`Image for ${resource.title}`} />
                    </div>
                    <div className="result-info">
                        <h3>{resource.title}</h3>
                        <p className="result-type">{resource.resource_type}</p>
                        <p className="result-text">{resource.description}</p>
                        <a href={resource.link} target="_blank" className="button">Let's go</a>
                    </div>
                </div>
                ))}
                {filteredVideos.map((resource, index) => (
                    <div key={index} className="result-wrapper" style={{display: searchQuery ? 'flex' : 'none'}}>
                    <div className="result-img">
                        <img src={`http://127.0.0.1:8000/${resource.image}`} alt={`Image for ${resource.title}`} />
                    </div>
                    <div className="result-info">
                        <h3>{resource.title}</h3>
                        <p className="result-type">{resource.resource_type}</p>
                        <p className="result-text">{resource.description}</p>
                        <a href={resource.link} target="_blank" className="button">Let's go</a>
                    </div>
                </div>
                ))}
            </div>

        </div>
    </div>
        </div>
    );
}