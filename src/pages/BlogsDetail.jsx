import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../services/baseUrl/useApiHook";
import { ToastService } from "../utils/ToastService";
import { createMarkup, handleApiError, sanitizeLinks, formatDateNew } from "../utils/helpers/HelperFunction"




import { HiOutlineCalendar } from "react-icons/hi"; // React Icons


const BlogDetail = () => {
    const { slug } = useParams();
    const API = useAPI();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlogBySlug = async () => {
        try {
            const response = await API.get(`/api/user/blog/slug/${slug}`);
            setBlog(response.data.responseData.blog);
            if (response.data?.responseMessage?.[0]) {
                ToastService.success(response.data.responseMessage[0]);
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogBySlug();
    }, [slug]);

    if (loading) return <p className="text-center py-10 text-lg font-semibold">Loading...</p>;
    if (!blog) return <p className="text-center py-10 text-lg font-semibold">Blog not found</p>;

    return (
        <div className="min-h-screen py-8">
            <article className="max-w-6xl mx-auto px-6">

                {/* Blog Header */}
                <header className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                        {blog?.description?.length > 100 ? blog.description.slice(0, 100) + "..." : blog.description}
                    </p>

                    <div className="flex justify-center items-center gap-4 text-gray-500">
                        <div className="flex items-center">
                            <HiOutlineCalendar className="mr-2 h-5 w-5" />
                            <time dateTime={blog?.createdAt}>{formatDateNew(blog?.createdAt)}</time>
                        </div>
                    </div>
                </header>

                {/* Featured Image with webp Support */}
                {blog.featuredImage?.url && (
                    <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                        <picture>
                            {blog.featuredImage.webpUrl && (
                                <source
                                    srcSet={blog.featuredImage.webpUrl.startsWith("http")
                                        ? blog.featuredImage.webpUrl
                                        : `https://findagram.ca${blog.featuredImage.webpUrl}`
                                    }
                                    type="image/webp"
                                />
                            )}
                            <img
                                src={
                                    blog.featuredImage.url.startsWith("http")
                                        ? blog.featuredImage.url
                                        : `https://findagram.ca${blog.featuredImage.url}`
                                }
                                alt={blog.title}
                                className="w-full h-50 object-cover md:h-auto md:max-h-96"
                                loading="lazy"
                            />
                        </picture>
                    </div>
                )}

                {/* Blog Content */}
                <div className="blog-content prose prose-lg max-w-none mx-auto">
                    <style>{`
            .blog-content h1, .blog-content h2, .blog-content h3 {
              font-weight: bold;
              margin-top: 1.5rem;
              margin-bottom: 1rem;
            }
            .blog-content p { margin-bottom: 1rem; line-height: 1.7; }
            .blog-content ul, .blog-content ol { padding-left: 1.5rem; margin-bottom: 1rem; }
            .blog-content a { color: #2563eb; text-decoration: underline; }
            .blog-content a:hover { color: #1d4ed8; }
          `}</style>

                    <div dangerouslySetInnerHTML={createMarkup(sanitizeLinks(blog.content))} />
                </div>
            </article>
        </div>
    );
};

export default BlogDetail;
