import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set your root element for accessibility

export default function Profile({ account }) {
    const [user, setUser] = useState({
        userAdd: '0X0868hf98gh57gyguki789',
        backImg: '',
        profileIcon: '',
        aboutMe: 'An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.',
        btcSpent: 0.02,
        btcGained: 0.05,
        totalTransaction: 36,
        userTag: 'Web Developer'
    });
    const [boughtNews, setBoughtNews] = useState([]);
    const [publishedNews, setPublishedNews] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({ ...user });
    const { userAdd } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            // Fetch user data from an API
            navigate(`/profile/${userAdd}`)
        };

        const fetchNews = async () => {
            // Fetch news data from an API
            // Sample data for demonstration
            setBoughtNews([
                {
                    contentId: 1,
                    title: 'Ethereum Price',
                    category: 'stocks',
                    tags: ['stocks', 'price', 'ethereum'],
                    visibleWords: 20,
                    price: 1e18,
                    publishedDate: new Date(),
                    article: 'Ethereum price is currently at $2000. It is expected to rise to $2500 by the end of the month. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    startDate: new Date(),
                    endDate: new Date(),
                    userRating: 8,
                    aiRating: 6.2,
                    bgImg: ''
                }, {
                    contentId: 2,
                    title: 'Bitcoin Price',
                    category: 'stocks',
                    tags: ['stocks', 'price', 'bitcoin'],
                    visibleWords: 16,
                    price: 1e17,
                    publishedDate: new Date(),
                    article: 'Bitcoin price is currently at $50000. It is expected to rise to $60000 by the end of the month. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    startDate: new Date(),
                    endDate: new Date(),
                    userRating: 5,
                    aiRating: 6,
                    bgImg: ''
                }
            ]);
            setPublishedNews([
                {
                    contentId: 3,
                    title: 'Clashes in Manipur',
                    category: 'general',
                    tags: ['general', 'politics', 'india', 'manipur', 'clashes', 'news'],
                    visibleWords: 25,
                    price: 1e16,
                    publishedDate: new Date(),
                    article: 'Clashes in Manipur are there from past three months. Up to now nearly 200+ people died. Till long time there was no action from the side of the central government. The whole Manipur is burning in fires. Some opposition leaders went but still now resolution can be seen. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    location: {
                        lat: 24.817011,
                        long: 93.936844
                    },
                    userRating: 3,
                    aiRating: 9,
                    bgImg: ''
                }, {
                    contentId: 4,
                    title: 'Stock Market Crash',
                    category: 'stocks',
                    tags: ['stocks', 'price', 'stock market', 'crash', 'news'],
                    visibleWords: 15,
                    price: 1e17,
                    publishedDate: new Date(),
                    article: 'Stock market crashed today. The SENSEX fell by 1000 points. The NIFTY fell by 300 points. The stock market is expected to recover in the next week. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    startDate: new Date(),
                    endDate: new Date(),
                    userRating: 9.4,
                    aiRating: 7.1,
                    bgImg: ''
                }
            ]);
        };

        fetchUser();
        fetchNews();
    }, [userAdd]);

    const handleEditClick = () => {
        setFormData({ ...user });
        setIsEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: URL.createObjectURL(files[0]) }));
    };

    const handleSave = () => {
        setUser(formData);
        setIsEditModalOpen(false);
    };

    return (
        <main className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center mt-[4rem] mb-20">
            <div className="w-full bg-cover bg-center h-64 relative" style={{ backgroundImage: `url(${user.backImg ? user.backImg : '/profileBg.jpg'})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <img
                        src={user.profileIcon ? user.profileIcon : 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="rounded-full border-4 border-white dark:border-gray-800 w-24 h-24"
                    />
                    <h1 className="text-white text-2xl mt-2">{user.userAdd}</h1>
                    <p className="text-white">{user.userTag}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 w-full max-w-4xl mx-auto p-6 mt-8 shadow-lg rounded-lg">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
                    onClick={handleEditClick}
                >
                    Edit Profile
                </button>
                <div className="flex justify-around text-center mt-4">
                    <div>
                        <span className="block text-gray-700 dark:text-gray-300 text-2xl font-bold">{user.btcGained}</span>
                        <span className="block text-gray-500 dark:text-gray-400">BTC Gained</span>
                    </div>
                    <div>
                        <span className="block text-gray-700 dark:text-gray-300 text-2xl font-bold">{user.totalTransaction}</span>
                        <span className="block text-gray-500 dark:text-gray-400">Transactions</span>
                    </div>
                    <div>
                        <span className="block text-gray-700 dark:text-gray-300 text-2xl font-bold">{user.btcSpent}</span>
                        <span className="block text-gray-500 dark:text-gray-400">BTC Spent</span>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-gray-700 dark:text-gray-300 text-xl font-bold">About me</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {user.aboutMe}
                    </p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 w-full max-w-4xl mx-auto p-6 mt-8 shadow-lg rounded-lg">
                <div className="flex justify-between">
                    <div className="w-1/2 pr-4">
                        <h2 className="text-gray-700 dark:text-gray-300 text-xl font-bold mb-4">Bought News</h2>
                        {boughtNews.length > 0 ? (
                            boughtNews.map(news => (
                                <Link to={`/newsFeed/${news.contentId}`} key={news.contentId} className="block mb-4 p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <h3 className="text-gray-700 dark:text-gray-300 text-lg font-bold">{news.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 truncate">{news.article.split(' ').slice(0, news.visibleWords).join(' ')}...</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No bought news articles.</p>
                        )}
                    </div>
                    <div className="w-1/2 pl-4">
                        <h2 className="text-gray-700 dark:text-gray-300 text-xl font-bold mb-4">Published News</h2>
                        {publishedNews.length > 0 ? (
                            publishedNews.map(news => (
                                <Link to={`/newsFeed/${news.contentId}`} key={news.contentId} className="block mb-4 p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <h3 className="text-gray-700 dark:text-gray-300 text-lg font-bold">{news.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 truncate">{news.article.split(' ').slice(0, news.visibleWords).join(' ')}...</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No published news articles.</p>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                className="bg-white dark:bg-gray-800 max-w-lg w-full mx-auto mt-16 p-6 rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-gray-700 dark:text-gray-300 text-xl font-bold mb-4">Edit Profile</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">User Tag</label>
                        <input
                            type="text"
                            name="userTag"
                            value={formData.userTag}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">About Me</label>
                        <textarea
                            name="aboutMe"
                            value={formData.aboutMe}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Profile Icon</label>
                        <input
                            type="file"
                            name="profileIcon"
                            onChange={handleImageChange}
                            className="w-full p-2 mt-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300">Background Image</label>
                        <input
                            type="file"
                            name="backImg"
                            onChange={handleImageChange}
                            className="w-full p-2 mt-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </main>
    );
}