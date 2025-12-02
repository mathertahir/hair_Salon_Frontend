import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-brown-E0 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy — Crownity Beauté
        </h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-8">
            Crownity Beauté operates an online platform that connects clients
            with hairstylists in their area. This Privacy Policy explains how we
            collect, use, disclose, and protect your personal information when
            you use our website and services. By using our platform, you agree
            to the collection and use of information in accordance with this
            Privacy Policy.
          </p>

          <div className="space-y-8">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We only collect the information necessary for the operation of
                the platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Personal Information for Users (Clients):
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Location (approximate or city as provided)</li>
                <li>
                  Photos voluntarily uploaded (e.g., hairstyle reference photos)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                Personal Information for Hairstylists:
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name (optional)</li>
                <li>Photos of hairstyles</li>
                <li>Profile details</li>
                <li>
                  Payment information for monthly subscription (via Stripe)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                Automatically Collected Information:
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>IP address</li>
                <li>Device type and browser information</li>
                <li>Usage data (pages visited, actions on the platform)</li>
              </ul>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Payment Processing
              </h2>
              <p className="text-gray-700">
                Hairstylist subscription payments are securely processed through
                Stripe. Crownity does not store credit card numbers or banking
                information. Stripe processes and stores financial information
                in accordance with their own Privacy Policy. No payments between
                clients and hairstylists occur on our platform.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Create and manage user accounts</li>
                <li>Allow hairstylists to create and display their profiles</li>
                <li>Connect clients with hairstylists in their local area</li>
                <li>Process hairstylist subscription payments</li>
                <li>
                  Send service-related emails (updates, confirmations, support)
                </li>
                <li>Improve platform performance</li>
                <li>Prevent fraudulent or harmful activity</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. How We Share Information
              </h2>
              <p className="text-gray-700">
                We may share your information with service providers (e.g.,
                Stripe, hosting providers), legal authorities when required, and
                other users where applicable (e.g., hairstylists’ public profile
                photos and details). We do not sell or rent your personal
                information.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Data Storage & Security
              </h2>
              <p className="text-gray-700">
                We take reasonable measures to protect your data, including
                secure servers, encrypted connections (HTTPS), and restricted
                access. However, no method of data transmission over the
                internet is 100% secure, and users accept this risk by using the
                platform.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Your Rights (Canada – PIPEDA)
              </h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account</li>
                <li>Withdraw consent (may affect platform functionality)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Requests can be made at:{" "}
                <a
                  href="mailto:contact@crownity.ca"
                  className="text-blue-600 hover:text-blue-800"
                >
                  contact@crownity.ca
                </a>
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Children's Privacy
              </h2>
              <p className="text-gray-700">
                Crownity is not intended for individuals under the age of 16. We
                do not knowingly collect information from children.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-700">
                Our platform may contain links to third-party websites. Crownity
                is not responsible for their privacy practices or content.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy at any time. Updates will be
                posted on this page along with an updated "Last Updated" date.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions or concerns about this Privacy Policy,
                contact us at{" "}
                <a
                  href="mailto:contact@mycrownity.com"
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  contact@mycrownity.com
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using our platform, you acknowledge that you have read,
              understood, and agreed to this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
