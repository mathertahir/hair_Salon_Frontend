import React from 'react'
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const GoBack = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one step in history
    };
    return (
        <div className='w-[30px] h-[30px] p-3 rounded-lg flex justify-center items-center bg-brown-E0 cursor-pointer' onClick={goBack}>

            <div className='text-brown-A43'>
                <IoMdArrowRoundBack />
            </div>

        </div>
    )
}

export default GoBack