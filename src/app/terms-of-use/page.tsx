import Footer from "@/components/footer";
import HeaderTwo from "@/components/header-two";
import { routes } from "@/utils/routes";
import Link from "next/link";

const TermsOfUse = () => {
  return (
    <div className="bg-[#030303]">
      <HeaderTwo>
        <Link
          href={routes.terms}
          className="text-[15px] leading-[25px] md:text-[1.5625rem] md:leading-[1.5625rem] tracking-[-1px] font-medium w-[33.33%] text-right"
          id="s3"
        >
          TERMS OF USE
        </Link>
      </HeaderTwo>
      <h2 className="text-center text-[#FFC425] md:text-[10rem] leading-[10rem] text-[60px] font-druk-super md:mb-[6.25rem] mb-[1.5625rem] mt-[3.125rem] md:mt-[9.375rem]">
        TERMS OF USE
      </h2>
      <div className="max-w-[1128px] mx-auto px-[2rem] mb-[150px] md:text-[1.25rem] md:leading-[1.75rem]">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">
            Terms of Use for Alinda AI
          </h1>
          <p className="text-center text-md mt-2">
            Effective Date: 23rd December 2024
          </p>
        </header>

        <section className="space-y-6">
          <p className="text-lg">
            Welcome to Alinda AI (“Alinda,” “we,” “us,” or “our”). By accessing
            or using our website, applications, and services (collectively, the
            “Services”), you agree to comply with and be bound by these Terms of
            Use (“Terms”). These Terms constitute a legal agreement between you
            (“User,” “you,” or “your”) and Alinda AI. If you do not agree to
            these Terms, please do not use our Services.
          </p>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              1. Scope of Services
            </h2>
            <p>
              Alinda AI provides an EdTech platform offering personalized
              AI-powered educational tools for students, educators, and
              institutions. The Services include gesture and voice recognition
              features, interactive AI interfaces, and learning management
              tools.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">2. Eligibility</h2>
            <p>
              You must be at least 16 years old to use our Services. If you are
              under 16, you must have the consent of a parent or legal guardian.
              By using the Services, you represent that you meet these
              eligibility requirements.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">3. User Accounts</h2>
            <h3 className="text-2xl font-medium mb-2">3.1 Registration</h3>
            <p>
              To access certain features, you may need to create an account by
              providing accurate, complete, and up-to-date information,
              including but not limited to:
            </p>
            <ul className="list-disc pl-[2rem]">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Gender</li>
              <li>Age</li>
              <li>Location</li>
              <li>Degree, university, or educational institution details</li>
              <li>Payment information (when subscribing to our services)</li>
            </ul>

            <h3 className="text-2xl font-medium mb-2">3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activities that occur under your
              account. Notify us immediately if you suspect unauthorized access
              to your account.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">4. User Obligations</h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>Comply with applicable laws and regulations.</li>
              <li>
                Use the Services only for lawful purposes and as intended.
              </li>
              <li>
                Not interfere with the security, functionality, or operation of
                the Services.
              </li>
              <li>
                Not reverse-engineer, modify, or create derivative works of the
                Services.
              </li>
              <li>
                Refrain from uploading harmful, offensive, or illegal content.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              5. Privacy and Data Use
            </h2>
            <p>
              Your use of our Services is governed by our Privacy Policy, which
              outlines how we collect, process, and protect your personal
              information. By using our Services, you consent to the collection
              and use of your information as described in the Privacy Policy.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">6. Payment Terms</h2>
            <h3 className="text-2xl font-medium mb-2">6.1 Subscriptions</h3>
            <p>
              Certain Services may require a subscription. Payment must be made
              in advance, and all fees are non-refundable unless otherwise
              specified.
            </p>

            <h3 className="text-2xl font-medium mb-2">6.2 Taxes</h3>
            <p>
              You are responsible for any applicable taxes on your subscription
              or usage.
            </p>

            <h3 className="text-2xl font-medium mb-2">6.3 Cancellation</h3>
            <p>
              You may cancel your subscription at any time through your account
              settings. Access to paid features will continue until the end of
              the current billing cycle.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              7. Intellectual Property
            </h2>
            <h3 className="text-2xl font-medium mb-2">7.1 Ownership</h3>
            <p>
              All content, materials, and intellectual property associated with
              the Services, including but not limited to software, designs,
              trademarks, and logos, are the exclusive property of Alinda AI,
              The Brathwaite Group Limited, and Seekrs Group™ or its licensors.
            </p>

            <h3 className="text-2xl font-medium mb-2">7.2 Limited License</h3>
            <p>
              We grant you a non-exclusive, non-transferable, revocable license
              to access and use the Services solely for personal or
              institutional purposes.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              8. Gesture and Voice Recognition Features
            </h2>
            <p>
              Alinda AI’s Services include gesture and voice recognition
              capabilities to enhance interactivity. By using these features,
              you consent to the collection and processing of data required for
              their operation. Refer to our Privacy Policy for details on how
              this data is used and protected.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              9. Disclaimer of Warranties
            </h2>
            <ul className="list-disc pl-[2rem]">
              <li>
                The Services are provided on an "AS IS" and "AS AVAILABLE"
                basis.
              </li>
              <li>
                We disclaim all warranties, express or implied, including but
                not limited to:
              </li>
              <ul className="list-disc pl-[2rem]">
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy or reliability of results</li>
                <li>Uninterrupted or error-free access to the Services</li>
              </ul>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Alinda AI or Seekrs Group™
              or The Brathwaite Group Limited shall not be liable for any:
            </p>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                Indirect, incidental, special, consequential, or punitive
                damages.
              </li>
              <li>
                Loss of data, revenue, or profits arising out of or related to
                your use of the Services.
              </li>
            </ul>
            <p>
              Our total liability shall not exceed the amount paid by you to use
              the Services in the 12 months preceding the claim.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">11. Termination</h2>
            <h3 className="text-2xl font-medium mb-2">11.1 By You</h3>
            <p>
              You may terminate your use of the Services at any time by
              cancelling your Direct Debit payment and providing written notice
              via email to{" "}
              <a
                href="mailto:admin@alinda.ai"
                className="text-blue-500 underline"
              >
                admin@alinda.ai
              </a>{" "}
              with a request to delete your account. Alternatively, termination
              may occur by ceasing use of the Services. Upon receipt of your
              termination request, we will process the cancellation of your
              account in accordance with our applicable policies and procedures.
            </p>

            <h3 className="text-2xl font-medium mb-2">11.2 By Us</h3>
            <p>
              We reserve the right to suspend or terminate your account or
              access to the Services at our sole discretion, including but not
              limited to cases of:
            </p>
            <ul className="list-disc pl-[2rem]">
              <li>Breach of these Terms</li>
              <li>Suspected fraudulent or abusive behavior</li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of United Kingdom. Any disputes arising from these Terms
              shall be resolved in the courts of United Kingdom.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              13. Changes to These Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. Any
              changes will be effective upon posting to our website. Continued
              use of the Services constitutes acceptance of the revised Terms.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              14. Contact Information
            </h2>
            <p>
              If you have any questions or concerns regarding these Terms,
              please contact us:
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:legal@alinda.ai"
                className="text-blue-500 underline"
              >
                legal@alinda.ai
              </a>
            </p>
            <p>Address: Bartle House, 9 Oxford Court, Manchester, M2 3WQ</p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">15. Miscellaneous</h2>
            <ul className="list-disc pl-[2rem]">
              <li>
                <strong>Severability:</strong> If any provision of these Terms
                is deemed invalid or unenforceable, the remaining provisions
                shall remain in effect.
              </li>
              <li>
                <strong>Entire Agreement:</strong> These Terms, along with our
                Privacy Policy, constitute the entire agreement between you and
                Alinda AI.
              </li>
              <li>
                <strong>Waiver:</strong> Failure to enforce any provision of
                these Terms shall not constitute a waiver of that provision or
                any other provision.
              </li>
            </ul>
          </article>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
