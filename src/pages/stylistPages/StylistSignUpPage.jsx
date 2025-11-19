import React, { useState, useContext } from "react";
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox, MdPhone } from "react-icons/md";
import { FaCheck, FaRegUser, FaStore } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ToastService, ToastContainerWrapper } from "../../utils/ToastService";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import useAPI from "../../services/baseUrl/useApiHook";
import signup from "../../assets/HG5.png";
import { useJsApiLoader } from "@react-google-maps/api";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { AuthContext } from "../../services/context/AuthContext";
import MapSearchField from "../../components/ui/MapSearchField";
import { FileUploadField } from "../../components/ui/FileUploadField";
import {
  googleMapsApiKey,
  googleMapsLibraries,
} from "../../utils/MapUtils/MapConfig";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputPassword from "../../components/ui/InputPassword";

// ✅ Yup Validation Schemas per step
const StepSchemas = [
  Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  }),
  Yup.object({
    businessName: Yup.string().required("Business name is required"),
    streetAddress: Yup.string().required("Address is required"),
  }),
  Yup.object(), // file validation handled manually
];

const StylistSignUpPage = () => {
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

  const [businessRegistrationDoc, setBusinessRegistrationDoc] = useState([]);
  const [businessNICPhoto, setBusinessNICPhoto] = useState([]);
  const [businessPhotos, setBusinessPhotos] = useState([]);
  const [businessFeaturedImage, setBusinessFeaturedImage] = useState([]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessDescription: "",
    operatingHours: "",
    operatingDays: "",
    longitude: "",
    latitude: "",
    state: "",
    city: "",
    postalCode: "",
    streetAddress: "",
  };

  const handleroleType = (roleType) => {
    localStorage.setItem("roleType", roleType);
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const payload = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        payload.append(key, value)
      );

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

      const response = await API.post("/api/auth/business/signup", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const token = response.data?.responseData?.user?.accessToken;
      const user = response.data?.responseData?.user?.user;
      const businessProfile = response.data?.responseData?.businessProfile;

      if (token && user) {
        ToastService.success("Signup successful!");
        handleroleType(user?.roleType);
        auth.handleBusinessProfile(businessProfile);
        auth.login(user, token);
        navigate("/");
      }
    } catch (error) {
      console.log(error, "Error");
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceChanged = (locationData, setFieldValue) => {
    setFieldValue("latitude", locationData.latitude);
    setFieldValue("longitude", locationData.longitude);
    setFieldValue("postalCode", locationData.postalCode);
    setFieldValue("state", locationData.state);
    setFieldValue("city", locationData.city);
    setFieldValue("streetAddress", locationData.streetAddress);
  };

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
                  className={`w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-500 ${
                    activeStep >= i ? "bg-brown-A43" : "bg-gray-300"
                  }`}
                >
                  <FaCheck className="text-white text-sm" />
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-[3px] mx-2 rounded-lg transition-colors duration-500 ${
                      activeStep > i ? "bg-brown-A43" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Formik Wrapper */}
          <Formik
            initialValues={initialValues}
            validationSchema={StepSchemas[activeStep]}
            onSubmit={async (values) => {
              if (activeStep < totalSteps - 1) {
                setActiveStep((prev) => prev + 1);
              } else {
                // Manual file validation
                const fileErrors = {};
                // if (businessRegistrationDoc.length === 0)
                //     fileErrors.businessRegistrationDoc = "Registration document is required";
                // if (businessNICPhoto.length === 0)
                //     fileErrors.businessNICPhoto = "ID document is required";
                // if (businessPhotos.length === 0)
                //     fileErrors.businessPhotos = "Business photo is required";
                // if (businessFeaturedImage.length === 0)
                //     fileErrors.businessFeaturedImage = "Featured image is required";

                if (Object.keys(fileErrors).length > 0) {
                  ToastService.error("Please upload all required documents.");
                  return;
                }
                await handleSubmit(values);
              }
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                {activeStep === 0 && (
                  <>
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">Name</p>
                      <InputField
                        icon={<FaRegUser size={22} />}
                        name="name"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && errors.name}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Email
                      </p>
                      <InputField
                        icon={<MdForwardToInbox size={22} />}
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && errors.email}
                      />
                    </div>

                    {/* <InputField
                                            icon={<MdPhone size={22} />}
                                            name="phone"
                                            placeholder="Phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            error={touched.phone && errors.phone}
                                        /> */}

                    {/* Password Field */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Password
                      </p>
                      <div className="px-[10px] border-[1px] border-white-E9 rounded-[5px]">
                        <div className="flex gap-3 items-center">
                          <div className="text-blueCD">
                            <LiaKeySolid size={22} />
                          </div>
                          <InputPassword
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                          />
                        </div>
                        {touched.password && errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Confirm Password
                      </p>
                      <div className="p-[10px] border-[1px] border-white-E9 rounded-[5px]">
                        <div className="flex gap-3 items-center">
                          <div className="text-blueCD">
                            <LiaKeySolid size={24} />
                          </div>
                          <InputPassword
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                        {touched.confirmPassword && errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Salon Name
                      </p>
                      <InputField
                        icon={<FaStore size={22} />}
                        name="businessName"
                        placeholder="Enter Your Salon Name"
                        value={values.businessName}
                        onChange={handleChange}
                        error={touched.businessName && errors.businessName}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Salon Description
                      </p>
                      <TextAreaField
                        icon={<IoNewspaperOutline size={22} />}
                        name="businessDescription"
                        placeholder="Business Description"
                        value={values.businessDescription}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Enter Your Location
                      </p>
                      <div className="flex flex-col gap-1">
                        <MapSearchField
                          value={values.streetAddress}
                          onChange={(data) =>
                            handlePlaceChanged(data, setFieldValue)
                          }
                        />
                        {touched.streetAddress && errors.streetAddress && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.streetAddress}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Operating Hours
                      </p>
                      <InputField
                        icon={<GrServices size={22} />}
                        name="operatingHours"
                        placeholder="4:00 AM - 5:00 PM"
                        value={values.operatingHours}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        Operating Days
                      </p>
                      <InputField
                        icon={<GrServices size={22} />}
                        name="operatingDays"
                        placeholder="Mon - Fri"
                        value={values.operatingDays}
                        onChange={handleChange}
                      />
                    </div>

                    {/* 
                                        <InputField
                                            icon={<MdPhone size={22} />}
                                            name="businessPhone"
                                            placeholder="Business Phone"
                                            value={values.businessPhone}
                                            onChange={handleChange}
                                            error={touched.businessPhone && errors.businessPhone}
                                        /> */}
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        {"Salon Photos (Optional)"}
                      </p>
                      <FileUploadField
                        label="Salon Photos (Optional)"
                        files={businessPhotos}
                        setFiles={setBusinessPhotos}
                        maxFiles={4}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-normal text-brown-A43">
                        {"Featured Image (Optional)"}
                      </p>
                      <FileUploadField
                        label="Featured Image (Optional)"
                        files={businessFeaturedImage}
                        setFiles={setBusinessFeaturedImage}
                        maxFiles={1}
                      />
                    </div>

                    <ButtonSquare
                      className="w-full bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope"
                      variant="secondary"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing Up..." : "Sign Up"}
                    </ButtonSquare>
                  </>
                )}

                {activeStep < totalSteps - 1 && (
                  <button
                    type="submit"
                    className="w-full bg-brown-A43 text-white font-bold py-2 rounded hover:bg-brown-700"
                  >
                    Continue
                  </button>
                )}
              </Form>
            )}
          </Formik>

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
                to={`/login/1`}
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

// 🔹 Input Field Component
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

const TextAreaField = ({ icon, error, ...props }) => (
  <div className="p-[10px] border border-white-E9 rounded-[5px]">
    <div className="flex gap-3 items-">
      <div className="text-blueCD">{icon}</div>
      <textarea
        {...props}
        className="focus:outline-none border-none w-full bg-transparent"
        rows={3}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default StylistSignUpPage;
