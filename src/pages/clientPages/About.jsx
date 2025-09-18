import React from 'react'
import { Button } from '../../components/ui/button'
import { ButtonSquare } from '../../components/ui/buttonSquare'
import gallery1 from '../../assets/HG1.png'
import gallery2 from '../../assets/HG2.png'
import gallery3 from '../../assets/HG3.png'
import gallery4 from '../../assets/HG4.png'
import TestimonialSwiper from '../../components/TestimonialSwiper'
import ValuesCard from '../../components/ValuesCard'
import values1 from '../../assets/Expert.png'
import values2 from '../../assets/Quality.png'
import values3 from '../../assets/community.png'
import aboutUs from '../../assets/about.jpg'

const testimonials = [
    {
        id: 1,
        name: "Leslie Alexander",
        location: "Moncton, Canada",
        title: "Neque porro quisquam est qui dolum",
        description: "It is a long established fact that a reader will be tracked distracted by the readable content of a page is when looking at its layout. The point of using Lorem of distribution it look like readable English",
        image: gallery3
    },
    {
        id: 2,
        name: "Sarah Johnson",
        location: "Toronto, Canada",
        title: "Amazing service and beautiful results",
        description: "I've been coming here for years and they never disappoint. The stylists are professional, skilled, and truly understand how to work with my hair type. Highly recommended!",
        image: gallery1
    },
    {
        id: 3,
        name: "Maria Rodriguez",
        location: "Vancouver, Canada",
        title: "Best hair salon in the city",
        description: "The team here is incredible! They listened to what I wanted and delivered beyond my expectations. My hair has never looked better and I get compliments everywhere I go.",
        image: gallery2
    },
    {
        id: 4,
        name: "Jennifer Brown",
        location: "Montreal, Canada",
        title: "Professional and friendly staff",
        description: "From the moment I walked in, I felt welcomed and comfortable. The stylist took time to understand my hair needs and the result was absolutely stunning.",
        image: gallery4
    }
]

const values = [
    {
        id: 1,
        title: "Expert Hairstylist",
        description: "We have a team of expert hairstylists who are dedicated to providing the best possible service to our clients.",
        image: values1
    },
    {
        id: 2,
        title: "Expert Hairstylist",
        description: "We have a team of expert hairstylists who are dedicated to providing the best possible service to our clients.",
        image: values2
    },

    {
        id: 3,
        title: "Expert Hairstylist",
        description: "We have a team of expert hairstylists who are dedicated to providing the best possible service to our clients.",
        image: values3
    },



]
const testimonialTitle = "TESTIMONIALS"
const testimonialDescription = "What Our Clients Say"

const About = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className='bg-brown-31'>
                <div className='container'>
                    <div className='py-20 flex flex-col justify-center items-center'>
                        <p className='font-manrope  text-sm font-semibold text-background  mb-[2px]'>NEARBY Hairstylist</p>
                        <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-light-brown-c1 font-bold leading-none mb-4  max-w-[545px] mb-[32px]'>The story behind Crownity – celebrating every crown 👑</h2>

                        <ButtonSquare className='bg-background text-brown-A43  text-sm rounded-none'>CONTACT US</ButtonSquare               >
                    </div>
                </div>
            </div>
            {/* Testimonials Section */}
            <TestimonialSwiper testimonials={testimonials} title={testimonialTitle} description={testimonialDescription} />

            {/* Values Section */}
            <div>
                <div className='container'>
                    <div className=' py-14 md:py-24    xl:py-40'>
                        <div className='flex flex-col gap-14 justify-center items-center'>
                            <div>

                                <p className='font-manrope  text-sm font-semibold text-brown-A43  mb-[10px]'>Our Values</p>
                                <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black-14 font-bold leading-none mb-4   '>The values we stand for at Crownity</h2>
                            </div>


                            <div className='flex flex-col [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-white-d3 [&>*:not(:last-child)]:pb-9 [&>*:not(:last-child)]:mb-9'>

                                {values.map((value) => (
                                    <div key={value.id} className='w-full'>
                                        <ValuesCard values={value} />
                                    </div>
                                ))}

                            </div>





                        </div>
                    </div>
                </div>
            </div>

            {/* Brides Section */}

            {/* <div className='bg-light-brown-c1-o5'>

                <div className='container '>


                    <div className='py-[74px]  lg:px-[120px]  xl:px-[150px]'>
                        <div className='bg-brown-31'>
                            <div className='px-[72px] py-[72px]'>
                                <div className='grid grid-cols-2 place-items-start'>
                                    <div className=''>
                                        <div className='w-full h-full'>
                                            <img src={aboutUs} alt="aboutUs" className='w-full h-full' />
                                        </div>
                                    </div>
                                    <div className=' flex flex-col items-start '>
                                        <p className='font-manrope text-sm font-semibold text-background  mb-[10px]'>ABOUT US</p>
                                        <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-background font-bold leading-none mb-4 text-left '>It’s the bridge between Hairstylist and clients.</h2>
                                        <p className='font-manrope text-sm font-semibold text-background  mb-[10px] text-left  leading-10'>Crownity was created with one mission: to simplify the way clients find and book Afro/Black hairstylists in Canada.  Whether you’re looking for braids, twists, loc maintenance, or a silk press, Crownity helps you connect with Hairstylist who truly understand your hair.
One easy-to-use platform that supports Hairstylist to grow their business while giving clients a trusted space to explore, book, and celebrate their crow</p>
                                                                                                                            </div> 
                                    </div>

                                </div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default About