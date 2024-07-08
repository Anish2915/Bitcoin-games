import React, { useState, useEffect } from 'react';

// Importing components
import { HeroParallax } from '../components/ui/hero-parallax';


export default function Home() {
    const [newsFeed, setNewsFeed] = useState([
        {
            title: "Moonbeam",
            link: "https://gomoonbeam.com",
            thumbnail:
                "./HomeImage/gomoonbeam.png",
        },
        {
            title: "Cursor",
            link: "https://cursor.so",
            thumbnail:
                "./HomeImage/cursor.png",
        },
        {
            title: "Rogue",
            link: "https://userogue.com",
            thumbnail:
                "./HomeImage/userogue.png",
        },
        {
            title: "Editorially",
            link: "https://editorially.org",
            thumbnail:
                "./HomeImage/editorially.png",
        },
        {
            title: "Editrix AI",
            link: "https://editrix.ai",
            thumbnail:
                "./HomeImage/editrix.png",
        },
        {
            title: "Pixel Perfect",
            link: "https://app.pixelperfect.quest",
            thumbnail:
                "./HomeImage/pixelperfect.png",
        },
        {
            title: "Algochurn",
            link: "https://algochurn.com",
            thumbnail:
                "./HomeImage/algochurn.png",
        },
        {
            title: "Aceternity UI",
            link: "https://ui.aceternity.com",
            thumbnail:
                "./HomeImage/aceternity.png",
        },
        {
            title: "Tailwind Master Kit",
            link: "https://tailwindmasterkit.com",
            thumbnail:
                "./HomeImage/tailwindmasterkit.png",
        },
        {
            title: "SmartBridge",
            link: "https://smartbridgetech.com",
            thumbnail:
                "./HomeImage/smartbridgetech.png",
        },
        {
            title: "Renderwork Studio",
            link: "https://renderwork.studio",
            thumbnail:
                "./HomeImage/renderwork.png",
        },
        {
            title: "Creme Digital",
            link: "https://cremedigital.com",
            thumbnail:
                "./HomeImage/cremedigital.png",
        },
        {
            title: "Golden Bells Academy",
            link: "https://goldenbellsacademy.com",
            thumbnail:
                "./HomeImage/goldenbellsacademy.png",
        },
        {
            title: "Invoker Labs",
            link: "https://invoker.lol",
            thumbnail:
                "./HomeImage/invoker.png",
        },
        {
            title: "E Free Invoice",
            link: "https://efreeinvoice.com",
            thumbnail:
                "./HomeImage/efreeinvoice.png",
        },
    ]);

    // To fetch the top fifteen news feeds only
    // useEffect(() => {
    //     const fetchNewsFeed = async () => {
    //         console.log('Fetching news feed!');
    //     }

    //     fetchNewsFeed();
    // }, [])

    return (
        <main className='text-black bg-white dark:text-white dark:bg-black mt-2'>
            <HeroParallax
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