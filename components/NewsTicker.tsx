import React, { useState, useEffect } from 'react';
import { getNews, DbNewsArticle } from '../services/db';

const NewsTicker: React.FC = () => {
  const [latestNews, setLatestNews] = useState<DbNewsArticle | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const articles = await getNews(1); // Fetch only the latest article
        if (articles.length > 0) {
          const latest = articles[0];
          setLatestNews(latest);
          const dismissed = sessionStorage.getItem(`news-dismissed-${latest.id}`);
          if (!dismissed) {
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch news for ticker from db", error);
      }
    };

    fetchLatestNews();
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (latestNews) {
      sessionStorage.setItem(`news-dismissed-${latestNews.id}`, 'true');
    }
  };

  if (!isVisible || !latestNews) {
    return null;
  }
  
  const truncatedContent = latestNews.content.length > 150 
    ? latestNews.content.slice(0, 150) + '...' 
    : latestNews.content;

  return (
    <div className="bg-brand-blue-dark text-white p-2 text-center text-sm relative">
      <p>
        <span className="font-bold mr-2">{latestNews.title}:</span>
        {truncatedContent}
      </p>
      <button
        onClick={handleDismiss}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-gray-300"
        aria-label="Dismiss news"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default NewsTicker;