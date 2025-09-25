
import React from 'react'
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox, MdPhone } from 'react-icons/md'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import { FaLocationPin, FaRegUser } from "react-icons/fa6";
import google from '../../assets/google.png'
import facebook from "../../assets/fb.png"
import signup from "../../assets/SignUp.png"
import { Link } from 'react-router-dom'
import { FaPaperclip, FaPaperPlane, FaStore } from 'react-icons/fa';
import { GrServices } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { TbBasketDollar } from "react-icons/tb";

const SignupClient = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const totalSteps = 3;

    const handleNext = () => {
        if (activeStep < totalSteps - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    return (
        <div className='bg-background'>
            <div className='flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px] mx-0 px-0'>
                <div className='w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center'>

                    <h1 className='md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left'>Sign Up as an Hairstylist </h1>

                    {/* Stepper */}
                    <div className="flex items-center w-full">
                        {Array.from({ length: totalSteps }, (_, i) => (
                            <React.Fragment key={i}>
                                {/* Circle */}
                                <div
                                    onClick={() => setActiveStep(i)}
                                    className={`w-7 h-7 shrink-0 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-500 ${activeStep >= i ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                >
                                    <span className="text-sm text-white font-semibold">{i + 1}</span>
                                </div>

                                {/* Connector - only show if not the last step */}
                                {i < totalSteps - 1 && (
                                    <div
                                        className={`flex-1 h-[3px] mx-2 rounded-lg transition-colors duration-500 ${activeStep > i ? "bg-blue-600" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Form */}
                    <form className='flex flex-col gap-4'>

                        {/* Step 1 */}
                        {activeStep === 0 && (
                            <>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <FaRegUser size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Name'
                                        />

                                    </div>

                                </div>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <MdForwardToInbox size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="email"
                                            placeholder='Email'
                                        />

                                    </div>

                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <MdPhone size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Phone'
                                        />

                                    </div>

                                </div>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <LiaKeySolid size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="password"
                                            placeholder='Password'
                                        />

                                    </div>

                                </div>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <LiaKeySolid size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="confirmPassword"
                                            placeholder='Confirm Password'
                                        />

                                    </div>

                                </div>
                            </>
                        )}

                        {/* Step 2 */}
                        {activeStep === 1 && (
                            <>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <FaStore size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Store Name'
                                        />
                                    </div>
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <IoNewspaperOutline size={24} />

                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Description'
                                        />
                                    </div>
                                </div>



                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <CiLocationOn size={24} />

                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Address'
                                        />
                                    </div>
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <GrServices size={24} />

                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Services Offer'
                                        />
                                    </div>
                                </div>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <TbBasketDollar size={24} />

                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="text"
                                            placeholder='Price'
                                        />
                                    </div>
                                </div>

                            </>
                        )}

                        {/* Step 3 */}
                        {activeStep === 2 && (
                            <>
                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <IoNewspaperOutline size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="file"
                                            placeholder='Upload Image'
                                        />
                                    </div>
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <IoNewspaperOutline size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="file"
                                            placeholder='Upload Image'
                                        />
                                    </div>
                                </div>

                                <div className='p-[10px] border-[1px] border-white-E9 rounded-[5px] '>
                                    <div className='flex gap-3 items-center '>
                                        <div className='text-blueCD'>
                                            <IoNewspaperOutline size={24} />
                                        </div>
                                        <input
                                            className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                            type="file"
                                            placeholder='Upload Image'
                                        />
                                    </div>
                                </div>

                                <Link to="/profile-under-review">
                                    <ButtonSquare className='w-full bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope' variant='secondary'>
                                        Sign Up
                                    </ButtonSquare>
                                </Link>
                            </>
                        )}

                        {/* Continue button (only if not last step) */}
                        {activeStep < totalSteps - 1 && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full bg-brown-A43 text-white font-bold py-2 rounded transition-colors duration-300 hover:bg-brown-700"
                            >
                                Continue
                            </button>
                        )}
                    </form>

                    {/* OR divider */}
                    <div className="inline-flex items-center justify-center w-full relative mt-6">
                        <hr className="w-[99%] h-1 bg-blueEC border-0 rounded-sm" />
                        <div className="absolute px-6 my-3 -translate-x-1/2 left-1/2 bg-background flex justify-center items-center">
                            <p className='text-blueCD text-[14px] font-manrope'>or</p>
                        </div>
                    </div>

                    {/* Social logins + link */}
                    <div className='flex flex-col md:gap-[104px] gap-[60px]'>
                        <div className='flex gap-10 sm:flex-row flex-col items-center justify-center'>
                            <Link to="/signin-client" className='w-full sm:w-auto'>
                                <ButtonSquare className='px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px] rounded-[8px] w-full sm:w-auto' variant='outline'>
                                    <div className='w-[24px] h-[24px]'>
                                        <img src={google} alt="Google logo" className='w-full h-full object-fill' />
                                    </div>
                                    <p className='text-black text-[14px] font-manrope font-bold'>Google</p>
                                </ButtonSquare>
                            </Link>

                            <Link to="/signin-client" className='w-full sm:w-auto'>
                                <ButtonSquare className='px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px] rounded-[8px] w-full sm:w-auto' variant='outline'>
                                    <div className='w-[24px] h-[24px]'>
                                        <img src={facebook} alt="Facebook logo" className='w-full h-full object-fill' />
                                    </div>
                                    <p className='text-black text-[14px] font-manrope font-bold'>Facebook</p>
                                </ButtonSquare>
                            </Link>
                        </div>

                        <div className='flex gap-[6px] justify-center items-center'>
                            <p className='text-blueB8 text-[15px] font-poppins font-semibold'>
                                Already have an account? <Link to="/login" className='hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins'>Login</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right side image */}
                <div className='w-full md:w-1/2 xl:w-2/3 hidden md:block'
                    style={{ backgroundImage: `url(${signup})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </div>
            </div>
        </div>
    )
}

export default SignupClient





