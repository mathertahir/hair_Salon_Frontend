import React, { useState } from 'react'
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox } from 'react-icons/md'
import { ButtonSquare } from '../components/ui/buttonSquare'
import google from '../assets/google.png'
import facebook from "../assets/fb.png"
import signup from "../assets/SignUp.png"
import resetPassword from "../assets/reset.png"
import { Link } from 'react-router-dom'
import useAPI from "../services/baseUrl/useApiHook";
import { useNavigate, useParams } from "react-router-dom";
import { handleApiError } from '../utils/helpers/HelperFunction';
import { ToastService } from '../utils/ToastService';


const ForgotPassword = () => {
    const API = useAPI();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
    });

    const url = id === "0" ? "/auth/login" : "api/auth/business/forgotPassword";
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleForgotPassword = async (e) => {
        e.preventDefault(); // prevent page reload
        setIsLoading(true);
        let usermail = formData?.email
        try {
            const response = await API.post(url, {
                email: formData.email,
            });


            const responseMessage = response.data?.responseMessage?.[0] || "";
            console.log(responseMessage, "Comming Message")
            console.log("ToastService:", ToastService)
            ToastService.success(`${responseMessage}`)

            console.log("Navigating to:", `/otp/${id}?email=${encodeURIComponent(usermail)}`);
            navigate(`/otp/${id}?email=${encodeURIComponent(usermail)}`)





        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='bg-background'>
            <div className='flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px] mx-0 px-0'>
                <div className='w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center'>
                    <h1 className='md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left'> Reset Your Password </h1>

                    <form className='flex flex-col gap-4'>
                        <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                            <div className='flex gap-3 items-center '>
                                <div className='text-blueCD'>
                                    <MdForwardToInbox size={24} />
                                </div>
                                <input
                                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='Email'
                                    required={true}
                                />

                            </div>

                        </div>


                        <ButtonSquare
                            type="submit"
                            onClick={handleForgotPassword}
                            disabled={isLoading}
                            className='w-full bg-brown-A43 text-background  p-[20px]  font-extrabold text-[14px] font-manrope'
                            variant='secondary'
                        >
                            {isLoading ? 'Sending...' : 'Send Code'}
                        </ButtonSquare>

                    </form>

                    <div className="inline-flex items-center justify-center w-full relative ">
                        <hr className="w-[99%] h-1 bg-blueEC border-0 rounded-sm  " />
                        <div className="absolute px-6 my-3 -translate-x-1/2     left-1/2  right-1/2 mx-2  bg-background flex justify-center items-center  ">
                            <p className='text-blueCD text-[14px] font-manrope'>or</p>
                        </div>
                    </div>


                    <div className='flex flex-col   md:gap-[104px] gap-[60px]'>


                        <div className='flex gap-[6px] justify-center items-center'>
                            <p className='text-blueB8 text-[15px] font-poppins font-semibold'>Don't have an account? <Link to="/signup-client" className='hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins'>Sign Up</Link></p>
                        </div>
                    </div>



                </div>

                <div className='w-full md:w-1/2 xl:w-2/3 hidden md:block' style={{ backgroundImage: `url(${resetPassword})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    {/* <div className='w-full h-full'  >
                        <img src={signup} className='w-auto h-full object-fill'></img>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword