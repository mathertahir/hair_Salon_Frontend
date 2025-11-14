

import React, { useContext, useEffect, useState } from "react";
import GoBack from "../../components/GoBack";

import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import { FileUploadField } from "../../components/ui/FileUploadField";
import MapSearchField from "../../components/ui/MapSearchField";
import { PhotoProvider, PhotoView } from "react-photo-view";

import "react-photo-view/dist/react-photo-view.css";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
const BusinessProfileEdit = () => {
    const auth = useContext(AuthContext);

    const API = useAPI();
    const navigate = useNavigate();
    const { authToken } = auth;




    const [businessProfile, setBusinessProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
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
        businessPhotos: [],
        businessNICPhoto: [],
        businessRegistrationDoc: [],
        businessFeaturedImage: [],
        removeBusinessPhotosIds: [],
        removeBusinessNICPhotoIds: [],
        removeBusinessRegistrationDocId: [],
        removeFeaturedImageId: [],
    });

    const parseIdArray = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        try {
            return JSON.parse(value);
        } catch {
            return [value];
        }
    };

    const handleRemoveImage = (type, id) => {
        setFormData((prev) => {
            const updateKey = {
                businessPhotos: "removeBusinessPhotosIds",
                businessNICPhoto: "removeBusinessNICPhotoIds",
                businessRegistrationDoc: "removeBusinessRegistrationDocId",
                businessFeaturedImage: "removeFeaturedImageId",
            }[type];

            if (!updateKey) return prev;

            return {
                ...prev,
                [updateKey]: [...prev[updateKey], id], // add id to removal list
            };
        });

        // ✅ Update UI instantly by removing the preview
        setBusinessProfile((prev) => {
            if (!prev) return prev;

            const updateKey = {
                businessPhotos: "businessPhotos",
                businessNICPhoto: "businessNICPhoto",
                businessRegistrationDoc: "businessRegistrationDoc",
                businessFeaturedImage: "featuredImage",
            }[type];

            if (!updateKey) return prev;

            // If it's a single object (like featuredImage or registrationDoc)
            if (typeof prev[updateKey] === "object" && !Array.isArray(prev[updateKey])) {
                return {
                    ...prev,
                    [updateKey]: null,
                };
            }

            // If it's an array (like businessPhotos or NIC photos)
            return {
                ...prev,
                [updateKey]: prev[updateKey].filter((img) => img._id !== id),
            };
        });
    };


    const fetchBusinessProfile = async () => {
        setLoading(true);
        try {
            const response = await API.get("/api/business/profile", {
                headers: { Authorization: authToken },
            });
            const business = response.data.responseData.business;
            setBusinessProfile(business);
            ToastService.success(response.data?.responseMessage?.[0]);

            // ✅ Pre-fill form
            setFormData((prev) => ({
                ...prev,
                businessName: business.businessName || "",
                businessDescription: business.businessDescription || "",
                operatingHours: business.operatingHours || "",
                businessPhone: business.phone || "",
                longitude: business.businessLocation?.coordinates?.[0] || "",
                latitude: business.businessLocation?.coordinates?.[1] || "",
                state: business.businessLocation?.state || "",
                city: business.businessLocation?.city || "",
                postalCode: business.businessLocation?.postalCode || "",
                streetAddress: business.businessLocation?.streetAddress || "",
            }));
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessProfile();
    }, []);

    const handleMapChange = (loc) => {
        setFormData((prev) => ({
            ...prev,
            longitude: loc.longitude,
            latitude: loc.latitude,
            state: loc.state,
            city: loc.city,
            postalCode: loc.postalCode,
            streetAddress: loc.streetAddress,
        }));
    };

    const buildFormData = () => {
        const payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            // ✅ Exclude upload and removal fields from auto-append
            if (
                [
                    "businessPhotos",
                    "businessNICPhoto",
                    "businessRegistrationDoc",
                    "businessFeaturedImage",
                    "removeBusinessPhotosIds",
                    "removeBusinessNICPhotoIds",
                    "removeBusinessRegistrationDocId",
                    "removeFeaturedImageId",
                ].includes(key)
            ) {
                return;
            }

            if (Array.isArray(value) || typeof value === "object") {
                payload.append(key, JSON.stringify(value));
            } else {
                payload.append(key, value ?? "");
            }
        });

        // ✅ Handle files separately
        formData.businessPhotos?.forEach((f) => payload.append("businessPhotos", f));
        formData.businessNICPhoto?.forEach((f) => payload.append("businessNICPhoto", f));
        if (formData.businessRegistrationDoc?.[0])
            payload.append("businessRegistrationDoc", formData.businessRegistrationDoc[0]);
        if (formData.businessFeaturedImage?.[0])
            payload.append("businessFeaturedImage", formData.businessFeaturedImage[0]);

        // ✅ Add removal arrays (once only)
        payload.append("removeBusinessPhotosIds", JSON.stringify(parseIdArray(formData.removeBusinessPhotosIds)));
        payload.append("removeBusinessNICPhotoIds", JSON.stringify(parseIdArray(formData.removeBusinessNICPhotoIds)));
        payload.append("removeBusinessRegistrationDocId", JSON.stringify(parseIdArray(formData.removeBusinessRegistrationDocId)));
        payload.append("removeFeaturedImageId", JSON.stringify(parseIdArray(formData.removeFeaturedImageId)));

        return payload;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = buildFormData();
            const response = await API.put("/api/business/profile", payload, {
                headers: {
                    Authorization: authToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            ToastService.success(response.data?.responseMessage?.[0] || "Business profile updated!");
            navigate("/business/businessProfile");

        } catch (err) {
            handleApiError(err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col gap-6">
            <GoBack />
            <p className="text-black font-playfair font-bold sm:text-[30px] text-[20px]">
                Business Profile Edit
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                {/* ✅ Business Name */}
                <div className="col-span-12 lg:col-span-6">
                    <label className="text-[14px] font-bold font-manrop text-brown-A43">Business Name :</label>
                    <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="p-[10px] border border-white-E9 rounded-[5px] w-full focus:outline-none bg-transparent"
                        placeholder="Enter business name"
                    />
                </div>

                {/* ✅ Operating Hours */}
                <div className="col-span-12 lg:col-span-6">
                    <label className="text-[14px] font-bold font-manrop text-brown-A43">Operating Hours :</label>
                    <input
                        type="text"
                        value={formData.operatingHours}
                        onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                        className="p-[10px] border border-white-E9 rounded-[5px] w-full focus:outline-none bg-transparent"
                        placeholder="e.g. 11:00 am to 8:00 pm"
                    />
                </div>


                <div className="col-span-12 lg:col-span-6">
                    <label className="text-[14px] font-bold font-manrop text-brown-A43">Operating Days :</label>
                    <input
                        type="text"
                        value={formData.operatingDays}
                        onChange={(e) => setFormData({ ...formData, operatingDays: e.target.value })}
                        className="p-[10px] border border-white-E9 rounded-[5px] w-full focus:outline-none bg-transparent"
                        placeholder="Mon - Fri"
                    />
                </div>

                {/* ✅ Contact */}


                {/* ✅ Location Search */}
                <div className="col-span-12 ">
                    <label className="text-[14px] font-bold font-manrop text-brown-A43">Location :</label>
                    <MapSearchField value={formData.streetAddress} onChange={handleMapChange} />
                </div>

                {/* ✅ Description */}
                <div className="col-span-12">
                    <label className="text-[14px] font-bold font-manrop text-brown-A43">Description :</label>
                    <textarea
                        value={formData.businessDescription}
                        onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                        className="p-[10px] border border-white-E9 rounded-[5px] w-full focus:outline-none bg-transparent"
                        placeholder="Write about your business..."
                        rows={4}
                    />
                </div>

                {/* ✅ File Uploads with previews */}
                <PhotoProvider>
                    {/* Business Photos */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                        <FileUploadField
                            label="Business Photos"
                            files={formData.businessPhotos}
                            setFiles={(files) => setFormData((p) => ({ ...p, businessPhotos: files }))}
                            maxFiles={Math.max(0, 4 - ((businessProfile?.businessPhotos?.length || 0) - (formData.removeBusinessPhotosIds?.length || 0)))}
                        />
                        {businessProfile?.businessPhotos?.length > 0 && (
                            <div className="flex gap-3 mt-3 flex-wrap">
                                {businessProfile.businessPhotos.map((img, i) => (
                                    <div key={i} className="relative flex flex-col gap-4">
                                        <PhotoView src={img.url}>
                                            <img
                                                src={img.url}
                                                alt="Business"
                                                className="w-[80px] h-[80px] rounded-md object-cover cursor-pointer"
                                            />
                                        </PhotoView>
                                        <button
                                            type="button"
                                            className="absolute top-[-10px] right-[-10px] bg-red-500 rounded-full p-2 text-background"
                                            onClick={() => handleRemoveImage("businessPhotos", img._id)}
                                        >
                                            <RxCross1 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* NIC Photo */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                        <FileUploadField
                            label="NIC Photo"
                            files={formData.businessNICPhoto}
                            setFiles={(files) => setFormData((p) => ({ ...p, businessNICPhoto: files }))}
                            maxFiles={Math.max(0, 2 - ((businessProfile?.businessNICPhoto?.length || 0) - (formData.removeBusinessNICPhotoIds?.length || 0)))}
                        />
                        {businessProfile?.businessNICPhoto?.length > 0 && (
                            <div className="flex gap-3 mt-3 flex-wrap">
                                {businessProfile.businessNICPhoto.map((img, i) => (
                                    <div key={i} className="relative flex flex-col gap-4">
                                        <PhotoView src={img.url}>
                                            <img
                                                src={img.url}
                                                alt="NIC"
                                                className="w-[80px] h-[80px] rounded-md object-cover cursor-pointer"
                                            />
                                        </PhotoView>
                                        <button
                                            type="button"
                                            className="absolute top-[-10px] right-[-10px] bg-red-500 rounded-full p-2 text-background"
                                            onClick={() => handleRemoveImage("businessNICPhoto", img._id)}
                                        >
                                            <RxCross1 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Registration Document */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                        <FileUploadField
                            label="Registration Document"
                            files={formData.businessRegistrationDoc}
                            setFiles={(files) => setFormData((p) => ({ ...p, businessRegistrationDoc: files }))}
                            maxFiles={Math.max(0, 1 - ((businessProfile?.businessRegistrationDoc ? 1 : 0) - (formData.removeBusinessRegistrationDocId?.length || 0)))}
                        />
                        {businessProfile?.businessRegistrationDoc && (
                            <div className="relative w-max">
                                <PhotoView src={businessProfile.businessRegistrationDoc?.url}>
                                    <img
                                        src={businessProfile.businessRegistrationDoc.url}
                                        alt="Registration Doc"
                                        className="w-[80px] h-[80px] rounded-md object-cover cursor-pointer"
                                    />
                                </PhotoView>
                                <button
                                    type="button"
                                    className="absolute top-[-10px] right-[-10px] bg-red-500 rounded-full p-2 text-background"
                                    onClick={() => handleRemoveImage("businessRegistrationDoc", businessProfile.businessRegistrationDoc._id)}
                                >
                                    <RxCross1 size={12} />
                                </button>
                            </div>
                        )}

                    </div>

                    {/* Featured Image */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                        <FileUploadField
                            label="Featured Image"
                            files={formData.businessFeaturedImage}
                            setFiles={(files) => setFormData((p) => ({ ...p, businessFeaturedImage: files }))}
                            maxFiles={Math.max(0, 1 - ((businessProfile?.featuredImage ? 1 : 0) - (formData.removeFeaturedImageId?.length || 0)))}
                        />
                        {businessProfile?.featuredImage && (
                            <div className="relative w-max">
                                <PhotoView src={businessProfile.featuredImage?.url}>
                                    <img
                                        src={businessProfile.featuredImage.url}
                                        alt="Featured"
                                        className="w-[80px] h-[80px] rounded-md object-cover cursor-pointer"
                                    />
                                </PhotoView>
                                <button
                                    type="button"
                                    className="absolute top-[-10px] right-[-10px] bg-red-500 rounded-full p-2 text-background"
                                    onClick={() => handleRemoveImage("businessFeaturedImage", businessProfile.featuredImage._id)}
                                >
                                    <RxCross1 size={12} />
                                </button>
                            </div>
                        )}
                    </div>
                </PhotoProvider>

                {/* ✅ Submit */}
                <div className="col-span-12">
                    <ButtonSquare
                        type="submit"
                        className="bg-brown-A43 text-background p-[20px] font-extrabold text-[14px] font-manrope rounded-[8px] w-full"
                        variant="secondary"
                    >
                        Update Profile
                    </ButtonSquare>
                </div>
            </form>
        </div>
    );
};

export default BusinessProfileEdit;


