import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import BlogsCard from '../components/ui/BlogsCard';
import useAPI from "../services/baseUrl/useApiHook";
import { ToastService } from '../utils/ToastService';
import { handleApiError } from "../utils/helpers/HelperFunction";
import Pagination from '../components/ui/Pagination';
import { ClipLoader } from "react-spinners";

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const API = useAPI();
    const [queryParams] = useSearchParams();
    const isInitialized = useRef(false);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await API.get("/api/user/blog", {
                params: {
                    limit,
                    page: currentPage,
                },
            });

            const data = response.data.responseData;
            setBlogs(data?.blogs || []);
            setTotalPages(data?.pagination?.totalPages || 1);

            if (response.data?.responseMessage?.[0]) {
                // ToastService.success(response.data.responseMessage[0]);
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
            isInitialized.current = true;
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, limit]);

    return (
        <div className="container py-10 flex flex-col gap-10">

            {/* Blogs List */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <ClipLoader size={50} color="#b88b5a" />
                </div>
            ) : blogs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {blogs.map(blog => (
                            <BlogsCard
                                key={blog._id}
                                image={blog?.featuredImage?.url}
                                title={blog?.title}
                                description={blog?.description}
                                createdAt={blog?.createdAt}
                                slug={blog?.slug}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        limit={limit}
                        setLimit={setLimit}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="flex justify-center items-center py-10 text-gray-500">
                    No Blogs Found.
                </div>
            )}
        </div>
    );
};

export default BlogsPage;
