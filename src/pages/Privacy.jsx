import React from 'react'

const Privacy = () => {
    return (
        <div className="min-h-screen bg-brown-E0 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-8">
                        At our hair salon, we are committed to protecting your privacy and ensuring the security of your personal information.
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                        or use our services.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700">
                                We collect information that you provide directly to us, including your name, email address, phone number,
                                appointment preferences, and any other information you choose to provide when booking services or contacting us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                            <p className="text-gray-700">
                                We use the information we collect to process your appointments, communicate with you about your bookings,
                                send you service updates, respond to your inquiries, and improve our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                            <p className="text-gray-700">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information
                                only with service providers who assist us in operating our business, conducting our business, or serving our users,
                                provided they agree to keep this information confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                            <p className="text-gray-700">
                                We implement appropriate technical and organizational security measures to protect your personal information
                                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
                                the Internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
                            <p className="text-gray-700">
                                We use cookies and similar tracking technologies to track activity on our website and hold certain information.
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
                            <p className="text-gray-700">
                                Our website may contain links to third-party websites or services that are not owned or controlled by us.
                                We are not responsible for the privacy practices of these third-party sites and encourage you to review
                                their privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
                            <p className="text-gray-700">
                                You have the right to access, update, or delete your personal information at any time. You may also opt-out
                                of receiving promotional communications from us by following the unsubscribe instructions in those messages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                            <p className="text-gray-700">
                                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
                                information from children. If you are a parent or guardian and believe your child has provided us with
                                personal information, please contact us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
                            <p className="text-gray-700">
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                                Privacy Policy, unless a longer retention period is required or permitted by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
                            <p className="text-gray-700">
                                Your information may be transferred to and maintained on computers located outside of your state, province,
                                country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                                Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Marketing Communications</h2>
                            <p className="text-gray-700">
                                With your consent, we may send you promotional emails about our services, special offers, or other information
                                we think you may find interesting. You can opt-out of these communications at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Payment Information</h2>
                            <p className="text-gray-700">
                                When you make a payment through our website, your payment information is processed by secure third-party
                                payment processors. We do not store your complete payment card information on our servers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Appointment History</h2>
                            <p className="text-gray-700">
                                We maintain records of your appointment history to provide you with better service, track your preferences,
                                and assist with future bookings. You can request access to or deletion of this information at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Us</h2>
                            <p className="text-gray-700">
                                If you have any questions about this Privacy Policy or our privacy practices, please contact us at
                                <a href="mailto:privacy@hairsalon.com" className="text-blue-600 hover:text-blue-800 ml-1">privacy@hairsalon.com</a>
                                or through our contact page.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            By using our website and services, you acknowledge that you have read and understood this Privacy Policy
                            and agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Privacy