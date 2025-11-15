import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonSquare } from './buttonSquare'
import { truncateText } from '../../utils/helpers/HelperFunction'

const BlogsCard = ({
    image,
    title,
    description,
    createdAt,
    slug
}) => {
    return (
        <div className='flex-1 flex flex-col'>
            <div className='lg:h-[275px] h-[200px] rounded-t-3xl'>
                <img src={image} alt={title} className='w-full h-full object-cover rounded-t-3xl' />
            </div>

            <div className='flex flex-col flex-1'>
                <div className='p-6 border border-gray-55 rounded-b-3xl flex-1 flex flex-col gap-3'>
                    <p className='text-lg font-manrope font-bold text-black-14'>
                        {title}
                    </p>

                    <p className='text-sm text-gray-500'>
                        {truncateText(description, 40)}
                    </p>

                    <Link to={`/blogDetail/${slug}`} className='mt-auto'>
                        <ButtonSquare
                            variant='outline'
                            className='w-full p-4 text-base font-bold text-brown-A43 hover:bg-brown-A43 hover:text-white border-brown-A43'
                        >
                            Read More
                        </ButtonSquare>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogsCard
