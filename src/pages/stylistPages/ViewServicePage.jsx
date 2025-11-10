import React, { useContext, useEffect, useState } from "react";
import GoBack from '../../components/GoBack'
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ToastService } from "../../utils/ToastService";
import { useParams } from "react-router-dom";

const ViewServicePage = () => {
    const API = useAPI();
    const auth = useContext(AuthContext);
    const { authToken } = auth;
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);
    const { id } = useParams();
    console.log(id, "Comminnh is")

    const fetchService = () => {
        setLoading(true);
        API.get(`/api/business/services/${id}`, {
            headers: { Authorization: authToken }
        })
            .then((response) => {
                const responseMessage = response.data?.responseMessage?.[0];
                setService(response.data.responseData.service);
                ToastService.success(responseMessage);
            })
            .catch((error) => {
                console.error('Error fetching Service :', error);
                handleApiError(error);
            })
            .finally(() => {
                setLoading(false); // ✅ Stop loader after success/failure
            });
    };

    useEffect(() => {
        fetchService();
    }, []);




    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-600 font-manrope">Loading Service Detail...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-6'>

            <div className="flex justify-between items-center">
                <p className="text-brown-A43 font-playfair font-bold sm:text-[30px] text-[20px]">
                    Service Detail
                </p>

                <GoBack />
            </div>


            <div className='flex flex-col gap-6 '>
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                        Service Name :
                    </h1>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        {service?.name}
                    </p>
                </div>

                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                        Service Price :
                    </h1>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        ${service?.price}
                    </p>
                </div>
                <div className="flex flex-col gap-2 flex-wrap">
                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                        Service Description :
                    </h1>
                    <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                        ${service?.description} Rs
                    </p>
                </div>

                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                    <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                        Service Photo :
                    </h1>
                    <PhotoProvider>
                        <div className="flex gap-2 flex-wrap">

                            <PhotoView src={service?.servicePhoto?.url}>
                                <img
                                    src={service?.servicePhoto?.url}

                                    className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer"
                                />
                            </PhotoView>


                        </div>
                    </PhotoProvider>
                </div>


            </div>



        </div>
    )
}

export default ViewServicePage