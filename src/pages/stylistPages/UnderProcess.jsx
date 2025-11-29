import React from 'react'
import review from '../../assets/profileunderreview.png'
import { useParams, Link } from 'react-router-dom'
import { ButtonSquare } from '../../components/ui/buttonSquare'

const ProfileUnderProcess = () => {
    const { id } = useParams()
    return (
        <div className=' h-full'>
            <div className='container min-h-auto'>
                <div className=' flex flex-col gap-4 justify-center items-center  px-0 md:px-[100px]     '>
                    <div className='h-[250px] w-[250px] '>
                        <img src={review} alt="review" className='object-fit w-full' />
                    </div>
                    <div className="   md:text-[30px] text-[15px]  md:text-[35px]  xl:text-[50px] font-poppins font-extrabold text-black"> Profile Under Review</div>
                    <p className='   md:text-[30px] text-[15px] font-poppins font-normal text-gray-55 text-center'>Thank you so much for choosing crownity. Your profile is successfully submitted and and you are ready to go</p>
                    <div className='w-full'>
                        <Link to="/">
                            <ButtonSquare className='w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Visit the Site</ButtonSquare>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileUnderProcess      