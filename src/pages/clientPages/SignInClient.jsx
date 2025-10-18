

import React, { useContext, useState } from "react";
import { LiaKeySolid } from "react-icons/lia";
import { MdForwardToInbox } from "react-icons/md";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import google from "../../assets/google.png";
import facebook from "../../assets/fb.png";
import signup from "../../assets/HG5.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { toast } from "react-toastify";

import InputPassword from "../../components/ui/InputPassword";

const SignInClient = () => {
    const { id } = useParams();
    const auth = useContext(AuthContext);
    const API = useAPI();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const url = id === "0" ? "api/auth/login" : "api/auth/business/login";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent page reload
        setIsLoading(true);

        try {
            const response = await API.post(url, {
                email: formData.email,
                password: formData.password,
            });

            const token = response.data?.responseData?.data.accessToken;
            const user = response.data?.responseData?.data.user;
            const roleType = response.data?.responseData?.data.user.roleType;
            const businessProfile = response.data?.responseData?.businessProfile

            console.log(businessProfile)
            const responseMessage = response.data?.responseMessage[0];

            if (auth && token && user) {
                auth.login(user, token);
                auth.handleRoleType(roleType);
                if (id === "1") {
                    auth.handleBusinessProfile(businessProfile)
                }
                toast.success(`${responseMessage}`);
                navigate("/");
            }
        } catch (error) {
            handleApiError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background">
            <div className="flex flex-col md:flex-row 2xl:gap-x-[140px] gap-x-[30px] mx-0 px-0">
                {/* ===== LEFT SIDE FORM ===== */}
                <div className="w-full md:w-1/2 xl:w-1/3 md:py-[170px] py-[60px] px-[1rem] sm:px-[20px] md:pl-[60px] xl:pl-[120px] flex flex-col gap-10 justify-center">
                    <h1 className="md:text-[30px] text-[20px] font-bold font-manrope text-black text-center sm:text-left">
                        Sign In
                    </h1>

                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                        {/* EMAIL FIELD */}
                        <div className="p-[10px] border-[1px] border-white-E9 rounded-[5px]">
                            <div className="flex gap-3 items-center">
                                <div className="text-blueCD">
                                    <MdForwardToInbox size={24} />
                                </div>
                                <input
                                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>

                        {/* PASSWORD FIELD */}
                        <div className="p-[10px] border-[1px] border-white-E9 rounded-[5px]">
                            <div className="flex gap-3 items-center">
                                <div className="text-blueCD">
                                    <LiaKeySolid size={24} />
                                </div>
                                {/* <input
                                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                /> */}
                                <InputPassword
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <ButtonSquare
                            className="w-full bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope"
                            variant="secondary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </ButtonSquare>
                    </form>

                    {/* ===== Extra Options ===== */}
                    <div className="flex flex-col gap-[20px]">
                        {/* <Link
                            to={`/forgotPassword/${id}`}
                            className="hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins text-center sm:text-left"
                        >
                            Forgot Password
                        </Link> */}

                        {/* Divider */}
                        <div className="inline-flex items-center justify-center w-full relative">
                            <hr className="w-[99%] h-1 bg-blueEC border-0 rounded-sm" />
                            <div className="absolute px-6 my-3 -translate-x-1/2 left-1/2 right-1/2 mx-2 bg-background flex justify-center items-center">
                                <p className="text-blueCD text-[14px] font-manrope">or</p>
                            </div>
                        </div>
                    </div>

                    {/* ===== Social Login ===== */}
                    <div className="flex flex-col md:gap-[104px] gap-[60px]">
                        <div className="flex gap-10 sm:flex-row flex-col items-center justify-center">
                            <ButtonSquare className="px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px] rounded-[8px] w-full sm:w-auto" variant="outline">
                                <div className="w-[24px] h-[24px]">
                                    <img src={google} className="w-full h-full object-fill" alt="Google" />
                                </div>
                                <p className="text-black text-[14px] font-manrope font-bold ml-2">Google</p>
                            </ButtonSquare>

                            <ButtonSquare className="px-[32px] py-[11px] flex justify-center items-center border-white-E9 border-[2px] rounded-[8px] w-full sm:w-auto" variant="outline">
                                <div className="w-[24px] h-[24px]">
                                    <img src={facebook} className="w-full h-full object-fill" alt="Facebook" />
                                </div>
                                <p className="text-black text-[14px] font-manrope font-bold ml-2">Facebook</p>
                            </ButtonSquare>
                        </div>

                        {/* ===== Signup Link ===== */}
                        <div className="flex gap-[6px] justify-center items-center">
                            <p className="text-blueB8 text-[15px] font-poppins font-semibold">
                                Don't have an account?{" "}
                                <Link
                                    to={id === "0" ? "/signup-client" : "/stylist-signup"}

                                    className="hover:-translate-y-[2px] text-brown-A43 font-semibold font-poppins"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== RIGHT SIDE IMAGE ===== */}
                <div
                    className="w-full md:w-1/2 xl:w-2/3 hidden md:block"
                    style={{
                        backgroundImage: `url(${signup})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </div>
        </div>
    );
};

export default SignInClient;
