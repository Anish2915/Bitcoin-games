import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';

// Importing components
import ModalPopup from '../components/ModalPopup';
import LocationPicker from '../components/LocationPicker';

// Impoting ui components
import Meteors from '../components/ui/Meteors';

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best User Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Best AI Rating', href: '#', current: false },
]

const filters = [
    {
        id: 'locRadius',
        name: 'Location Radius',
        options: [
            { value: '50km', label: '50 km', checked: false },
            { value: '100km', label: '100 km', checked: false },
            { value: '250km', label: '250 km', checked: true },
            { value: '500km', label: '500 km', checked: false },
            { value: '1000km', label: '1000 km', checked: false },
            { value: 'more1000km', label: 'More than 100 km', checked: false },
        ],
    },
    {
        id: 'wordLimit',
        name: 'Word Limit',
        options: [
            { value: 'less100', label: 'Less than 100 words', checked: false },
            { value: '100to500', label: '100 to 500 words', checked: false },
            { value: '500to1000', label: '500 to 1000 words', checked: true },
            { value: '1000to2000', label: '1000 to 2000 words', checked: false },
            { value: '2000to5000', label: '2000 to 5000 words', checked: false },
            { value: 'more5000', label: 'More than 5000 words', checked: false },
        ],
    },
    {
        id: 'priceRange',
        name: 'Price Range',
        options: [
            { value: 'less0.1', label: 'Less than 0.1 ETH', checked: true },
            { value: '0.1to0.25', label: '0.1 to 0.25 ETH', checked: false },
            { value: '0.25to0.5', label: '0.25 to 0.5 ETH', checked: false },
            { value: '0.5to0.75', label: '0.5 to 0.75 ETH', checked: false },
            { value: '0.75to1', label: '0.75 to 1 ETH', checked: false },
            { value: 'more1', label: 'More than 1 ETH', checked: false },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Explore() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [position, setPosition] = useState(null);
    const [newsFeed, setNewsFeed] = useState([]); // Initialize state for news feed
    const [filteredNewsFeed, setFilteredNewsFeed] = useState([]); // State for filtered news feed
    const [selectedFilters, setSelectedFilters] = useState({
        locRadius: [],
        wordLimit: [],
        priceRange: []
    });
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
        setFilteredNewsFeed(
            filteredNewsFeed.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
        );
    }

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const clearLocation = () => {
        setPosition(null);
    };

    useEffect(() => {
        // Fetch the news feed from the blockend and keep it inside the variable fetchedNewsFeed
        const fetchedNewsFeed = [];
        setNewsFeed(fetchedNewsFeed);
    }, []);

    // Handle filter change
    const handleFilterChange = (filterCategory, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[filterCategory].includes(value)) {
                updatedFilters[filterCategory] = updatedFilters[filterCategory].filter((item) => item !== value);
            } else {
                updatedFilters[filterCategory].push(value);
            }
            return updatedFilters;
        });
    };

    // Apply filters to the news feed
    useEffect(() => {
        const applyFilters = () => {
            let filtered = newsFeed;
            
            // Apply position filter
            if (position) {
                // Position filter
            }

            // Apply location radius filter
            if (selectedFilters.locRadius.length > 0) {
                // Location Radius filter
            }

            // Apply word limit filter
            if (selectedFilters.wordLimit.length > 0) {
                // Word limit filter
            }

            // Apply price range filter
            if (selectedFilters.priceRange.length > 0) {
                // Price range filter
            }

            setFilteredNewsFeed(filtered);
        };

        applyFilters();
    }, [selectedFilters, newsFeed]);

    return (
        <div className="bg-white dark:bg-black">
            <div>
                {/* Mobile filter dialog */}
                <Dialog className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white dark:bg-gray-800 py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-gray-700 p-2 text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200 dark:border-gray-600">
                                <h3 className="sr-only">Location</h3>
                                <button
                                    className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gradient-to-l"
                                    onClick={openModal}
                                >
                                    Open Location Picker
                                </button>
                                <ModalPopup isOpen={isModalOpen} onRequestClose={closeModal} title="Select the search location">
                                    <LocationPicker position={position} setPosition={setPosition} clearLocation={clearLocation} />
                                </ModalPopup>
                                {position && (
                                    <div className="mt-4 p-4 bg-white dark:bg-gray-700 shadow-md rounded-md">
                                        <p className="text-lg text-gray-900 dark:text-gray-100">Selected Location:</p>
                                        <p className="text-gray-900 dark:text-gray-100">Latitude: {position.lat}</p>
                                        <p className="text-gray-900 dark:text-gray-100">Longitude: {position.lng}</p>
                                    </div>
                                )}

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 dark:border-gray-600 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <DisclosureButton className="flex w-full items-center justify-between bg-grey-200 dark:bg-gray-700 px-2 py-3 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">
                                                        <span className="font-medium text-gray-900 dark:text-gray-100">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-6">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    value={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                                                                    onChange={() => handleFilterChange(section.id, option.value)}
                                                                />
                                                                <label
                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    className="ml-3 min-w-0 flex-1 text-gray-500 dark:text-gray-300"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-600 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">News Feeds</h1>

                        {/* Search Bar */}
                        <form className="max-w-3xl w-[35em] mx-auto">
                            <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={handleSearchQueryChange}
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Stocks, general..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-200"
                                            aria-hidden="true"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                {({ focus }) => (
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current
                                                                ? 'font-medium text-gray-900 dark:text-gray-100'
                                                                : 'text-gray-500 dark:text-gray-300',
                                                            focus ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                            'block px-4 py-2 text-sm',
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 dark:text-gray-300 dark:hover:text-gray-200">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button> */}
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden dark:text-gray-300 dark:hover:text-gray-200"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Location</h3>
                                <button
                                    className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gradient-to-l"
                                    onClick={openModal}
                                >
                                    Open Location Picker
                                </button>
                                <ModalPopup isOpen={isModalOpen} onRequestClose={closeModal} title="Select the search location">
                                    <LocationPicker position={position} setPosition={setPosition} clearLocation={clearLocation} />
                                </ModalPopup>
                                {position && (
                                    <div className="mt-4 p-4 bg-white dark:bg-gray-700 shadow-md rounded-md">
                                        <p className="text-lg text-gray-900 dark:text-gray-100">Selected Location:</p>
                                        <p className="text-gray-900 dark:text-gray-100">Latitude: {position.lat}</p>
                                        <p className="text-gray-900 dark:text-gray-100">Longitude: {position.lng}</p>
                                    </div>
                                )}

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 dark:border-gray-600 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="px-4 flex w-full items-center justify-between bg-gray-200 dark:bg-gray-700 py-3 text-sm text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">
                                                        <span className="font-medium text-gray-900 dark:text-gray-100">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <DisclosurePanel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    value={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                                                                    onChange={() => handleFilterChange(section.id, option.value)}
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600 dark:text-gray-300"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3 text-black dark:text-white">
                                <div className=" w-full relative max-w-xs">
                                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                                    <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                                        <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-2 w-2 text-gray-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                                                />
                                            </svg>
                                        </div>

                                        <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                                            Meteors because they&apos;re cool
                                        </h1>

                                        <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                                            I don&apos;t know what to write so I&apos;ll just paste something
                                            cool here. One more sentence because lorem ipsum is just
                                            unacceptable. Won&apos;t ChatGPT the shit out of this.
                                        </p>

                                        <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
                                            Explore
                                        </button>

                                        {/* Meaty part - Meteor effect */}
                                        <Meteors number={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}