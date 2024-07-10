import React, { useState, useEffect } from 'react';
import ArticleStorage from '../contracts/ArticleStorage.json'
import { useNavigate } from 'react-router-dom';
import { HeroParallax } from '../components/ui/hero-parallax';
const { ethers } = require("ethers");

const contractAddress = '0xd28143c814b7a7ca990e18c07be5d5912b8f2aaf';
const contractABI = ArticleStorage.abi;
// Importing components


export default function Home({ account, setAccount }) {
    const navigate = useNavigate();
    const [newsFeed, setNewsFeed] = useState([
        // {
        //     index: 1,
        //     category: "general",
        //     title: "Moonbeam",
        //     thumbnail:
        //         "./HomeImage/gomoonbeam.png",
        // }
    ]);

    const handleArticleClicked = async (contentId, category) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const articleStorage = new ethers.Contract(contractAddress, contractABI, provider);
        let result;
        if (category === "general") {
            result = await articleStorage.getGeneralOpt(account);
        } else {
            result = await articleStorage.getStockOpt(account);
        }

        const isPurchased = result.some(content => content.toNumber() === contentId);

        if (isPurchased) {
            navigate(`/newsFeed/${category}/${contentId}`);
            return;
        } else {
            // Retrieve the article details to get the price
            const articleStorage2 = new ethers.Contract(contractAddress, contractABI, signer);
            let article;
            if (category === "general") {
                article = await articleStorage.getGeneralArticle(contentId);
            } else {
                article = await articleStorage.getStockArticle(contentId);
            }
            const price = ethers.BigNumber.from(article[6]);

            // Pay for the article
            try {
                let tx;
                if (category === "general") {
                    tx = await articleStorage2.payForGeneralArticle(contentId, { value: price });
                } else {
                    tx = await articleStorage2.payForStockArticle(contentId, { value: price });
                }
                console.log('Transaction sent:', tx);
                const receipt = await tx.wait();
                console.log('Transaction mined:', receipt);
                navigate(`/newsFeed/${category}/${contentId}`);
            }
            catch (error) {
                console.error("Payment failed:", error);
                // Optionally, handle payment failure (e.g., show a notification)
            }
        }
    }
    // To fetch the top fifteen news feeds only
    useEffect(() => {
        const fetchNewsFeed = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                const articleStorage = new ethers.Contract(contractAddress, contractABI, provider);
                console.log("start");
                // Fetch stock articles
                const stockArticles = await articleStorage.getAllStockArticles();
                const formattedStockArticles = stockArticles.map(article => ({
                    contentId: article.index.toNumber(), // Convert BigNumber to number
                    title: 'title', // Replace with actual title extraction logic
                    category: 'stocks',
                    tags: article.tags,
                    visibleWords: article.visibleWords.toNumber(), // Convert BigNumber to number
                    price: ethers.utils.formatUnits(article.price, 'wei'), // Convert BigNumber to string in ether
                    publishedDate: new Date(article.dateUploaded.toNumber() * 1000), // Convert BigNumber to number and then to Date
                    article: article.content,
                    startDate: new Date(article.startDate.toNumber() * 1000), // Convert BigNumber to number and then to Date
                    endDate: new Date(article.endDate.toNumber() * 1000), // Convert BigNumber to number and then to Date
                    userRating: article.userRating.toNumber(), // Convert BigNumber to number
                    aiRating: article.aiRating.toNumber(), // Convert BigNumber to number
                    bgImg: article.image
                }));

                // Fetch general articles
                const generalArticles = await articleStorage.getAllGeneralArticles();
                const formattedGeneralArticles = generalArticles.map((article) => ({
                    contentId: article.index.toNumber(),
                    title: 'title', // Example title extraction
                    category: 'general',
                    tags: article.tags,
                    visibleWords: article.visibleWords.toNumber(),
                    price: ethers.utils.formatUnits(article.price, 'wei'),
                    publishedDate: new Date(article.dateUploaded.toNumber() * 1000),
                    article: article.content,
                    location: {
                        lat: article.latitude.div(1e6).toNumber(),
                        long: article.longitude.div(1e6).toNumber()
                    },
                    userRating: article.userRating.toNumber(),
                    aiRating: article.aiRating.toNumber(),
                    bgImg: article.image
                }));

                // Sort by userRating and take top 6 from each category
                const topStockArticles = formattedStockArticles
                    .sort((a, b) => b.userRating - a.userRating)
                    .slice(0, 6);

                const topGeneralArticles = formattedGeneralArticles
                    .sort((a, b) => b.userRating - a.userRating)
                    .slice(0, 6);

                // Combine and format for newsFeed state
                const combinedFeed = [
                    ...topStockArticles.map(article => ({
                        index: article.contentId,
                        category: article.category,
                        title: article.title,
                        thumbnail: article.bgImg,
                    })),
                    ...topGeneralArticles.map(article => ({
                        index: article.contentId,
                        category: article.category,
                        title: article.title,
                        thumbnail: article.bgImg,
                    }))
                ];

                setNewsFeed(combinedFeed);
            }
            catch (error) {
                console.error("Failed to fetch news feed:", error);
            }
        }

        fetchNewsFeed();
    }, [])

    return (
        <main className='text-black bg-white dark:text-white dark:bg-black mt-2'>
            <HeroParallax
                handleArticleClicked={handleArticleClicked}
                products={newsFeed}
                headingPara='A decentralized news feed platform to keep you updated with the latest news and trends
                            of general world as well as finance. Here you can find the latest general and country
                            news at the first with a very low cost. You can also get the stock predictions and related
                            news, not only in articles but also in videos.'
                headingTitle1='Welcome to the'
                headingTitle2='World of ChainSphere'
                headingHighlight="Navigate to 'Feed' to get started."
            />
        </main>
    );
}