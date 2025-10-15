

import React, { useState, useContext } from "react";
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox, MdPhone } from "react-icons/md";
import { FaCheck, FaRegUser, FaStore } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { TbBasketDollar } from "react-icons/tb";
import { LuPaperclip } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ToastService, ToastContainerWrapper } from "../../utils/ToastService";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import useAPI from "../../services/baseUrl/useApiHook";
import signup from "../../assets/HG5.png";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { AuthContext } from "../../services/context/AuthContext";
import MapSearchField from "../../components/ui/MapSearchField";
import { FileUploadField } from "../../components/ui/FileUploadField";

import { googleMapsApiKey, googleMapsLibraries } from "../../utils/MapUtils/MapConfig";
const SignupClient = () => {
    const [activeStep, setActiveStep] = useState(0);
    const totalSteps = 3;
    const API = useAPI();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);


    const [isLoading, setIsLoading] = useState(false);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey,
        libraries: googleMapsLibraries,
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        businessName: "",
        businessDescription: "",
        operatingHours: "",
        businessPhone: "",
        longitude: "",
        latitude: "",
        state: "",
        city: "",
        postalCode: "",
        streetAddress: "",
    });

    const [businessRegistrationDoc, setBusinessRegistrationDoc] = useState([]);
    const [businessNICPhoto, setBusinessNICPhoto] = useState([]);
    const [businessPhotos, setBusinessPhotos] = useState([]);
    const [businessFeaturedImage, setBusinessFeaturedImage] = useState([]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (validateStep()) {
            if (activeStep < totalSteps - 1) setActiveStep((prev) => prev + 1);
        }
    };

    const handleroleType = (roleType) => {
        localStorage.setItem("roleType", roleType);
    };

    const validateStep = () => {
        let newErrors = {};

        if (activeStep === 0) {
            if (!formData.name.trim()) newErrors.name = "Name is required";
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email))
                newErrors.email = "Enter a valid email";
            if (!formData.phone.trim()) newErrors.phone = "Phone is required";
            if (!formData.password.trim()) newErrors.password = "Password is required";
            else if (formData.password.length < 6)
                newErrors.password = "Password must be at least 6 characters";
            if (formData.confirmPassword !== formData.password)
                newErrors.confirmPassword = "Passwords do not match";
        } else if (activeStep === 1) {
            if (!formData.businessName.trim())
                newErrors.businessName = "Business name is required";
            if (!formData.streetAddress.trim())
                newErrors.streetAddress = "Address is required";
            if (!formData.businessPhone.trim())
                newErrors.businessPhone = "Business phone is required";
        } else if (activeStep === 2) {
            if (businessRegistrationDoc.length === 0)
                newErrors.businessRegistrationDoc = "Registration document is required";
            if (businessNICPhoto.length === 0)
                newErrors.businessNICPhoto = "ID document is required";
            if (businessPhotos.length === 0)
                newErrors.businessPhotos = "Business photo is required";
            if (businessFeaturedImage.length === 0)
                newErrors.businessFeaturedImage = "Featured image is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceChanged = (locationData) => {
        setFormData((prev) => ({
            ...prev,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            postalCode: locationData.postalCode,
            state: locationData.state,
            city: locationData.city,
            streetAddress: locationData.streetAddress,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) return;

        try {
            setIsLoading(true);

            const payload = new FormData();

            // ✅ Append all form fields
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, value);
            });

            // ✅ Helper to append multiple or single files
            const appendFiles = (files, key) => {
                if (Array.isArray(files)) {
                    files.forEach((file) => payload.append(key, file));
                } else if (files) {
                    payload.append(key, files);
                }
            };

            appendFiles(businessRegistrationDoc, "businessRegistrationDoc");
            appendFiles(businessNICPhoto, "businessNICPhoto");
            appendFiles(businessPhotos, "businessPhotos");
            appendFiles(businessFeaturedImage, "businessFeaturedImage");

            // ✅ API request
            const response = await API.post("/api/auth/business/signup", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(response, "Signup Response");



            console.log(response.data.responseData.user, "Comming APi Response")
            const token = response.data?.responseData?.user?.accessToken;
            const user = response.data?.responseData?.user?.user;

            console.log(token, user, "Token and User");

            if (token && user) {
                ToastService.success("Signup successful!");

                // Save role or any extra info
                handleroleType(user?.roleType);
                auth.login(user, token);


                navigate("/profile-under-review");
            }
        } catch (error) {
            // ✅ Centralized error handling

            console.log(error, "Error");
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };


    // if (!isLoaded) return <p>Loading Google Maps...</p>;

    return (
        <div className="bg-background">
            <div className="flex flex-col md:flex-row gap-x-[30px] md:gap-x-[140px]">
                {/* Left section */}
                <div className="w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center">
                    <h1 className="md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left">
                        Sign Up as a Hairstylist
                    </h1>

                    {/* Stepper */}
                    <div className="flex items-center w-full">
                        {Array.from({ length: totalSteps }, (_, i) => (
                            <React.Fragment key={i}>
                                <div
                                    onClick={() => setActiveStep(i)}
                                    className={`w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-500 ${activeStep >= i ? "bg-brown-A43" : "bg-gray-300"
                                        }`}
                                >
                                    <FaCheck className="text-white text-sm" />
                                </div>
                                {i < totalSteps - 1 && (
                                    <div
                                        className={`flex-1 h-[3px] mx-2 rounded-lg transition-colors duration-500 ${activeStep > i ? "bg-brown-A43" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {activeStep === 0 && (
                            <>
                                <InputField
                                    icon={<FaRegUser size={22} />}
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <InputField
                                    icon={<MdForwardToInbox size={22} />}
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <InputField
                                    icon={<MdPhone size={22} />}
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                />
                                <InputField
                                    icon={<LiaKeySolid size={22} />}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                                <InputField
                                    icon={<LiaKeySolid size={22} />}
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                />
                            </>
                        )}

                        {activeStep === 1 && (
                            <>
                                <InputField
                                    icon={<FaStore size={22} />}
                                    name="businessName"
                                    placeholder="Business Name"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    error={errors.businessName}
                                />
                                <InputField
                                    icon={<IoNewspaperOutline size={22} />}
                                    name="businessDescription"
                                    placeholder="Business Description"
                                    value={formData.businessDescription}
                                    onChange={handleChange}
                                />


                                <div className="flex gap-3 items-center">

                                    <MapSearchField value={formData.streetAddress} onChange={handlePlaceChanged} />

                                    {errors.streetAddress && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.streetAddress}
                                        </p>
                                    )}
                                </div>

                                <InputField
                                    icon={<MdPhone size={22} />}
                                    name="businessPhone"
                                    placeholder="Business Phone"
                                    value={formData.businessPhone}
                                    onChange={handleChange}
                                    error={errors.businessPhone}
                                />
                                <InputField
                                    icon={<GrServices size={22} />}
                                    name="operatingHours"
                                    placeholder="Operating Hours"
                                    value={formData.operatingHours}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        {activeStep === 2 && (
                            <>
                                <FileUploadField
                                    label="Upload Registration Doc"
                                    files={businessRegistrationDoc}
                                    setFiles={setBusinessRegistrationDoc}
                                    error={errors.businessRegistrationDoc}
                                    maxFiles={1}
                                />
                                <FileUploadField
                                    label="Upload ID"
                                    files={businessNICPhoto}
                                    setFiles={setBusinessNICPhoto}
                                    error={errors.businessNICPhoto}
                                    maxFiles={2}
                                />
                                <FileUploadField
                                    label="Business Photos"
                                    files={businessPhotos}
                                    setFiles={setBusinessPhotos}
                                    error={errors.businessPhotos}
                                    maxFiles={4}
                                />
                                <FileUploadField
                                    label="Featured Image"
                                    files={businessFeaturedImage}
                                    setFiles={setBusinessFeaturedImage}
                                    error={errors.businessFeaturedImage}
                                    maxFiles={1}
                                />
                                <ButtonSquare
                                    className="w-full bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope"
                                    variant="secondary"
                                    type="submit"
                                >
                                    Sign Up
                                </ButtonSquare>
                            </>
                        )}

                        {activeStep < totalSteps - 1 && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full bg-brown-A43 text-white font-bold py-2 rounded hover:bg-brown-700"
                            >
                                Continue
                            </button>
                        )}
                    </form>

                    <div className="inline-flex items-center justify-center w-full relative mt-6">
                        <hr className="w-[99%] h-1 bg-blueEC border-0 rounded-sm" />
                        <div className="absolute px-6 -translate-x-1/2 left-1/2 bg-background">
                            <p className="text-blueCD text-[14px] font-manrope">or</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <p className="text-blueB8 text-[15px] font-poppins font-semibold">
                            Already have an account?{" "}
                            <Link
                                to="/signin-client"
                                className="text-brown-A43 font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right side image */}
                <div
                    className="w-full md:w-1/2 xl:w-2/3 hidden md:block"
                    style={{
                        backgroundImage: `url(${signup})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </div>

            <ToastContainerWrapper />
        </div>
    );
};

// 🔹 Input Field
const InputField = ({ icon, error, ...props }) => (
    <div className="p-[10px] border border-white-E9 rounded-[5px]">
        <div className="flex gap-3 items-center">
            <div className="text-blueCD">{icon}</div>
            <input
                {...props}
                className="focus:outline-none border-none w-full bg-transparent"
            />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

// 🔹 Multiple File Upload Field

export default SignupClient;







