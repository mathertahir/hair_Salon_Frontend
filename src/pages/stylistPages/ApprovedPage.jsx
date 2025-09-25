import React from 'react'
import approved from '../../assets/approved.png'
import { useParams, Link } from 'react-router-dom'
import { ButtonSquare } from '../../components/ui/buttonSquare'

const ApprovedPage = () => {
    const { id } = useParams()
    return (
        <div className='bg-background'>
            <div className='container'>
                <div className='py-20 flex flex-col gap-4 justify-center items-center  px-0 md:px-[100px]  lg:px-[200px]  xl:px[368px] '>
                    <div className=' '>
                        <img src={approved} alt="approved" className='object-fit' />
                    </div>
                    <div className="   md:text-[30px] text-[15px]  md:text-[35px]  xl:text-[50px] font-poppins font-extrabold text-black"> Congratulations!🚀</div>
                    <p className='   md:text-[30px] text-[15px] font-poppins font-normal text-gray-55 text-center'>Thank you so much for choosing crownity. Your profile is successfully submitted and and you are ready to go</p>
                    <div className='w-full'>
                        <Link to="/pricing">
                            <ButtonSquare className='w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Continuer</ButtonSquare>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ApprovedPage       