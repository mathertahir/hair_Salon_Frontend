// import React, { useContext, useEffect, useState } from 'react'
// import FilterDropdown from '../../components/FilterDropdown';
// import gallery1 from '../../assets/HG1.png'
// import gallery2 from '../../assets/HG2.png'
// import gallery3 from '../../assets/HG3.png'
// import gallery4 from '../../assets/HG4.png'
// import gallery5 from '../../assets/HG5.png'
// import subscribeBg from '../../assets/Subscribe.png'
// import HairstylistCard from '../../components/HairstylistCard'
// import useAPI from "../../services/baseUrl/useApiHook";
// import { AuthContext } from "../../services/context/AuthContext";
// import { handleApiError } from "../../utils/helpers/HelperFunction";
// import { toast } from "react-toastify";
// import { ToastService } from '../../utils/ToastService';
// import { useNavigate } from 'react-router-dom';
// import Pagination from '../../components/ui/Pagination';

// const PublicServicesPage = () => {
//     const [selectedFilter, setSelectedFilter] = useState(null);
//     const API = useAPI();
//     const navigate = useNavigate();
//     const auth = useContext(AuthContext);
//     const [services, setServices] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(1);
//     const [userLocation, setUserLocation] = useState(
//         localStorage.getItem("userLocation")
//             ? JSON.parse(localStorage.getItem("userLocation"))
//             : null
//     );





//     const { authToken, user } = auth;
//     const [loading, setLoading] = useState(true);

//     const fetchServices = async () => {
//         console.log("Fetching services...");
//         setLoading(true);

//         try {
//             // 🗺️ Ensure userLocation is available
//             if (!userLocation?.lat || !userLocation?.lng) {
//                 console.warn("No location found in localStorage!");
//                 setLoading(false);
//                 return;
//             }

//             const response = await API.get("/api/user/services/viewAll/list", {
//                 params: {
//                     latitude: userLocation.lat,
//                     longitude: userLocation.lng,
//                 },

//             });

//             console.log("API Response:", response.data);
//             const userServices = response.data.responseData?.services;


//             ToastService.success(response.data?.responseMessage?.[0]);
//             setServices(userServices);
//         } catch (err) {
//             handleApiError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     console.log(userLocation.lat, userLocation.lng)



//     const filterItems = [
//         { key: 0, label: "Top Rated" },
//         { key: 1, label: "Near Me" },

//     ];

//     useEffect(() => {
//         fetchServices();
//     }, []);

//     console.log(services, "Service")
//     return (
//         <div>
//             <div className='container py-10' >

//                 <div className='flex flex-col gap-4'>
//                     <div className='flex justify-center items-center'>
//                         <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-brown-31 font-bold leading-none mb-4'>Services For You</h2>
//                     </div>


//                     <div className='flex flex-col gap-10'>
//                         <div className="flex justify-end">
//                             <FilterDropdown
//                                 items={filterItems}
//                                 selectedKey={selectedFilter}
//                                 onSelect={setSelectedFilter}
//                                 placeholder="Sort"
//                             />
//                         </div>


//                         <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3   2xl:grid-cols-4 gap-4 items-stretch'>
//                             {services?.map((hairstylist) => (
//                                 <HairstylistCard
//                                     key={hairstylist._id}
//                                     image={hairstylist?.servicePhoto.url}
//                                     name={hairstylist.name}
//                                     busines={hairstylist?.business?.name}
//                                     location={hairstylist?.business?.businessLocation?.streetAddress}
//                                     rating={hairstylist?.business?.averageRating}
//                                     reviewCount={hairstylist?.business?.totalReviews}
//                                     id={hairstylist._id}
//                                     price={hairstylist.price}
//                                 // onBookNow={() => handleBookNow(hairstylist.id)}
//                                 />
//                             ))}
//                         </div>

//                         <Pagination
//                             currentPage={currentPage}
//                             totalPages={totalPages}
//                             limit={limit}
//                             setLimit={setLimit}
//                             onPageChange={setCurrentPage}
//                         />

//                     </div>


//                 </div>

//             </div>
//         </div>
//     )
// }

// export default PublicServicesPage
import React, { useContext, useEffect, useState } from 'react'
import FilterDropdown from '../../components/FilterDropdown';
import HairstylistCard from '../../components/HairstylistCard'
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ToastService } from '../../utils/ToastService';
import Pagination from '../../components/ui/Pagination';
import { ClipLoader } from 'react-spinners'; // 🔥 npm install react-spinners

const PublicServicesPage = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const API = useAPI();
    const auth = useContext(AuthContext);
    const { authToken, user } = auth;

    const [userLocation, setUserLocation] = useState(
        localStorage.getItem("userLocation")
            ? JSON.parse(localStorage.getItem("userLocation"))
            : null
    );

    const filterItems = [
        { key: 0, label: "Top Rated" },
        { key: 1, label: "Near Me" },
    ];

    const fetchServices = async () => {
        console.log("Fetching services...");
        setLoading(true);

        try {
            if (!userLocation?.lat || !userLocation?.lng) {
                console.warn("No location found in localStorage!");
                setLoading(false);
                return;
            }

            const response = await API.get("/api/user/services/list", {
                params: {
                    latitude: userLocation.lat,
                    longitude: userLocation.lng,
                    limit,
                    page: currentPage,
                    sortBy: selectedFilter ?? 0, // Default sort = Top Rated
                },
            });

            console.log("API Response:", response.data);
            const data = response.data.responseData;

            setServices(data?.services || []);
            setTotalPages(data?.pagination?.totalPages || 1);

            if (response.data?.responseMessage?.[0]) {
                ToastService.success(response.data?.responseMessage?.[0]);
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    // 🔁 Re-fetch whenever pagination or sorting changes
    useEffect(() => {
        fetchServices();
    }, [currentPage, limit, selectedFilter]);

    return (
        <div className="container py-10">
            <div className="flex flex-col gap-4">
                <div className="flex justify-center items-center">
                    <h2 className="sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-brown-31 font-bold leading-none mb-4">
                        Services For You
                    </h2>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="flex justify-end">
                        <FilterDropdown
                            items={filterItems}
                            selectedKey={selectedFilter}
                            onSelect={setSelectedFilter}
                            placeholder="Sort"
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <ClipLoader color="#b88b5a" size={50} />
                        </div>
                    ) : services?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-stretch">
                                {services.map((hairstylist) => (
                                    <HairstylistCard
                                        key={hairstylist._id}
                                        image={hairstylist?.servicePhoto?.url}
                                        name={hairstylist?.name}
                                        busines={hairstylist?.business?.name}
                                        location={hairstylist?.business?.businessLocation?.streetAddress}
                                        rating={hairstylist?.business?.averageRating}
                                        reviewCount={hairstylist?.business?.totalReviews}
                                        id={hairstylist._id}
                                        price={hairstylist?.price}
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
                            No services found near your location.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicServicesPage;
