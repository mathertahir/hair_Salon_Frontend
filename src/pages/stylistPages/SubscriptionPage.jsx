import React from "react";
import { ButtonSquare } from "../../components/ui/buttonSquare";

const SubscriptionPage = () => {
  return (
    <div>
      <>
        <div className=" ">
          <div className="w-full  ">
            <div className="flex flex-col gap-6 h-full">
              <div className="flex    flex-col  xs:flex-row   justify-between xs:items-center gap-2 flex-wrap">
                <div className="flex flex-col gap-6">
                  <h1 className="md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope">
                    Subscription Status
                  </h1>
                </div>
                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                  Active
                </p>
              </div>

              <div className="flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap">
                <div className="flex flex-col gap-6">
                  <h1 className="md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope">
                    Subscription Start Date{" "}
                  </h1>
                </div>
                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                  08 September 2024
                </p>
              </div>

              <div className="flex  flex-col  xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                <div className="flex flex-col gap-6">
                  <h1 className="md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope">
                    Subscription Expiry Date{" "}
                  </h1>
                </div>
                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                  08 October 2024
                </p>
              </div>
              <div className="flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap">
                <div className="flex flex-col gap-6">
                  <h1 className="md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope">
                    Subscription Type
                  </h1>
                </div>
                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                  Premium($49/month)
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-6">
                  <h1 className="md:text-[35px] text-[20px]   font-bold text-brown-A43 font-manrope">
                    Payment Card Info:
                  </h1>
                </div>
                {/* <p className='text-[20px] font-bold font-manrope text-green-800'>Premium</p> */}
              </div>

              <div className="flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap">
                <div className="flex flex-col gap-6">
                  <h1 className="md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope">
                    CardBrand
                  </h1>
                </div>

                <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
                  {/* <div className='w-[120px] h-[50px]'>
                                                                <img src={mastercard} className='object-fit w-full h-full'></img>
                                                            </div> */}
                  <span className="ml-2">MasterCard</span>
                </p>
              </div>
              <div className="flex flex-col  xs:flex-row  justify-between xs:items-center gap-2 flex-wrap">
                <div className="flex flex-col gap-6">
                  <h1 className="md:text-[25px] text-[14px]   font-bold text-black-14 font-manrope">
                    Card Number
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
                    **** **** ****{" "}
                  </p>
                  <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43 flex items-center">
                    4242{" "}
                  </p>
                </div>
              </div>

              <div className="grid  grid-cols-1 gap-4 w-full">
                <div className="w-full">
                  <ButtonSquare
                    className={`w-full bg-transparent  text-brown-A43  py-[32px] px-[110px]  font-extrabold text-[14px] font-manrope hover:bg-brown-A43 text-background'  bg-brown-A43-o20 text-brown-A43' hover:bg-brown-A43 hover:text-background`}
                    variant="secondary"
                  >
                    Cancel Subscription
                  </ButtonSquare>
                </div>
              </div>

              <div className="flex "></div>
              {/* <div className='p-[57px]     bg-brown-A43 rounded-[30px] h-full flex flex-col group transition-colors duration-300 ease-in-out'>
    
    
                                                    <div className='flex flex-col gap-20 flex-1'>
                                                        <div className='flex flex-col gap-10 '>
                                                            <div className='flex flex-col gap-3'>
                                                                <p className='md:text-[40px] text-[20px]   font-bold  font-playfair  text-background transition-colors duration-300 ease-in-out'>$0/mo</p>
                                                                <p className='text-[20px] font-normal font-playfair  text-background transition-colors duration-300 ease-in-out'>Try it as long as you like</p>
                                                            </div>
    
                                                            <div className='flex lg:flex-row flex-col   lg:gap-[80px] gap-[50px]'>
                                                                <ul className='flex flex-col gap-3'>
                                                                    <li className='flex gap-3 items-center'>
                                                                        <div className=' text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                        <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Full profile customizatione</p>
                                                                    </li>
                                                                    <li className='flex gap-3 items-center'>
                                                                        <div className=' text-background transition-colors duration-300 ease-in-out'> <FaCheck size={15} /></div>
                                                                        <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Unlimited services</p>
                                                                    </li>
                                                                    <li className='flex gap-3 items-center'>
                                                                        <div className=' text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                        <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Unlimited bookings</p>
                                                                    </li>
                                                                </ul>
    
                                                                <ul className='flex flex-col gap-3 '>
                                                                    <li className='flex gap-3 items-center'>
                                                                        <div className='text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                        <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Calendar sync </p>
                                                                    </li>
                                                                    <li className='flex gap-3 items-center'>
                                                                        <div className='text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                        <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Appointment reminders </p>
                                                                    </li>
                                                                    <li className='flex gap-3 items-center'>
                                                                        <div className='text-background transition-colors duration-300 ease-in-out'><FaCheck size={15} /></div>
                                                                        <p className='text-[20px] font-normal font-playfair text-background transition-colors duration-300 ease-in-out'>Unlimited client reviews</p>
                                                                    </li>
                                                                </ul>
                                                            </div>
    
    
    
                                                        </div>
    
    
                                                        <div className=' mt-auto'>
    
                                                            <ButtonSquare className=' rounded-[32px]    py-[32px] 2xl:px-[100px] px-[50px]  font-extrabold text-[14px] font-manrope  bg-background  text-brown-A43 transition-colors duration-300 ease-in-out w-full lg:w-auto' variant='secondary' disabled >Contine Payment</ButtonSquare>
    
    
                                                        </div>
    
                                                    </div>
                                                </div> */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SubscriptionPage;
