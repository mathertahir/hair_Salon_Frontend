

import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterDropdown from '../../components/FilterDropdown';
import HairstylistCard from '../../components/HairstylistCard';
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ToastService } from '../../utils/ToastService';
import Pagination from '../../components/ui/Pagination';
import { ClipLoader } from 'react-spinners';
import { FiSearch } from "react-icons/fi";
import { Button } from '../../components/ui/button';
import SearchSelect from '../../components/ui/SearchSelect';

const hairstyleOptions = [
    { value: 'Braids', label: 'Braids' },
    { value: 'Bridal Special', label: 'Bridal Special' },
    { value: 'Cornrows', label: 'Cornrows' },
    { value: 'Crochet Braids', label: 'Crochet Braids' },
    { value: 'Hair Straightening', label: 'Hair Straightening (Blowout, Silk Press)' },
    { value: 'Kids Hairstyles', label: "Kids Hairstyles" },
    { value: 'Locs', label: 'Locs' },
    { value: 'Natural Hair Care', label: 'Natural Hair Care' },
    { value: 'Passion Twists', label: 'Passion Twists' },
    { value: 'Twists', label: 'Twists' },
    { value: 'Weave', label: 'Weave' },
    { value: 'Wigs', label: 'Wigs' },
    { value: 'Make Up', label: 'Make Up' },
    { value: 'All', label: 'See All' },
];

const PublicServicesPage = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ Initially true
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParam, setSearchParam] = useState("");

    // ✅ Track if initial load is complete
    const isInitialized = useRef(false);

    const API = useAPI();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    const userLocation = localStorage.getItem("userLocation")
        ? JSON.parse(localStorage.getItem("userLocation"))
        : null;

    const filterItems = [
        { key: 0, label: "Top Rated" },
        { key: 1, label: "Near Me" },
    ];

    // Fetch function
    const fetchServices = async (search = searchParam) => {
        if (!userLocation?.lat || !userLocation?.lng) {
            console.warn("No location found in localStorage!");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await API.get("/api/user/services/list", {
                params: {
                    latitude: userLocation.lat,
                    longitude: userLocation.lng,
                    limit,
                    page: currentPage,
                    sortBy: selectedFilter ?? 0,
                    searchParam: search === 'All' ? "" : search,
                },
            });

            const data = response.data.responseData;
            setServices(data?.services);
            setTotalPages(data?.pagination?.totalPages || 1);

            if (response.data?.responseMessage?.[0]) {
                // ToastService.success(response.data.responseMessage[0]);
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
            isInitialized.current = true; // ✅ Mark as initialized
        }
    };

    // 1️⃣ Mount effect: initialize from query param
    useEffect(() => {
        const param = queryParams.get("searchParam") || "";
        console.log(param.length, "Coming Param");
        setSearchParam(param);
    }, [queryParams,]);

    // 2️⃣ Fetch when searchParam or dependencies change
    useEffect(() => {
        if (searchParam !== undefined && userLocation?.lat && userLocation?.lng) {
            fetchServices(searchParam);
        }
    }, [searchParam, currentPage, limit, selectedFilter])

    // Hero Search button
    const handleHeroSearch = () => {
        if (!searchParam) {
            alert("Please select a hairstyle before searching!");
            return;
        }
        navigate(`/userServices?searchParam=${encodeURIComponent(searchParam)}`);
    };

    // Reset filters
    const resetFilters = () => {
        setSelectedFilter(null);
        setCurrentPage(1);
        setLimit(10);
        setSearchParam("");
        setServices([]);
        navigate("/userServices");
    };

    return (
        <div className="container py-10 flex flex-col gap-10">
            {/* Hero Section Search */}
            <div className='bg-background rounded-[60px] p-[25px] xl:pl-[40px] xl:py-[14px] xl:pr-[14px]'>
                <div className='flex flex-col xl:flex-row gap-6 items-stretch'>
                    <SearchSelect
                        label="What hairstyle are you looking for?"
                        options={hairstyleOptions}
                        value={searchParam}
                        onChange={setSearchParam}
                        placeholder="Box Braids, Cornrows...."
                    />
                </div>
            </div>

            {/* Buttons & Filter */}
            <div className="flex justify-between items-center">
                <div className='flex items-center gap-2 flex-wrap'>
                    <div>
                        <Button
                            className='w-full px-8 py-[16px] bg-brown-A43 text-background hover:bg-brown-A43/90 transition-colors'
                            onClick={handleHeroSearch}
                        >
                            <span className='flex items-center gap-2'>
                                Search
                                <FiSearch className='w-4 h-4' />
                            </span>
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="outline"
                            className='w-full px-8 py-[16px]'
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>

                <FilterDropdown
                    items={filterItems}
                    selectedKey={selectedFilter}
                    onSelect={setSelectedFilter}
                    placeholder="Sort"
                />
            </div>

            {/* Services List */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <ClipLoader color="#b88b5a" size={50} />
                </div>
            ) : services.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">
                        {services.map(service => (
                            <HairstylistCard
                                key={service._id}
                                image={service?.servicePhoto?.url}
                                name={service?.name}
                                busines={service?.business?.name}
                                location={service?.business?.businessLocation?.streetAddress}
                                rating={service?.business?.averageRating}
                                reviewCount={service?.business?.totalReviews}
                                id={service._id}
                                price={service?.price}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        limit={limit}
                        setLimit={setLimit}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="flex justify-center items-center py-10 text-gray-500">
                    No services found.
                </div>
            )}
        </div>
    );
};

export default PublicServicesPage;