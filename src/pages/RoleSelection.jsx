import React, { useState } from 'react'
import clientRole from '../assets/client.png'
import hairstylistRole from '../assets/hairStylist.png'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";

const RoleSelection = () => {
    const { id } = useParams();
    const [activeRole, setActiveRole] = useState(0) // 1 for client, 2 for hairstylist


    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-[40px] justify-center items-center'>


                    <h1 className='text-[30px] font-bold font-manrope text-black'>Pick your profile to continue</h1>

                    <div className='flex gap-10 lg:gap-20 flex-col lg:flex-row items-center'>

                        <Link
                            to={`${id ? "/signin-client/0" : "/signup-client"}`}
                        >
                            <div
                                className={`w-[250px] h-[270px]  lg:w-[300px] lg:h-[316px] rounded-[20px] flex flex-col gap-[10px] justify-center items-center cursor-pointer transition-all duration-300 ${activeRole === 0
                                    ? 'bg-foreground'
                                    : 'bg-light-brown-11p'
                                    }`}
                                onClick={() => setActiveRole(0)}
                            >
                                <div className='w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]'>
                                    <img src={clientRole} alt="role" className='object-fit rounded-full' />
                                </div>
                                <p className={`font-bold text-[20px] ${activeRole === 0
                                    ? 'text-background'
                                    : 'text-foreground'
                                    }`}>I am a client</p>
                            </div>
                        </Link>
                        <Link
                            to={`${id ? "/signin-client/1" : "/stylist-signup"}`}

                        >
                            <div
                                className={`lg:w-[300px] lg:h-[316px] w-[250px] h-[270px] rounded-[20px] flex flex-col gap-[10px] justify-center items-center cursor-pointer transition-all duration-300 ${activeRole === 1
                                    ? 'bg-foreground'
                                    : 'bg-light-brown-11p'
                                    }`}
                                onClick={() => setActiveRole(1)}
                            >
                                <div className='w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]'>
                                    <img src={hairstylistRole} alt="role" className='object-fit rounded-full' />
                                </div>
                                <p className={`font-bold text-[25px] font-manrope font-normal ${activeRole === 1
                                    ? 'text-background'
                                    : 'text-foreground'
                                    }`}>I am a hairstylist</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleSelection