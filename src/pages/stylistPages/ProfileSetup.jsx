import React, { useState } from 'react'
import { ButtonSquare } from '../../components/ui/buttonSquare';
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";
import { Link } from 'react-router-dom';

const ProfileSetup = () => {
    const [salonPhotos, setSalonPhotos] = useState(null);
    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-6'>
                    <h1 className='md:text-[35px] text-[20px]   font-bold text-black-14 font-playfair'>Profile Setup</h1>

                    <div className='w-full'>
                        <form className='grid grid-cols-12 gap-4 sm:gap-6 md:gap-8'>

                            <div className='flex flex-col gap-3 col-span-12 lg:col-span-6'>
                                <label className='text-[14px] font-bold font-manrop text-brown-A43'> Saloon Name :</label>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 '>

                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Name'
                                            value={"Crown By Amara"}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 col-span-12 lg:col-span-6'>
                                <label className='text-[14px] font-bold font-manrop text-brown-A43'> Location :</label>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 '>

                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Name'
                                            value={"Lahore"}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 col-span-12 lg:col-span-6'>
                                <label className='text-[14px] font-bold font-manrop text-brown-A43'> Working Hours :</label>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 '>

                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Name'
                                            value={"11:00 am to 04:00 pm"}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 col-span-12 lg:col-span-6'>
                                <label className='text-[14px] font-bold font-manrop text-brown-A43'> Business Contact :</label>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 '>

                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="tel"
                                            placeholder='text'
                                            value={"+923447729753"}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 col-span-12  '>
                                <label className='text-[14px] font-bold font-manrop text-brown-A43'> Starting Price:</label>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 '>

                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Enter Your Starting Price'
                                            value={"3000 RS"}


                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-3 col-span-12  '>
                                <label className='text-[14px] font-bold font-manrop text-brown-A43'> Description :</label>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 '>

                                        <textarea
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='text'
                                            value={"At Crown by Amara, we believe your hair is your crown, and it deserves the best care. With years of professional experience, we specialize in modern cuts, vibrant coloring, bridal styling, and treatments that bring life back to your hair. Our mission is to create looks that reflect your personality while keeping your hair healthy and radiant. Whether it’s a quick trim, a bold transformation, or the perfect style for your big day, Crown by Amara ensures every client leaves with confidence and a smile"}
                                            rows={4}

                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='flex flex-col gap-3 col-span-12  '>
                                <div className='flex justify-between items-center'>
                                    <h1 className='md:text-[25px] text-[20px]   font-bold text-black-14 font-playfair'>Services You Offered</h1>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-[30px] h-[30px] p-3 rounded-lg flex justify-center items-center bg-green-100 cursor-pointer' >

                                            <div className='text-green-800'>
                                                <GoPlus size={24} />
                                            </div>

                                        </div>
                                        <div className='w-[30px] h-[30px] p-3 rounded-lg flex justify-center items-center bg-red-100 cursor-pointer' >

                                            <div className='text-red-800'>
                                                <HiMiniMinusSmall size={24} />
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>


                            <div className='flex flex-col gap-3 col-span-12  '>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-3 '>
                                        <label className='text-[14px] font-bold font-manrop text-brown-A43'> Name of Service :</label>
                                        <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                            <div className='flex gap-3 '>

                                                <input
                                                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                    type="text"
                                                    placeholder='Price of Service'


                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3 '>
                                        <label className='text-[14px] font-bold font-manrop text-brown-A43'> Price of Service :</label>
                                        <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                            <div className='flex gap-3 '>

                                                <input
                                                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                    type="text"
                                                    placeholder='Price of Service'


                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3 '>
                                        <label className='text-[14px] font-bold font-manrop text-brown-A43'> Description :</label>
                                        <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                            <div className='flex gap-3 '>

                                                <input
                                                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                                    type="text"
                                                    placeholder='Description of Service'


                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className='text-[14px] font-bold font-manrop text-brown-A43'> Service Photos :</label>
                                        <label className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                                            <div className="flex items-center gap-2 text-blueCD">
                                                <span>Salon Photos</span>
                                            </div>
                                            <LuPaperclip size={20} className="text-blueCD" />

                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setSalonPhotos(e.target.files[0])}
                                            />
                                        </label>

                                        {salonPhotos && (
                                            <div className="w-16 mt-1">
                                                <img
                                                    src={URL.createObjectURL(salonPhotos)}
                                                    alt="preview"
                                                    className="w-full h-auto border rounded"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex gap-3   flex-col sm:flex-row items-center'>
                                        <ButtonSquare
                                            type="button"
                                            className='bg-green-100 text-green-800 p-[20px] font-extrabold text-[14px] font-manrope rounded-[8px] w-full  sm:w-max'
                                            variant='secondary'

                                        >
                                            Add Service
                                        </ButtonSquare>

                                        <ButtonSquare
                                            type="button"
                                            className='bg-red-100 text-red-800 p-[20px] font-extrabold text-[14px] font-manrope rounded-[8px] w-full  sm:w-max'
                                            variant='secondary'

                                        >
                                            Cancel
                                        </ButtonSquare>
                                    </div>



                                </div>


                            </div>














                            <div className='w-full col-span-12 flex justify-center'>   <hr class="h-px my-8 bg-gray-800  border-[1px]  rounded-lg w-[80%]" /></div>



                            <div className='col-span-12'>


                                <Link to="/pricing">
                                    <ButtonSquare
                                        type="button"
                                        className='bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope rounded-[8px] w-full'
                                        variant='secondary'

                                    >
                                        Pay Now
                                    </ButtonSquare>
                                </Link>


                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ProfileSetup