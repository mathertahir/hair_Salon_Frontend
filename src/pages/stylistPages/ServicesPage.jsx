

import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useAPI from "../../services/baseUrl/useApiHook";
import { AuthContext } from "../../services/context/AuthContext";
import { FaEdit, FaExclamationCircle, FaTrash } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { ToastService } from "../../utils/ToastService";
import { handleApiError } from "../../utils/helpers/HelperFunction";
import { ButtonSquare } from "../../components/ui/buttonSquare";
import { FileUploadField } from "../../components/ui/FileUploadField";
import Pagination from "../../components/ui/Pagination";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const serviceSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().typeError("Price must be a number").required("Price is required"),
    servicePhoto: Yup.array().min(0, "Service photo is required"),
});

const ServicesPage = () => {
    const API = useAPI();
    const auth = useContext(AuthContext);
    const { authToken } = auth;

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [services, setServices] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    // ✅ Fetch Business Services
    const fetchBusinessServices = async () => {
        setLoading(true);
        try {
            const response = await API.get(
                `/api/business/services/list?page=${currentPage}&limit=${limit}`,
                { headers: { Authorization: authToken } }
            );
            const { services = [], pagination } = response.data.responseData || {};
            setServices(services);
            setTotalPages(pagination?.totalPages || 1);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessServices();
    }, [currentPage, limit]);

    // ✅ Handle Add/Edit Submit
    const handleServiceSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);

            if (values.servicePhoto.length > 0 && values.servicePhoto[0] instanceof File) {
                formData.append("servicePhoto", values.servicePhoto[0]);
            }

            if (editingService) {
                await API.put(`/api/business/services/${editingService._id}`, formData, {
                    headers: { Authorization: authToken, "Content-Type": "multipart/form-data" },
                });
                ToastService.success("Service updated successfully!");
            } else {
                await API.post("/api/business/services", formData, {
                    headers: { Authorization: authToken, "Content-Type": "multipart/form-data" },
                });
                ToastService.success("Service added successfully!");
            }

            fetchBusinessServices();
            resetForm();
            setIsModalOpen(false);
            setEditingService(null);
        } catch (error) {
            handleApiError(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };
    const handleDelete = async () => {
        try {
            await API.delete(`/api/business/services/${selectedServiceId}`, {
                headers: { Authorization: authToken },
            });
            ToastService.success("Service deleted successfully!");
            fetchBusinessServices();
        } catch (error) {
            handleApiError(error);
        } finally {
            setDeleteModalOpen(false);
            setSelectedServiceId(null);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedServiceId(id);
        setDeleteModalOpen(true);
    };


    return (
        <div className="p-4 flex flex-col gap-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-brown-A43 font-playfair font-bold sm:text-[30px] text-[20px]">
                    Services
                </p>

                <ButtonSquare
                    className="bg-brown-A43 text-white flex gap-2"
                    onClick={() => {
                        setEditingService(null);
                        setIsModalOpen(true);
                    }}
                >
                    Add Service
                    <MdAddCircleOutline size={16} />
                </ButtonSquare>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Photo</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                                    Loading...
                                </td>
                            </tr>
                        ) : services.length > 0 ? (
                            services.map((service, index) => (
                                <tr
                                    key={service._id || index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b hover:bg-gray-100`}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">{service.name}</td>
                                    <td className="px-6 py-4">${service.price}</td>
                                    <td className="px-6 py-4">

                                        <PhotoProvider>
                                            <div className="flex gap-2 flex-wrap">

                                                <PhotoView src={service?.servicePhoto?.url}>
                                                    <img
                                                        src={service?.servicePhoto?.url}

                                                        className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer"
                                                    />
                                                </PhotoView>


                                            </div>
                                        </PhotoProvider>

                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => openDeleteModal(service._id)} className="text-red-600 hover:text-red-800">
                                            <FaTrash size={18} />
                                        </button>

                                        <Link to={`/business/viewService/${service._id}`} className="text-brown-A43 ">
                                            <FaRegEye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                                    No services available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                setLimit={setLimit}
                onPageChange={setCurrentPage}
            />

            {/* ✅ Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black-050 w-full "
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative p-4 w-full max-w-[98%] sm:w-[80%] lg:w-[40%] bg-white rounded-[20px] shadow-sm overflow-y-auto flex flex-col justify-center  "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <RxCross1 size={22} />
                        </button>

                        <div className="flex flex-col gap-4 justify-center px-[30px] py-6">
                            <div className="text-[20px] font-poppins font-extrabold text-black text-center">
                                {editingService ? "Edit Service" : "Add New Service"}
                            </div>

                            <Formik
                                initialValues={{
                                    name: editingService?.name || "",
                                    description: editingService?.description || "",
                                    price: editingService?.price || "",
                                    servicePhoto: [],
                                }}
                                validationSchema={serviceSchema}
                                onSubmit={handleServiceSubmit}
                            >
                                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                                    <Form className="flex flex-col gap-4">
                                        <div>
                                            <Field
                                                name="name"
                                                placeholder="Service Name"
                                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                                            />
                                            {touched.name && errors.name && (
                                                <p className="text-red-500 text-sm">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Field
                                                as="textarea"
                                                name="description"
                                                placeholder="Service Description"
                                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                                            />
                                            {touched.description && errors.description && (
                                                <p className="text-red-500 text-sm">{errors.description}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Field
                                                name="price"
                                                placeholder="Price"
                                                type="number"
                                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                                            />
                                            {touched.price && errors.price && (
                                                <p className="text-red-500 text-sm">{errors.price}</p>
                                            )}
                                        </div>

                                        {/* ✅ File Upload */}
                                        <div>
                                            <FileUploadField
                                                label="Service Photo"
                                                files={values.servicePhoto}
                                                setFiles={(files) => setFieldValue("servicePhoto", files)}
                                                maxFiles={1}
                                            />
                                            {touched.servicePhoto && errors.servicePhoto && (
                                                <p className="text-red-500 text-sm">{errors.servicePhoto}</p>
                                            )}

                                            {/* ✅ Existing Photo in Edit Mode */}
                                            {editingService?.servicePhoto?.url && (
                                                <PhotoProvider>
                                                    <div className="flex gap-2 flex-wrap mt-2">
                                                        <PhotoView src={editingService.servicePhoto.url}>
                                                            <img
                                                                src={editingService.servicePhoto.url}
                                                                alt="Existing service"
                                                                className="w-[80px] h-[80px] object-cover rounded-md cursor-pointer border"
                                                            />
                                                        </PhotoView>
                                                    </div>
                                                </PhotoProvider>
                                            )}
                                        </div>

                                        <ButtonSquare
                                            type="submit"
                                            className="w-full bg-brown-A43 text-background py-[14px] text-[14px] font-bold hover:bg-brown-A43"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? editingService
                                                    ? "Updating..."
                                                    : "Adding..."
                                                : editingService
                                                    ? "Update Service"
                                                    : "Add Service"}
                                        </ButtonSquare>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}


            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black-050">
                    <div
                        className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            <RxCross1 size={20} />
                        </button>

                        <div className="p-5 text-center">
                            <div className="mx-auto mb-4 text-gray-500 flex justify-center">
                                <FaExclamationCircle className="text-red-500" size={40} />
                            </div>
                            <h3 className="mb-5 text-lg font-normal text-gray-600">
                                Are you sure you want to delete this service?
                            </h3>

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={handleDelete}
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setDeleteModalOpen(false)}
                                    type="button"
                                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ServicesPage;

