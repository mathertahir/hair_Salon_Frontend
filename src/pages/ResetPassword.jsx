// import React, { useState } from 'react'
// import { LiaKeySolid } from "react-icons/lia";
// import { MdForwardToInbox } from 'react-icons/md'
// import { ButtonSquare } from '../components/ui/buttonSquare'

// import signup from "../assets/SignUp.png"
// import resetPassword from "../assets/reset.png"
// import { Link } from 'react-router-dom'
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import useAPI from "../services/baseUrl/useApiHook";

// import { handleApiError } from '../utils/helpers/HelperFunction';
// import { ToastService } from '../utils/ToastService';


// const ResetPassword = () => {
//     const API = useAPI();
//     const [isLoading, setIsLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         email: "",
//     });
//     const [searchParams] = useSearchParams();
//     const verificationCode = searchParams.get('verificationCode');
//     const id = searchParams.get('id');


//     return (
//         <div className='bg-background'>
//             <div className='flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px] mx-0 px-0'>
//                 <div className='w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 flex flex-col justify-center'>
//                     <h1 className='md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left'>Reset Your Password </h1>

//                     <form className='flex flex-col gap-4'>
//                         <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
//                             <div className='flex gap-3 items-center '>
//                                 <div className='text-blueCD'>
//                                     <LiaKeySolid size={24} />
//                                 </div>
//                                 <input
//                                     className="focus:border-none focus:outline-none border-none w-full bg-transparent"
//                                     type="password"
//                                     placeholder='Password'
//                                 />

//                             </div>

//                         </div>
//                         <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
//                             <div className='flex gap-3 items-center '>
//                                 <div className='text-blueCD'>
//                                     <LiaKeySolid size={24} />
//                                 </div>
//                                 <input
//                                     className="focus:border-none focus:outline-none border-none w-full bg-transparent"
//                                     type="password"
//                                     placeholder='Confirm Password'
//                                 />

//                             </div>

//                         </div>



//                         <Link to={"/login"}>  <ButtonSquare className='w-full bg-brown-A43 text-background  p-[20px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Reset Password</ButtonSquare></Link>
//                     </form>

//                     <div className='flex  flex-col gap-[20px]'>



//                         <div class="inline-flex items-center justify-center w-full relative ">
//                             <hr class="w-[99%] h-1 bg-blueEC border-0 rounded-sm  " />
//                             <div class="absolute px-6 my-3 -translate-x-1/2     left-1/2  right-1/2 mx-2  bg-background flex justify-center items-center  ">
//                                 <p className='text-blueCD text-[14px] font-manrope'>or</p>
//                             </div>
//                         </div>
//                     </div>




//                     <div className='flex flex-col  md:gap-[104px] gap-[60px]'>



//                         <div className='flex gap-[6px] justify-center items-center'>
//                             <p className='text-blueB8 text-[15px] font-poppins font-semibold'>Don't have an account? <Link to="/signup-client" className='hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins'>SignUp</Link></p>
//                         </div>
//                     </div>



//                 </div>

//                 <div className='w-full md:w-1/2 xl:w-2/3 hidden md:block' style={{ backgroundImage: `url(${resetPassword})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

//                     {/* <div className='w-full h-full'  >
//                         <img src={signup} className='w-auto h-full object-fill'></img>
//                     </div> */}

//                 </div>
//             </div>
//         </div >
//     )
// }

// export default ResetPassword

import React, { useState } from 'react'
import { LiaKeySolid } from "react-icons/lia";
import { ButtonSquare } from '../components/ui/buttonSquare'
import resetPasswordImg from "../assets/reset.webp"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAPI from "../services/baseUrl/useApiHook";
import { handleApiError } from '../utils/helpers/HelperFunction';
import { ToastService } from '../utils/ToastService';

const ResetPassword = () => {
    const API = useAPI();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [searchParams] = useSearchParams();
    const verificationCode = searchParams.get('verificationCode');
    const id = searchParams.get('id');

    let url = id === "0" ? "/auth/l" : "api/auth/business/resetPassword";

    // ✅ Handle input changes
    const handleChange = (e) => {


        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle reset password submission
    const handleResetPassword = async (e) => {
        console.log("Reset Password")
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            ToastService.error("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            const payload = {
                verificationCode,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            };

            const response = await API.put(`${url}`, payload);


            const responseMessage = response.data?.responseMessage?.[0] || "Password reset successful!";
            ToastService.success(`${responseMessage}`);

            // Redirect to signin page after success
            navigate(`/login/:${id}`);

        } catch (error) {
            console.log(error)
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='bg-background'>
            <div className='flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px]'>
                <div className='w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center'>
                    <h1 className='md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left'>
                        Reset Your Password
                    </h1>

                    <form className='flex flex-col gap-4' onSubmit={handleResetPassword}>
                        {/* Password Field */}
                        <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px]'>
                            <div className='flex gap-3 items-center'>
                                <div className='text-blueCD'>
                                    <LiaKeySolid size={24} />
                                </div>
                                <input
                                    className="focus:outline-none w-full bg-transparent"
                                    type="password"
                                    name="password"
                                    placeholder='New Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px]'>
                            <div className='flex gap-3 items-center'>
                                <div className='text-blueCD'>
                                    <LiaKeySolid size={24} />
                                </div>
                                <input
                                    className="focus:outline-none w-full bg-transparent"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder='Confirm Password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <ButtonSquare
                            className='w-full bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope'
                            variant='secondary'
                            type='submit'
                            disabled={isLoading}

                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </ButtonSquare>
                    </form>

                    {/* Divider */}
                    <div className='flex flex-col gap-[20px]'>
                        <div className="inline-flex items-center justify-center w-full relative">
                            <hr className="w-[99%] h-1 bg-blueEC border-0 rounded-sm" />
                            <div className="absolute px-6 my-3 -translate-x-1/2 left-1/2 bg-background flex justify-center items-center">
                                <p className='text-blueCD text-[14px] font-manrope'>or</p>
                            </div>
                        </div>
                    </div>

                    {/* Signup Link */}
                    <div className='flex gap-[6px] justify-center items-center'>
                        <p className='text-blueB8 text-[15px] font-poppins font-semibold'>
                            Don't have an account?
                            <Link to="/signup-client" className='text-brown-A43 font-semibold font-poppins ml-1 hover:-translate-y-[2px]'>
                                SignUp
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className='w-full md:w-1/2 xl:w-2/3 hidden md:block'
                    style={{
                        backgroundImage: `url(${resetPasswordImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
