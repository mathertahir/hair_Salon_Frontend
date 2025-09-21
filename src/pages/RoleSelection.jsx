import React, { useState } from 'react'
import clientRole from '../assets/client.png'
import hairstylistRole from '../assets/hairStylist.png'
import { Link } from 'react-router-dom'

const RoleSelection = () => {
    const [activeRole, setActiveRole] = useState(1) // 1 for client, 2 for hairstylist


    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-[40px] justify-center items-center'>


                    <h1 className='text-[30px] font-bold font-manrope text-black'>Choose Your Role to Get Started</h1>

                    <div className='flex gap-10 lg:gap-20 flex-col lg:flex-row items-center'>

                        <Link to="/signup-client">
                            <div
                                className={`w-[250px] h-[270px]  lg:w-[300px] lg:h-[316px] rounded-[20px] flex flex-col gap-[10px] justify-center items-center cursor-pointer transition-all duration-300 ${activeRole === 1
                                    ? 'bg-foreground'
                                    : 'bg-light-brown-11p'
                                    }`}
                                onClick={() => setActiveRole(1)}
                            >
                                <div>
                                    <img src={clientRole} alt="role" />
                                </div>
                                <p className={`font-bold text-[20px] ${activeRole === 1
                                    ? 'text-background'
                                    : 'text-foreground'
                                    }`}>I am a client</p>
                            </div>
                        </Link>
                        <div
                            className={`lg:w-[300px] lg:h-[316px] w-[250px] h-[270px] rounded-[20px] flex flex-col gap-[10px] justify-center items-center cursor-pointer transition-all duration-300 ${activeRole === 2
                                ? 'bg-foreground'
                                : 'bg-light-brown-11p'
                                }`}
                            onClick={() => setActiveRole(2)}
                        >
                            <div>
                                <img src={hairstylistRole} alt="role" />
                            </div>
                            <p className={`font-bold text-[25px] font-manrope font-normal ${activeRole === 2
                                ? 'text-background'
                                : 'text-foreground'
                                }`}>I am a hairstylist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleSelection