import React from 'react'

const Terms = () => {
    return (
        <div className="min-h-screen bg-brown-E0 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
                <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-8">
                        Welcome to our hair salon. These Terms and Conditions govern your use of our website and services.
                        By accessing or using our services, you agree to be bound by these terms. Please read them carefully
                        before making any appointments or using our services.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700">
                                By accessing and using our website or booking services with us, you accept and agree to be bound
                                by the terms and provision of this agreement. If you do not agree to these terms, please do not
                                use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                            <p className="text-gray-700">
                                We provide professional hair salon services including haircuts, styling, coloring, treatments,
                                and related beauty services. All services are subject to availability and may vary based on
                                location and stylist expertise.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Booking and Appointments</h2>
                            <p className="text-gray-700">
                                Appointments can be booked through our website, phone, or in-person. We require advance booking
                                for most services. Cancellations must be made at least 24 hours in advance to avoid cancellation
                                fees. Late arrivals may result in shortened service time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
                            <p className="text-gray-700">
                                Payment is due at the time of service completion. We accept cash, credit cards, and debit cards.
                                Prices are subject to change without notice. All prices are in the local currency and include
                                applicable taxes unless otherwise stated.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cancellation and Refund Policy</h2>
                            <p className="text-gray-700">
                                Cancellations made less than 24 hours before the appointment may be subject to a cancellation fee
                                of up to 50% of the service cost. No-shows will be charged the full service fee. Refunds are
                                provided only for services not rendered due to salon error.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Satisfaction</h2>
                            <p className="text-gray-700">
                                We strive to provide excellent service. If you are not satisfied with your service, please inform
                                us within 48 hours. We will work with you to address any concerns. Adjustments may be offered
                                at our discretion within 7 days of the original service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Health and Safety</h2>
                            <p className="text-gray-700">
                                For your safety and the safety of our staff, please inform us of any allergies, medical conditions,
                                or skin sensitivities before your appointment. We reserve the right to refuse service if we
                                believe it may cause harm to you or others.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Client Responsibilities</h2>
                            <p className="text-gray-700">
                                Clients are responsible for providing accurate information when booking appointments, arriving on time,
                                and communicating any special requests or concerns. We are not responsible for damage to personal
                                belongings brought into the salon.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
                            <p className="text-gray-700">
                                All content on our website, including text, graphics, logos, images, and software, is the property
                                of our salon and is protected by copyright and trademark laws. You may not reproduce, distribute,
                                or use our content without written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
                            <p className="text-gray-700">
                                Our liability for any claims arising from our services is limited to the cost of the service provided.
                                We are not liable for any indirect, incidental, or consequential damages. We recommend patch tests
                                for color services to avoid allergic reactions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Privacy and Data Protection</h2>
                            <p className="text-gray-700">
                                Your personal information is handled in accordance with our Privacy Policy. By using our services,
                                you consent to the collection and use of your information as described in our Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Prohibited Conduct</h2>
                            <p className="text-gray-700">
                                You agree not to engage in any conduct that is harmful, offensive, or disruptive to our salon,
                                staff, or other clients. We reserve the right to refuse service to anyone who violates these
                                terms or engages in inappropriate behavior.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
                            <p className="text-gray-700">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately
                                upon posting on our website. Your continued use of our services after changes are posted
                                constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Gift Cards and Promotions</h2>
                            <p className="text-gray-700">
                                Gift cards are valid for one year from the date of purchase and cannot be redeemed for cash.
                                Promotional offers and discounts cannot be combined unless otherwise stated. We reserve the
                                right to modify or cancel promotions at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
                            <p className="text-gray-700">
                                If you have any questions about these Terms and Conditions, please contact us at
                                <a href="mailto:terms@hairsalon.com" className="text-blue-600 hover:text-blue-800 ml-1">terms@hairsalon.com</a>
                                or visit our contact page for more information.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            By using our website and services, you acknowledge that you have read, understood, and agree to be
                            bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use
                            of our services immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Terms