import React, { useState, useRef, useEffect } from 'react'

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

import checkvector from '../../assets/CheckVerctor.png'
import video from "../../assets/video.mp4"
import { Link } from 'react-router-dom'
import { FaPlay, FaPause } from 'react-icons/fa'

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
        title: "Trust & Excellence",
        description: "We connect clients with verified, skilled Afro and curly hairstylists who care about quality, professionalism, and delivering exceptional results every time",
        image: values1
    },
    {
        id: 2,
        title: "Community & Empowerment",
        description: "Crownity is more than a platform its a community that celebrates Black beauty, supports hairstylists, and empowers clients to feel confident in their crown",
        image: values2
    },

    {
        id: 3,
        title: "Authenticity & Representation",
        description: "We take pride in representing diverse textures and styles with authenticity, creating a space where every curl, coil, and braid is valued and celebrated.",
        image: values3
    },



]


const principleData = [
    {
        icon: checkvector,
        title: "Accessibility",
        description: "Easy search by city, style, or budget."
    },
    {
        icon: checkvector,
        title: "Empowerment",
        description: "Helping Hairstylist showcase their talent and gro"
    },

    {
        icon: checkvector,
        title: "Trust ",
        description: "Verified profiles, secure payments, and honest reviews."
    },
]
const testimonialTitle = "TESTIMONIALS"
const testimonialDescription = "What Our Clients Say"

const About = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)
    const videoContainerRef = useRef(null)

    // Intersection Observer to handle video visibility
    useEffect(() => {
        const videoElement = videoRef.current
        const videoContainer = videoContainerRef.current

        if (!videoElement || !videoContainer) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Video is visible - don't auto-play, let user control
                        // The video will only play if user manually clicked play
                        console.log('Video is visible in viewport')
                    } else {
                        // Video is not visible - pause it automatically
                        if (!videoElement.paused) {
                            videoElement.pause()
                            setIsPlaying(false)
                            console.log('Video paused - out of viewport')
                        }
                    }
                })
            },
            {
                threshold: 0.3, // Trigger when 30% of video is visible
                rootMargin: '0px'
            }
        )

        observer.observe(videoContainer)

        return () => {
            observer.disconnect()
        }
    }, [])

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
                videoRef.current.muted = true  // Mute when paused
            } else {
                videoRef.current.muted = false  // Unmute when playing
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div>
            {/* Hero Section */}
            <div className='bg-brown-31'>
                <div className='container'>
                    <div className='py-20 flex flex-col justify-center items-center'>
                        <p className='font-manrope  text-sm font-semibold text-background  mb-[2px]'>NEARBY Hairstylist</p>
                        <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-light-brown-c1 font-bold leading-none mb-4  max-w-[610px] mb-[32px]'>The story behind Crownity – celebrating every crown 👑</h2>

                        <Link to="/contact"><ButtonSquare className='bg-background text-brown-A43  text-sm rounded-none'>CONTACT US</ButtonSquare></Link>
                    </div>
                </div>
            </div>
            {/* Testimonials Section */}


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
                                <div className='grid grid-cols-2   gap-x-10 place-items-start'>
                                    <div className=' relative'>
                                        <div className='w-[587px] h-[734px]  aboslute top-[-67px]  left-[-20px] '>
                                            <img src={aboutUs} alt="aboutUs" className='w-full h-full' />
                                        </div>
                                    </div>
                                    <div className=' flex flex-col items-start '>
                                        <p className='font-manrope text-sm font-semibold text-background  mb-[10px]'>ABOUT US</p>
                                        <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-background font-bold leading-none mb-4 text-left '>It’s the bridge between Hairstylist and clients.</h2>
                                        <p className='font-manrope text-sm font-semibold text-background  mb-[10px] text-left  leading-10'>Crownity was created with one mission: to simplify the way clients find and book Afro/Black hairstylists in Canada. Whether you’re looking for braids, twists, loc maintenance, or a silk press, Crownity helps you connect with Hairstylist who truly understand your hair.
                                            One easy-to-use platform that supports Hairstylist to grow their business while giving clients a trusted space to explore, book, and celebrate their crow</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


            {/* Jouney Section */}

            <div className='bg-background'>
                <div className='grid grid-cols-1  gap-[40px] lg:gap-[100px]  xl:gap-[100px]  lg:grid-cols-2 py-36 '>
                    <div className=' pl-[1rem] sm:pl-[2rem]  lg:pl-[3rem] xl:pl-[4rem]   2xl:pl-[5rem]   3xl:pl-[120px]  pb-[160px]  flex flex-col gap-[35px items-start]  order-2 lg:order-1 '>

                        <div>

                            <p className='font-manrope  text-sm font-semibold text-brown-A43  mb-[2px]  text-center lg:text-left'>What Includest</p>
                            <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-brown-A43 font-bold leading-none mb-[30px]  text-center lg:text-left '>The start of the journey.</h2>
                            <p className='font-manrope text-base font-semibold text-gray-55  text-left  leading-10 xl:max-w-[700px]'>Crownity was founded to solve a challenge many Canadians face—finding the right Afro/Black hairstylist with ease.
                                <br></br> Instead of scrolling through endless social media pages, Crownity brings everything into one place: Hairstylist profiles, services, galleries, pricing, and direct booking.</p>
                        </div>


                        <div className='flex flex-col gap-8'>
                            <p className='sm:text-2xl text-[18px] text-black font-bold text-black-14 font-playfair text-left'>
                                Our platform is built on three principles:
                            </p>




                            <div className='flex flex-col gap-[30px]'>
                                {principleData.map((items, index) => (
                                    <div className='flex gap-[30px]  ' key={index}>
                                        <div className='text-brown-A43'>
                                            <img src={items.icon} alt="checkvector" className='' />
                                        </div>

                                        <div className='flex flex-col gap-3 items-start '>
                                            <p className='   md:text-[22px] text-[18px] font-bold font-manrope text-black-14'> {items.title}</p>
                                            <p className='md:text-[19px] text-[16px] font-normal font-manrope text-gray-55 text-left'>{items.description}.</p>
                                        </div>
                                    </div>
                                ))}


                            </div>



                        </div>

                    </div>

                    <div className='relative  order-1 lg:order-2  px-[1rem] sm:-px-0 '    >
                        <div ref={videoContainerRef} className='h-full w-full  '>
                            <video
                                ref={videoRef}
                                src={video}
                                muted={true}
                                loop
                                className='w-full h-full object-fill'
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                            </video>

                            <div className='absolute top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center'>

                                <div
                                    className='w-[70px] h-[70px] rounded-full bg-background flex justify-center items-center text-brown-A43 cursor-pointer hover:bg-gray-100 transition-colors'
                                    onClick={togglePlayPause}
                                >
                                    {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <TestimonialSwiper testimonials={testimonials} title={testimonialTitle} description={testimonialDescription} />

        </div>
    )
}

export default About