import React, { useState, useContext } from "react";
import GoBack from "../../components/GoBack";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import { MdForwardToInbox } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { LiaKeySolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AuthContext } from "../../services/context/AuthContext";
import { FileUploadField } from "../../components/ui/FileUploadField";
import useAPI from "../../services/baseUrl/useApiHook";
import { ToastService } from "../../utils/ToastService";
import CustomCheckbox from "../../components/ui/CustomCheckbox";
import dummyImage from "../../assets/avatar.webp";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const UserProfile = () => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    const API = useAPI();

    const [userData, setUserData] = useState(user);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [activebtn, setActivebtn] = useState(2);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // ✅ Validation Schemas
    const profileSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string()
            .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
            .required("Phone is required"),
    });

    const passwordSchema = Yup.object().shape({
        currentPassword: Yup.string().required("Current password is required"),
        newPassword: Yup.string()
            .min(6, "New password must be at least 6 characters")
            .required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

    // ✅ Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // ✅ Handle Profile Update
    const handleProfileUpdate = async (values, { setSubmitting, resetForm }) => {
        try {
            const payload = new FormData();
            payload.append("name", values.name);
            payload.append("email", values.email);
            payload.append("phone", values.phone);
            payload.append("removePhoto", values.removePhoto);

            if (!values.removePhoto && values.profilePhoto?.length > 0) {
                values.profilePhoto.forEach((file) => {
                    payload.append("profilePhoto", file);
                });
            }

            const token = localStorage.getItem("auth_token");
            const response = await API.put("/api/auth/update", payload, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                },
            });

            ToastService.success("Profile updated successfully!");
            const updatedUser = response.data?.responseData?.user;
            if (updatedUser) {
                auth.updateUser(updatedUser);
                setUserData(updatedUser);
            }

            setIsProfileUpdated(false);
            resetForm();
        } catch (error) {
            console.error("Update Error:", error);
            ToastService.error("Failed to update profile. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ✅ Handle Password Update
    const handlePasswordUpdate = async (values, { setSubmitting, resetForm }) => {
        try {
            const token = localStorage.getItem("auth_token");
            const payload = {
                password: values.currentPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            };

            await API.put("/api/auth/changePassword", payload, {
                headers: { Authorization: token },
            });

            ToastService.success("Password changed successfully!");
            setIsPasswordChange(false);
            resetForm();
        } catch (error) {
            console.error("Password Change Error:", error);
            ToastService.error("Failed to change password. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>   <div className="flex flex-col gap-6">
            <div className="flex flex-col">
                <GoBack />
            </div>

            <div className="flex flex-col gap-6">
                <p className="text-brown-A43 font-playfair font-bold sm:text-[30px] text-[20px]">
                    Personal Info
                </p>

                <div className="flex justify-center items-center">
                    <img
                        src={userData.profilePhoto?.url || dummyImage}
                        alt="Profile"
                        className="w-52 h-52 border rounded-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Name
                        </h1>
                        <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                            {userData.name}
                        </p>
                    </div>

                    <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Email
                        </h1>
                        <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                            {userData.email}
                        </p>
                    </div>

                    <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-2 flex-wrap">
                        <h1 className="md:text-[25px] text-[14px] font-bold text-black-14 font-manrope">
                            Phone
                        </h1>
                        <p className="text-[14px] md:text-[20px] font-medium font-manrope text-brown-A43">
                            {userData.phone}
                        </p>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex  flex-col sm:flex-row justify-end gap-2">
                <div
                    className=" w-full sm:w-max"
                    onMouseEnter={() => setActivebtn(1)}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPasswordChange(true);
                    }}
                >
                    <ButtonSquare
                        className={`w-full bg-transparent border border-brown-A43 text-brown-A43 py-[32px] px-[45px] font-extrabold text-[14px] font-manrope ${activebtn === 1 ? "bg-brown-A43 text-background" : ""
                            } hover:bg-brown-A43 hover:text-background`}
                        variant="secondary"
                    >
                        Change Password
                    </ButtonSquare>
                </div>

                <div
                    className="w-full sm:w-max"
                    onMouseEnter={() => setActivebtn(2)}
                    onClick={() => setIsProfileUpdated(true)}
                >
                    <ButtonSquare
                        className={`w-full bg-transparent border border-brown-A43 text-brown-A43 py-[32px] px-[45px] font-extrabold text-[14px] font-manrope ${activebtn === 2 ? "bg-brown-A43 text-background" : ""
                            } hover:bg-brown-A43 hover:text-background`}
                        variant="secondary"
                    >
                        Update Profile
                    </ButtonSquare>
                </div>
            </div>

            {/* ✅ Update Profile Modal */}
            {isProfileUpdated && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black-050"
                    onClick={() => setIsProfileUpdated(false)}
                >
                    <div
                        className="relative p-4 w-full max-w-[98%] sm:w-[80%] lg:w-[40%] min-h-[50%] m-8 bg-background rounded-[30px] shadow-sm overflow-y-auto flex flex-col justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={() => setIsProfileUpdated(false)}
                        >
                            <RxCross1 size={22} />
                        </button>

                        <div className="flex flex-col gap-4 justify-center px-[30px]">
                            <div className="text-[20px] font-poppins font-extrabold text-black text-center">
                                Update Your Profile
                            </div>

                            <Formik
                                initialValues={{
                                    name: userData?.name || "",
                                    email: userData?.email || "",
                                    phone: userData?.phone || "",
                                    profilePhoto: [],
                                    removePhoto: false,
                                }}
                                validationSchema={profileSchema}
                                onSubmit={handleProfileUpdate}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    setFieldValue,
                                    isSubmitting,
                                }) => (
                                    <Form className="flex flex-col gap-4">
                                        {/* Name */}
                                        <div className="p-[10px] border border-white-E9 rounded-[5px]">
                                            <div className="flex gap-3 items-center">
                                                <FaRegUser size={24} className="text-blueCD" />
                                                <Field
                                                    className="focus:outline-none border-none w-full bg-transparent"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            {touched.name && errors.name && (
                                                <p className="text-red-500 text-sm">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="p-[10px] border border-white-E9 rounded-[5px]">
                                            <div className="flex gap-3 items-center">
                                                <MdForwardToInbox size={24} className="text-blueCD" />
                                                <Field
                                                    className="focus:outline-none border-none w-full bg-transparent"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                />
                                            </div>
                                            {touched.email && errors.email && (
                                                <p className="text-red-500 text-sm">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="p-[10px] border border-white-E9 rounded-[5px]">
                                            <div className="flex gap-3 items-center">
                                                <FiPhone size={24} className="text-blueCD" />
                                                <Field
                                                    className="focus:outline-none border-none w-full bg-transparent"
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone"
                                                />
                                            </div>
                                            {touched.phone && errors.phone && (
                                                <p className="text-red-500 text-sm">{errors.phone}</p>
                                            )}
                                        </div>

                                        {/* File Upload */}
                                        <FileUploadField
                                            label="Profile Picture"
                                            files={values.profilePhoto}
                                            setFiles={(files) => setFieldValue("profilePhoto", files)}
                                            maxFiles={1}
                                            disabled={values.removePhoto}
                                        />

                                        {/* Remove Photo */}
                                        <div>
                                            <CustomCheckbox
                                                id="remove-photo"
                                                checked={values.removePhoto}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setFieldValue("removePhoto", checked);
                                                    if (checked) setFieldValue("profilePhoto", []);
                                                }}
                                                label="Remove Photo"
                                            />
                                        </div>

                                        <ButtonSquare
                                            type="submit"
                                            className="w-full bg-brown-A43 border border-brown-A43 text-background py-[32px] text-[14px] font-bold hover:bg-brown-A43 hover:text-background"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Updating..." : "Update Profile"}
                                        </ButtonSquare>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ Change Password Modal */}
            {isPasswordChange && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black-050"
                    onClick={() => setIsPasswordChange(false)}
                >
                    <div
                        className="relative p-4 w-full max-w-[98%] sm:w-[80%] lg:w-[40%] min-h-[50%] m-8 bg-background rounded-[30px] shadow-sm overflow-y-auto flex flex-col justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={() => setIsPasswordChange(false)}
                        >
                            <RxCross1 size={22} />
                        </button>

                        <div className="flex flex-col gap-4 justify-center px-[30px]">
                            <div className="text-[20px] font-poppins font-extrabold text-black text-center">
                                Update Your Password
                            </div>

                            <Formik
                                initialValues={{
                                    currentPassword: "",
                                    newPassword: "",
                                    confirmPassword: "",
                                }}
                                validationSchema={passwordSchema}
                                onSubmit={handlePasswordUpdate}
                            >
                                {({ values, errors, touched, isSubmitting }) => (
                                    <Form className="flex flex-col gap-4">
                                        {["currentPassword", "newPassword", "confirmPassword"].map(
                                            (field, idx) => {
                                                const label =
                                                    field === "currentPassword"
                                                        ? "Current Password"
                                                        : field === "newPassword"
                                                            ? "New Password"
                                                            : "Confirm Password";

                                                const visibilityKey =
                                                    field === "currentPassword"
                                                        ? "current"
                                                        : field === "newPassword"
                                                            ? "new"
                                                            : "confirm";

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="p-[10px] border border-white-E9 rounded-[5px]"
                                                    >
                                                        <div className="flex gap-3 items-center">
                                                            <LiaKeySolid size={24} className="text-blueCD" />
                                                            <Field
                                                                className="focus:outline-none border-none w-full bg-transparent"
                                                                type={
                                                                    showPassword[visibilityKey]
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                name={field}
                                                                placeholder={label}
                                                            />
                                                            <div
                                                                className="cursor-pointer text-blueCD"
                                                                onClick={() =>
                                                                    togglePasswordVisibility(visibilityKey)
                                                                }
                                                            >
                                                                {showPassword[visibilityKey] ? (
                                                                    <IoEyeOutline size={24} />
                                                                ) : (
                                                                    <IoEyeOffOutline size={24} />
                                                                )}
                                                            </div>
                                                        </div>
                                                        {touched[field] && errors[field] && (
                                                            <p className="text-red-500 text-sm">
                                                                {errors[field]}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}

                                        <ButtonSquare
                                            type="submit"
                                            className="w-full bg-brown-A43 border border-brown-A43 text-background py-[32px] text-[14px] font-bold hover:bg-brown-A43 hover:text-background"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Changing..." : "Change Password"}
                                        </ButtonSquare>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </div></div>
    )
}

export default UserProfile