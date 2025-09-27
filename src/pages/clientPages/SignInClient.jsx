import React from 'react'
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox } from 'react-icons/md'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import google from '../../assets/google.png'
import facebook from "../../assets/fb.png"
import signup from "../../assets/HG5.png"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";


const SignInClient = () => {
    const { id } = useParams();
    const handleSignIn = () => {
        console.log('Sign In');

        localStorage.setItem('token', '1234567890');
        localStorage.setItem('roleType', id)
    }


    return (
        <div className='bg-background'>
            <div className='flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px] mx-0 px-0'>
                <div className='w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center'>
                    <h1 className='md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left'>Sign In </h1>

                    <form className='flex flex-col gap-4' onSubmit={handleSignIn}>
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
                                    <LiaKeySolid size={24} />
                                </div>
                                <input
                                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                    type="password"
                                    placeholder='Password'
                                />

                            </div>

                        </div>

                        <Link to="/" onClick={handleSignIn}>
                            <ButtonSquare className='w-full bg-brown-A43 text-background  p-[20px]  font-extrabold text-[14px] font-manrope' variant='secondary' type='submit' >Sign In</ButtonSquare>
                        </Link>

                    </form >

                    <div className='flex  flex-col gap-[20px]'>

                        <Link to="/forgotPassword" className='hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins' ><div className='text-brown-A43 font-semibold font-poppins flex items-center justify-center' >     Forgot Password        </div> </Link>

                        <div class="inline-flex items-center justify-center w-full relative ">
                            <hr class="w-[99%] h-1 bg-blueEC border-0 rounded-sm  " />
                            <div class="absolute px-6 my-3 -translate-x-1/2     left-1/2  right-1/2 mx-2  bg-background flex justify-center items-center  ">
                                <p className='text-blueCD text-[14px] font-manrope'>or</p>
                            </div>
                        </div>
                    </div>




                    <div className='flex flex-col  md:gap-[104px] gap-[60px]'>
                        <div className='flex gap-10  sm:flex-row flex-col items-center justify-center'>
                            <Link to="/signin-client" className='w-full sm:w-auto'>
                                <ButtonSquare className=' px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px]  rounded-[8px] w-full sm:w-auto' variant='outline' >
                                    <div className=' w-[24px] h-[24px]'>
                                        <img src={google} className='w-full h-full object-fill'></img>
                                    </div>

                                    <p className='text-black text-[14px] font-manrope font-bold'>Google</p>
                                </ButtonSquare>
                            </Link>

                            <Link to="/signin-client" className='w-full sm:w-auto'>      <ButtonSquare className=' px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px]  rounded-[8px] w-full sm:w-auto' variant='outline' >
                                <div className=' w-[24px] h-[24px]'>
                                    <img src={facebook} className='w-full h-full object-fill'></img>
                                </div>

                                <p className='text-black text-[14px] font-manrope font-bold'>Facebook</p>
                            </ButtonSquare>    </Link>

                        </div>


                        <div className='flex gap-[6px] justify-center items-center'>
                            <p className='text-blueB8 text-[15px] font-poppins font-semibold'>Don't have an account? <Link to="/signup-client" className='hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins'>SignUp</Link></p>
                        </div>
                    </div>



                </div>

                <div className='w-full md:w-1/2 xl:w-2/3 hidden md:block' style={{ backgroundImage: `url(${signup})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    {/* <div className='w-full h-full'  >
                        <img src={signup} className='w-auto h-full object-fill'></img>
                    </div> */}

                </div>
            </div>
        </div >
    )
}

export default SignInClient