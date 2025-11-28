import React, { useContext, useState } from "react";
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import google from "../../assets/google.webp";
import facebook from "../../assets/fb.webp";
import signup from "../../assets/HG5.webp";
import { Link, useNavigate } from "react-router-dom";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { AuthContext } from "../../services/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputPassword from "../../components/ui/InputPassword";
import useAPI from "../../services/baseUrl/useApiHook"; // make sure this import path is correct
import { ToastService } from "../../utils/ToastService";

const SignupClient = () => {
  const API = useAPI();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleroleType = (roleType) => {
    localStorage.setItem("roleType", roleType);
  };

  // ✅ Validation Schema
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // ✅ Form submit handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        // Assuming 1 is client
      };

      const response = await API.post("/api/auth/signup", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data?.responseData?.data?.accessToken;
      const user = response.data?.responseData?.data?.user;

      console.log(token, user);

      if (token && user) {
        ToastService.success(`${response.data.responseMessage}`);
        handleroleType(user?.roleType);
        auth.login(user, token);
        navigate("/");
      }

      resetForm();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px] mx-0 px-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center">
          <h1 className="md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left">
            Sign Up
          </h1>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                {/* Name */}
                <div className="p-[10px] border-[1px] border-white-E9 rounded-[5px]">
                  <div className="flex gap-3 items-center">
                    <div className="text-blueCD">
                      <FaRegUser size={24} />
                    </div>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div className="p-[10px] border-[1px] border-white-E9 rounded-[5px]">
                  <div className="flex gap-3 items-center">
                    <div className="text-blueCD">
                      <MdForwardToInbox size={24} />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div className="p-[10px] border-[1px] border-white-E9 rounded-[5px]">
                  <div className="flex gap-3 items-center">
                    <div className="text-blueCD">
                      <LiaKeySolid size={24} />
                    </div>
                    <InputPassword
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Confirm Password */}
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
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <ButtonSquare
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope"
                  variant="secondary"
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </ButtonSquare>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="inline-flex items-center justify-center w-full relative">
            <hr className="w-[99%] h-1 bg-blueEC border-0 rounded-sm" />
            <div className="absolute px-6 my-3 -translate-x-1/2 left-1/2 bg-background flex justify-center items-center">
              <p className="text-blueCD text-[14px] font-manrope">or</p>
            </div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col md:gap-[104px] gap-[60px]">
            <div className="flex gap-10 sm:flex-row flex-col items-center justify-center">
              <ButtonSquare
                className="px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px] rounded-[8px] w-full sm:w-auto"
                variant="outline"
              >
                <img src={google} className="w-[24px] h-[24px]" alt="google" />
                <p className="text-black text-[14px] font-manrope font-bold ml-2">
                  Google
                </p>
              </ButtonSquare>

              <ButtonSquare
                className="px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px] rounded-[8px] w-full sm:w-auto"
                variant="outline"
              >
                <img
                  src={facebook}
                  className="w-[24px] h-[24px]"
                  alt="facebook"
                />
                <p className="text-black text-[14px] font-manrope font-bold ml-2">
                  Facebook
                </p>
              </ButtonSquare>
            </div>

            {/* Login Redirect */}
            <div className="flex gap-[6px] justify-center items-center">
              <p className="text-blueB8 text-[15px] font-poppins font-semibold">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div
          className="w-full md:w-1/2 xl:w-2/3 hidden md:block"
          style={{
            backgroundImage: `url(${signup})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default SignupClient;
