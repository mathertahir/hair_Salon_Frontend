import React, { useContext, useState } from "react";
import email from "../../assets/call.png";
import message from "../../assets/message.png";
import home from "../../assets/Home.png";
import reachBg from "../../assets/bgreach.png";
import pic from "../../assets/reachoutpic.jpg";
import { MdOutlinePerson } from "react-icons/md";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";

import { MdForwardToInbox } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";

import { ButtonSquare } from "../../components/ui/buttonSquare";

const reachData = [
  {
    icon: home,
    title: "Visit Us :",
    description: "mycrownity.com",
  },
  {
    icon: message,
    title: "Drop Us :",
    description: "contact@mycrownity.com",
  },
  // {
  //   icon: email,
  //   title: "Call Us :",
  //   description: "Call: 1-800-123-9999",
  // },
];

const Contact = () => {
  const API = useAPI();
  const auth = useContext(AuthContext);

  const [name, setName] = useState("");
  const [emailField, setEmailField] = useState("");
  const [messageField, setMessageField] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !emailField || !messageField) {
      ToastService.error("Please fill all required fields.");
      return;
    }

    const payload = {
      name,
      email: emailField,
      description: messageField,
      userId: auth?.user?._id || null, // send userId if logged in
    };

    try {
      setLoading(true);

      const response = await API.post(`/api/user/contact`, payload);

      const responseMessage =
        response.data?.responseMessage?.[0] || "Message sent successfully!";
      ToastService.success(responseMessage);

      // Reset Form Fields
      setName("");
      setEmailField("");
      setMessageField("");
    } catch (error) {
      console.error("Contact form failed:", error);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-brown-31">
        <div className="container">
          <div className="py-20 flex flex-col justify-center items-center">
            <p className="font-manrope  text-sm font-semibold text-background  mb-[2px]">
              GET IN TOUCH WITH US
            </p>
            <h2 className=" sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-light-brown-c1 font-bold leading-none mb-4  max-w-[545px] mb-[32px]">
              We’re Here to Help You Shine, Anytime ✨
            </h2>
          </div>
        </div>
      </div>

      {/* Reach Out Section */}

      <div className="bg-background">
        <div className="container">
          <div className="grid  grid-cols-1  md:grid-cols-2  gap-[112px]  px-0  md:px-[60px] lg:px-[150px]    xl:px-[240px]  py-[160px] ">
            <div className="">
              <div className="relative w-full">
                <img src={reachBg} alt="reachBg  " className="w-fill" />

                <div className="absolute   top-[30px] right-[8px]  sm:top-[70px] sm:right-[21px]  lg:top-[40px] lg:right-[32px]   w-full">
                  <img src={pic} alt="pic" className="w-full" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 items-start justify-start text-left">
              <div>
                <p className="font-manrope  text-sm font-semibold text-brown-A43  mb-[2px]  text-center lg:text-left">
                  Get in Touch!
                </p>
                <h2 className=" sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-black-14 font-bold leading-none mb-[30px]  text-center lg:text-left ">
                  Reach out to Crownity Support
                </h2>
                <p className="font-manrope text-base font-semibold text-gray-55  text-left  leading-5 xl:max-w-[700px]">
                  Whether you’re a Hairstylist looking to join, or a client
                  searching for the perfect match, we’d love to hear from you.
                </p>
              </div>

              <div className="flex flex-col gap-10 items-start justify-start text-left">
                {reachData.map((items, index) => (
                  <div className="flex gap-6">
                    <div>
                      <img src={items.icon} alt="email" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="   md:text-[22px] text-[18px] font-bold font-manrope text-black-14">
                        {" "}
                        {items.title}
                      </p>
                      <p className="md:text-[19px] text-[16px] font-normal font-manrope text-gray-55 text-left">
                        {items.description}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}

      {/* <div className='bg-brown-E0'>
        <div className='container'>
          <div className='grid grid-12 gap-10  py-20 px-0 md:px-[60px] lg:px-[150px]    2xl:px-[335px]'>

            <div className='flex justify-center items-center'>
              <div className='xl:max-w-[500px] flex justify-center items-center'>

                <div>                        <p className='font-manrope  text-base font-semibold text-brown-A43 mb-[2px]'>SCHEDULE YOUR PRESENCE</p>
                  <h2 className=' sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-brown-31 font-bold leading-none mb-4'>Get in touch</h2>
                  <p className='font-manrope font-normal text-xl text-gray-55'>Fill out the form below and our team will respond within 24 hours.</p></div>
              </div>
            </div>

            <form className='bg-background rounded-[5px]'>
              <div className='p-[30px] sm-p-[30px]  lg:p-[60px]  xl:p-[100px] flex flex-col gap-[16px]'>

                <div className='p-[24px] border-[1px] border-gray-55 rounded-[5px]  '>
                  <div className='flex gap-3 items-center '>
                    <div className='text-brown-A43'>
                      <MdOutlinePerson size={24} />
                    </div>
                    <input
                      className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                      type="text"
                      placeholder='Name'
                    />

                  </div>

                </div>
                <div className='p-[24px] border-[1px] border-gray-55 rounded-[5px] '>
                  <div className='flex gap-3 items-center '>
                    <div className='text-brown-A43'>
                      <MdForwardToInbox size={24} />
                    </div>
                    <input
                      className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                      type="email"
                      placeholder='Email'
                    />

                  </div>

                </div>


                <div className='p-[24px] border-[1px] border-gray-55 rounded-[5px] '>
                  <div className='flex gap-3 items-start justify-start '>
                    <div className='text-brown-A43'>
                      <IoBookOutline size={24} />
                    </div>
                    <textarea
                      className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                      type="text"
                      placeholder='Service you Need'
                      rows={4}

                    />

                  </div>

                </div>



                <ButtonSquare className='w-full bg-brown-A43 text-background  p-[32px]  font-extrabold text-[14px] font-manrope' variant='secondary' >Submit</ButtonSquare>

              </div>
            </form>


          </div>
        </div>
      </div> */}
      <div className="bg-brown-E0">
        <div className="container">
          <div className="grid grid-12 gap-10 py-20 px-0 md:px-[60px] lg:px-[150px] 2xl:px-[335px]">
            <div className="flex justify-center items-center">
              <div className="xl:max-w-[500px] flex justify-center items-center">
                <div>
                  <p className="font-manrope text-base font-semibold text-brown-A43 mb-[2px]">
                    SCHEDULE YOUR PRESENCE
                  </p>
                  <h2 className="sm:text-[40px] text-[22px] lg:text-[45px] font-playfair text-brown-31 font-bold leading-none mb-4">
                    Get in touch
                  </h2>
                  <p className="font-manrope font-normal text-xl text-gray-55">
                    Fill out the form below and our team will respond within 24
                    hours.
                  </p>
                </div>
              </div>
            </div>

            <form
              className="bg-background rounded-[5px]"
              onSubmit={handleContactSubmit}
            >
              <div className="p-[30px] sm-p-[30px] lg:p-[60px] xl:p-[100px] flex flex-col gap-[16px]">
                <div className="p-[24px] border-[1px] border-gray-55 rounded-[5px]">
                  <div className="flex gap-3 items-center">
                    <MdOutlinePerson size={24} className="text-brown-A43" />
                    <input
                      className="focus:outline-none w-full bg-transparent"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="p-[24px] border-[1px] border-gray-55 rounded-[5px]">
                  <div className="flex gap-3 items-center">
                    <MdForwardToInbox size={24} className="text-brown-A43" />
                    <input
                      className="focus:outline-none w-full bg-transparent"
                      type="email"
                      placeholder="Email"
                      value={emailField}
                      onChange={(e) => setEmailField(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="p-[24px] border-[1px] border-gray-55 rounded-[5px]">
                  <div className="flex gap-3 items-start">
                    <IoBookOutline size={24} className="text-brown-A43" />
                    <textarea
                      className="focus:outline-none w-full bg-transparent"
                      placeholder="Service you Need"
                      rows={4}
                      value={messageField}
                      onChange={(e) => setMessageField(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <ButtonSquare
                  className="w-full bg-brown-A43 text-background p-[32px] font-extrabold text-[14px] font-manrope"
                  variant="secondary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </ButtonSquare>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
