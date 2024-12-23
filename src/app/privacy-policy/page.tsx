import Footer from "@/components/footer";
import HeaderTwo from "@/components/header-two";
import { routes } from "@/utils/routes";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#030303] static-page">
      <HeaderTwo>
        <Link
          href={routes.privacy}
          className="text-[15px] leading-[25px] md:text-[1.5625rem] md:leading-[1.5625rem] tracking-[-1px] font-medium w-[33.33%] text-right"
          id="s3"
        >
          PRIVACY POLICY
        </Link>
      </HeaderTwo>
      <h2 className="text-center text-[#FFC425] md:text-[10rem] leading-[10rem] text-[60px] font-druk-super md:mb-[6.25rem] mb-[1.5625rem] mt-[3.125rem] md:mt-[9.375rem]">
        PRIVACY POLICY
      </h2>
      <div className="max-w-[1128px] mx-auto px-[2rem] mb-[150px] md:text-[1.25rem] md:leading-[1.75rem]">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">
            Privacy Policy for Alinda AI
          </h1>
          <p className="text-center text-md mt-2">
            Effective Date: 23rd December 2024
          </p>
        </header>

        <section className="space-y-6">
          <p className="text-lg">
            Welcome to Alinda AI! Your privacy is critically important to us,
            and we are committed to protecting your personal information while
            providing a seamless and personalized educational experience. This
            Privacy Policy explains how we collect, use, share, and protect your
            data when you interact with our platform, including our gesture and
            voice recognition features, verbal and textual communication
            interfaces, and other services.
          </p>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-medium">
                  A. Personal Information
                </h3>
                <ul className="list-disc pl-[2rem]">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Gender</li>
                  <li>Age</li>
                  <li>Location</li>
                  <li>
                    Degree, university, or educational institution details
                  </li>
                  <li>
                    Payment information (when subscribing to our services)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-medium">
                  B. Automatically Collected Information
                </h3>
                <ul className="list-disc pl-[2rem]">
                  <li>
                    Device information (e.g., hardware model, operating system)
                  </li>
                  <li>IP address and geolocation data</li>
                  <li>
                    Usage data, such as interaction logs, gesture inputs, and
                    voice commands
                  </li>
                  <li>
                    Cookie data and tracking technology for analytics and
                    performance
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-medium">
                  C. Voice and Gesture Data
                </h3>
                <p className="mt-2">
                  When using Alinda’s voice or gesture recognition features:
                </p>
                <ul className="list-disc pl-[2rem]">
                  <li>
                    Voice Data: Captured to process commands, enhance accuracy,
                    and improve services.
                  </li>
                  <li>
                    Gesture Data: Used for seamless navigation and personalized
                    interactions.
                  </li>
                  <li>
                    Retention: Voice and gesture data is anonymized and retained
                    only for as long as necessary to optimize functionality and
                    user experience.
                  </li>
                </ul>
              </div>
            </div>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>Personalize learning experiences and tutoring.</li>
              <li>
                Enable verbal and textual interaction with the AI teacher.
              </li>
              <li>Assist educators with AI-powered teaching tools.</li>
              <li>Refine gesture and voice recognition capabilities.</li>
              <li>
                Provide tailored recommendations based on interaction history.
              </li>
              <li>Monitor for fraudulent or unauthorized use.</li>
              <li>
                Send product updates, promotional content, and educational
                resources (opt-out available).
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              3. Sharing Your Information
            </h2>
            <p>
              We respect your privacy and do not sell or share your personal
              information with third parties for marketing purposes. However, we
              may share your data in the following circumstances:
            </p>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                With Service Providers: To support operations such as payment
                processing, analytics, and customer support.
              </li>
              <li>
                With Institutions: If your school or university integrates
                Alinda, relevant data may be shared to enhance educational
                outcomes.
              </li>
              <li>
                For Legal Reasons: To comply with legal obligations, enforce
                agreements, or protect the rights of Alinda and its users.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">4. Data Security</h2>
            <p>We take robust measures to protect your data, including:</p>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>Encryption of sensitive information (e.g., payment data).</li>
              <li>
                Regular security audits and monitoring for vulnerabilities.
              </li>
              <li>Role-based access controls to minimize data exposure.</li>
            </ul>
            <p>
              While we implement state-of-the-art security practices, no system
              is completely foolproof. Users are advised to safeguard their
              credentials and report suspicious activity immediately.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">5. Your Rights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-medium">A. Access and Control</h3>
                <ul className="list-disc pl-[2rem]">
                  <li>Access and update your personal information.</li>
                  <li>Opt-out of marketing communications.</li>
                  <li>
                    Delete your account and associated data (subject to legal
                    and operational obligations).
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-medium">B. Privacy Controls</h3>
                <ul className="list-disc pl-[2rem]">
                  <li>Adjust cookie settings through our cookie banner.</li>
                  <li>
                    Manage permissions for voice and gesture recognition via
                    device settings.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-medium">C. Regional Rights</h3>
                <p>
                  Depending on your location, you may have additional rights
                  under local laws:
                </p>
                <ul className="list-disc pl-[2rem]">
                  <li>
                    GDPR (EU/EEA): Right to data portability, restriction of
                    processing, and lodging complaints with a data protection
                    authority.
                  </li>
                  <li>
                    CCPA (California): Right to opt-out of data sales and
                    request disclosure of data collected.
                  </li>
                </ul>
              </div>
            </div>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">6. Data Retention</h2>
            <p>
              We retain your data only for as long as necessary to provide our
              services or comply with legal obligations. Voice and gesture data
              are anonymized and deleted after use for improvement purposes.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <p>Alinda AI uses cookies to:</p>
            <ul className="list-disc pl-[2rem]">
              <li>Analyze website traffic and user behavior.</li>
              <li>Provide personalized learning suggestions.</li>
              <li>Improve platform performance.</li>
            </ul>
            <p>
              Users can manage cookie preferences through their browser or our
              website settings.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              8. Third-Party Links
            </h2>
            <p>
              Alinda AI may contain links to third-party websites or services.
              We are not responsible for their privacy practices and encourage
              users to review their policies.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              9. Children’s Privacy
            </h2>
            <p>
              Alinda AI complies with global regulations, including COPPA, to
              protect children’s privacy. We do not knowingly collect data from
              children under 13 without parental or institutional consent.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. Material changes
              will be communicated through email or platform notifications.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">11. Contact Us</h2>
            <p>
              For questions or concerns about this Privacy Policy, contact us
              at:
            </p>
            <ul className="list-disc pl-[2rem]">
              <li>
                Email:{" "}
                <a
                  href="mailto:privacy@alinda.ai"
                  className="text-blue-500 underline"
                >
                  privacy@alinda.ai
                </a>
              </li>
              <li>Address: Bartle House, 9 Oxford Court, Manchester, M2 3WQ</li>
            </ul>
          </article>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
