import React, { useState, useEffect } from "react";
import "./Resources.css";

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const TOPICS = [
  "meditation",
  "mental wellbeing",
  "yoga",
  "mindfulness",
  "relax",
];
const RESULTS_PER_PAGE = 12;

const Resources = () => {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const allVideos = [];
      const allArticles = [];
      console.log("YouTube API Key:", process.env.REACT_APP_YOUTUBE_API_KEY);
      console.log("News API Key:", process.env.REACT_APP_NEWS_API_KEY);
      // Fetch videos and articles for each topic
      const videoPromises = TOPICS.map((topic) =>
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${RESULTS_PER_PAGE}&q=${topic}&type=video&videoDuration=any&order=viewCount&key=${YOUTUBE_API_KEY}`
        ).then((response) => response.json())
      );

      const articlePromises = TOPICS.map((topic) =>
        fetch(
          `https://newsapi.org/v2/everything?q=${topic}&apiKey=${NEWS_API_KEY}&pageSize=100&language=en&sortBy=relevancy`
        ).then((response) => response.json())
      );

      const videoResponses = await Promise.all(videoPromises);
      const articleResponses = await Promise.all(articlePromises);

      console.log("Video responses:", videoResponses); // Debug log
      console.log("Article responses:", articleResponses); // Debug log

      videoResponses.forEach((videoData) => {
        if (videoData.items && Array.isArray(videoData.items)) {
          allVideos.push(...videoData.items);
        } else {
          console.warn(
            "No items found in video response or invalid format:",
            videoData
          );
        }
      });

      articleResponses.forEach((articleData, index) => {
        if (articleData && Array.isArray(articleData.articles)) {
          const topic = TOPICS[index];
          const topicArticles = articleData.articles.filter(
            (article) =>
              article.urlToImage &&
              (article.title.toLowerCase().includes(topic) ||
                article.description.toLowerCase().includes(topic)) &&
              !isAdContent(article)
          );
          allArticles.push(...topicArticles);
        } else {
          console.warn(
            `No articles found or invalid format for topic: ${TOPICS[index]}`,
            articleData
          );
        }
      });

      const uniqueArticles = Array.from(
        new Set(allArticles.map((a) => a.url))
      ).map((url) => allArticles.find((a) => a.url === url));

      const randomArticles = getRandomArticles(
        uniqueArticles,
        RESULTS_PER_PAGE
      );
      const randomVideos = getRandomVideos(allVideos, RESULTS_PER_PAGE);

      setVideos(randomVideos);
      setArticles(randomArticles);

      console.log("Videos state:", randomVideos); // Debug log
      console.log("Articles state:", randomArticles); // Debug log
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const isAdContent = (article) => {
    const adKeywords = [
      "ad",
      "sponsored",
      "promotion",
      "laptop",
      "shop",
      "deal",
      "mobile",
      "price",
      "amazon",
      "retail",
      "lenovo",
    ];
    const lowerTitle = article.title.toLowerCase();
    const lowerDescription = article.description.toLowerCase();
    return adKeywords.some(
      (keyword) =>
        lowerTitle.includes(keyword) || lowerDescription.includes(keyword)
    );
  };

  const getRandomArticles = (articles, count) => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getRandomVideos = (videos, count) => {
    const shuffled = [...videos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <p>Error loading resources: {error.message}</p>;
  }

  return (
    <div className="resources">
      <button className="refresh" onClick={fetchResources}>
        Refresh Resources
      </button>
      <h2>YouTube Videos</h2>
      <div className="resource-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id.videoId} className="resource-item">
              <h3>{video.snippet.title}</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.snippet.title}
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
      <h2>News Articles</h2>
      <div className="resource-grid">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="resource-item"
              onClick={() => window.open(article.url, "_blank")}
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="resource-image"
              />
              <div className="resource-content">
                <h3 className="resource-title">{article.title}</h3>
                <p className="resource-description">{article.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No articles available</p>
        )}
      </div>
    </div>
  );
};

export default Resources;
