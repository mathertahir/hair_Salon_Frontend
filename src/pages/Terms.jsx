import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-brown-E0 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Terms & Conditions — Crownity Beauté
        </h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-8">
            Welcome to Crownity Beauté. These Terms & Conditions (“Terms”)
            govern your use of our platform and website. By using Crownity, you
            agree to these Terms. If you do not agree with any part of these
            Terms, you must stop using the platform immediately.
          </p>

          <div className="space-y-8">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Description of the Service
              </h2>
              <p className="text-gray-700">
                Crownity is a marketplace and connection platform that allows
                hairstylists (“Stylists”) to create profiles and for clients
                (“Users”) to find hairstylists in their area. Crownity is not a
                salon and does not provide hairstyling services. All hairstyling
                services are provided independently by Stylists outside of
                Crownity.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Accounts
              </h2>
              <p className="text-gray-700">
                To use the platform, you must provide accurate and complete
                information. You are responsible for maintaining the
                confidentiality of your login credentials and for all activity
                under your account. We may suspend or terminate any account that
                violates these Terms.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Hairstylist Subscription
              </h2>
              <p className="text-gray-700 mb-3">
                Stylists who register on Crownity must pay a monthly
                subscription fee of <strong>$19.99 CAD</strong>
                to maintain an active profile.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Payments are processed through Stripe</li>
                <li>Fees are non-refundable unless required by law</li>
                <li>Failure to pay may result in suspension of the profile</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. No Client Payments on Crownity
              </h2>
              <p className="text-gray-700">
                Clients do not make payments through Crownity. Any payment
                arrangements between clients and stylists occur separately
                outside the platform. Crownity is not responsible for any
                payment disputes or disagreements between clients and stylists.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. User Responsibilities
              </h2>
              <p className="text-gray-700 font-semibold mb-2">
                Users agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Provide accurate information</li>
                <li>Use the platform legally and respectfully</li>
                <li>Not upload harmful, offensive, or copyrighted material</li>
                <li>Not attempt to hack, misuse, or disrupt the platform</li>
              </ul>
              <p className="text-gray-700 font-semibold mb-2">
                Stylists agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Deliver services professionally</li>
                <li>Provide truthful profile information and photos</li>
                <li>
                  Follow all local laws, regulations, and licensing requirements
                </li>
                <li>Take full responsibility for their business activities</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Crownity’s Role (Important)
              </h2>
              <p className="text-gray-700 mb-2">Crownity functions only as:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>A directory</li>
                <li>A listing service</li>
                <li>A connection platform</li>
              </ul>
              <p className="text-gray-700">
                We do <strong>not</strong> guarantee the quality, reliability,
                availability, or professionalism of stylists. Crownity does not
                supervise or employ stylists and is not involved in agreements
                between clients and stylists.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Liability Disclaimer
              </h2>
              <p className="text-gray-700">
                To the fullest extent permitted by law, Crownity is not liable
                for damages resulting from the use of the platform. This
                includes hairstyling results, disputes, cancellations,
                miscommunications, or losses resulting from meetings outside the
                platform. Users agree to use the platform at their own risk.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All Crownity branding, logos, images, text, and website content
                belong to Crownity Beauté. Stylists retain ownership of the
                photos they upload but grant Crownity a license to display them
                on their profiles.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Termination
              </h2>
              <p className="text-gray-700">
                Crownity may suspend or delete accounts that violate these
                Terms, including but not limited to: fraudulent activity,
                non-payment, abuse, or misleading information. Users may also
                request account deletion.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Changes to the Terms
              </h2>
              <p className="text-gray-700">
                We may update these Terms at any time. Changes take effect when
                posted on the website. Continued use of the platform after
                updates signifies acceptance of the revised terms.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contact Information
              </h2>
              <p className="text-gray-700">
                If you have questions regarding these Terms, please contact us
                at{" "}
                <a
                  href="mailto:contact@crownity.ca"
                  className="text-blue-600 hover:text-blue-800"
                >
                  contact@crownity.ca
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using the Crownity platform, you acknowledge that you have
              read, understood, and agree to be bound by these Terms &
              Conditions. If you do not agree, please discontinue use of the
              platform immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
