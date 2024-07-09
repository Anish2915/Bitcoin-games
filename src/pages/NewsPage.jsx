import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function NewsPage() {
    const { category, feedId } = useParams();
    const [feed, setFeed] = useState({
        contentId: 4,
        title: 'Stock Market Crash',
        category: 'stocks',
        tags: ['stocks', 'price', 'stock market', 'crash', 'news'],
        visibleWords: 15,
        price: 1e17,
        publishedDate: '07-07-2024',
        article: 'Stock market crashed today. The SENSEX fell by 1000 points. The NIFTY fell by 300 points. The stock market is expected to recover in the next week. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        startDate: '09-07-2024',
        endDate: '15-07-2024',
        userRating: 9.4,
        aiRating: 7.1,
        bgImg: ''
    });

    const handleRatingChange = (e) => {
        setFeed({ ...feed, userRating: parseFloat(e.target.value) })
        // Set the rating here in the backend
    }

    // useEffect(() => {
    //     const fetchFeed = async () => {
    //         // Fetch the particular news feed from here from the backend
    //     }

    //     fetchFeed();
    // }, [])

    return (
        <main className="text-black bg-white dark:text-white dark:bg-black mt-24 min-h-screen">
            <div className="w-[70%] mx-auto shadow-lg p-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center">
                <div className="w-full mb-8">
                    <img
                        src={feed.bgImg !== '' ? feed.bgImg : (feed.category === 'stocks' ? '/pageBackground/cryptoBg.png' : '/pageBackground/generalBg.jpg')}
                        alt="News Feed"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="w-full text-center">
                    <h1 className="text-3xl font-bold mb-4">{feed.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{feed.publishedDate.toString()}</p>
                    <div className="flex flex-col flex-wrap justify-center items-center gap-2 mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Rate this Article:</h2>
                        <div className="flex items-center w-[20em]">
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.1"
                                value={feed.userRating}
                                onChange={handleRatingChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-gray-900 dark:text-gray-100">{feed.userRating}</span>
                        </div>
                    </div>

                    {feed.category === 'stocks' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="font-semibold">Start Date of Prediction:</p>
                                <p>{feed.startDate.toString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold">End Date of Prediction:</p>
                                <p>{feed.endDate.toString()}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Feed Location:</h2>
                            <p className="leading-relaxed">{feed.locationAdd}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="font-semibold">User Rating:</p>
                            <p>{feed.userRating}</p>
                        </div>
                        <div>
                            <p className="font-semibold">AI Rating:</p>
                            <p>{feed.aiRating}</p>
                        </div>
                    </div>
                    <p className="leading-relaxed">{feed.article}</p>
                </div>
            </div>
        </main>
    );
}