import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import ArticleStorage from '../contracts/ArticleStorage.json'
const { ethers } = require("ethers");

const contractAddress = '0xd28143c814b7a7ca990e18c07be5d5912b8f2aaf';
const contractABI = ArticleStorage.abi;

export default function NewsPage({ account, setAccount }) {
    const navigate = useNavigate();
    const { category, feedId } = useParams();
    const [feed, setFeed] = useState({
        contentId: null,
        title: '',
        category: '',
        tags: [],
        visibleWords: 0,
        price: 0,
        publishedDate: '',
        article: '',
        startDate: '',
        endDate: '',
        userRating: 0,
        aiRating: 0,
        bgImg: ''
    });

    const handleRatingSubmit = async () => {
        const indvar = 1;
        const ratingVar = 5;
        const category = "general";
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const articleStorage = new ethers.Contract(contractAddress, contractABI, signer);
            if (category === "general") {
                await articleStorage.setGeneralUserRating(indvar, ratingVar);
            }
            else {
                await articleStorage.setStockUserRating(indvar, ratingVar);
            }
        }
        catch (error) {
            console.error('Error setting user rating:', error);
        }
    }

    const handleRatingChange = (e) => {
        setFeed({ ...feed, userRating: parseFloat(e.target.value) })
        // Set the rating here in the backend
    }

    useEffect(() => {
        const fetchFeed = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            //const signer = provider.getSigner();
            const articleStorage = new ethers.Contract(contractAddress, contractABI, provider);
            let result;
            if (category === "general") {
                result = await articleStorage.getGeneralOpt(account);
            } else {
                result = await articleStorage.getStockOpt(account);
            }

            const isPurchased = result.some(content => content.toNumber() === feedId);
            if (!isPurchased) {
                navigate(`/newsFeed`);
                // const articleStorage2 = new ethers.Contract(contractAddress, contractABI, signer);
                // let article;
                // if (category === "general") {
                //     article = await articleStorage.getGeneralArticle(feedId);
                // } else {
                //     article = await articleStorage.getStockArticle(feedId);
                // }
                // const price = ethers.BigNumber.from(article[6]);

                // // Pay for the article
                // try {
                //     let tx;
                //     if (category === "general") {
                //         tx = await articleStorage2.payForGeneralArticle(feedId, { value: price });
                //     } else {
                //         tx = await articleStorage2.payForStockArticle(feedId, { value: price });
                //     }
                //     console.log('Transaction sent:', tx);
                //     const receipt = await tx.wait();
                //     console.log('Transaction mined:', receipt);
                //     //navigate(`/newsFeed/${category}/${feedId}`);
                // }
                // catch (error) {
                //     console.error("Payment failed:", error);
                //     // Optionally, handle payment failure (e.g., show a notification)
                // }
            }
            else {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    //const signer = provider.getSigner();
                    const articleStorage = new ethers.Contract(contractAddress, contractABI, provider);
                    console.log(feedId);

                    let article;
                    if (category === 'general') {
                        console.log(category, 'this general');
                        article = await articleStorage.getGeneralArticle(feedId);
                        console.log(article);
                    } else {
                        console.log(category, 'this stock');
                        article = await articleStorage.getStockArticle(feedId);
                        console.log(article);
                    }

                    // Assuming the article data returned from the contract matches the state structure
                    if (category === 'general') {
                        const fetchedFeed = {
                            contentId: article[0].toNumber(),
                            title: 'title', // Example title extraction
                            category: 'general',
                            tags: article[2],
                            visibleWords: article[5].toNumber(),
                            price: ethers.utils.formatUnits(article[6], 'wei'),
                            publishedDate: new Date(article[7].toNumber() * 1000),
                            article: article[4],
                            // location: {
                            //     lat: article.latitude.div(1e6).toNumber(),
                            //     long: article.longitude.div(1e6).toNumber()
                            // },
                            userRating: article[9].toNumber(),
                            aiRating: article[8].toNumber(),
                            bgImg: article[3]
                        };
                        console.log(fetchedFeed);
                        setFeed(fetchedFeed);
                    }
                    else {
                        const fetchedFeed = {
                            contentId: article[0].toNumber(), // Convert BigNumber to number
                            title: 'title', // Replace with actual title extraction logic
                            category: 'stocks',
                            tags: article[2],
                            visibleWords: article[5].toNumber(), // Convert BigNumber to number
                            price: ethers.utils.formatUnits(article[6], 'wei'), // Convert BigNumber to string in ether
                            publishedDate: new Date(article[7].toNumber() * 1000), // Convert BigNumber to number and then to Date
                            article: article[4],
                            startDate: new Date(article[10].toNumber() * 1000), // Convert BigNumber to number and then to Date
                            endDate: new Date(article[11].toNumber() * 1000), // Convert BigNumber to number and then to Date
                            userRating: article[9].toNumber(), // Convert BigNumber to number
                            aiRating: article[8].toNumber(), // Convert BigNumber to number
                            bgImg: article[3]
                        };
                        console.log(fetchedFeed);
                        setFeed(fetchedFeed);
                    }
                } catch (error) {
                    console.error("Failed to fetch article:", error);
                }
            }
        };

        fetchFeed();
    }, [feedId, category]);

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