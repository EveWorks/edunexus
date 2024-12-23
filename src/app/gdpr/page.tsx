import Footer from "@/components/footer";
import HeaderTwo from "@/components/header-two";
import { routes } from "@/utils/routes";
import Link from "next/link";

const Gdpr = () => {
  return (
    <div className="bg-[#030303]">
      <HeaderTwo>
        <Link
          href={routes.gdpr}
          className="text-[15px] leading-[25px] md:text-[1.5625rem] md:leading-[1.5625rem] tracking-[-1px] font-medium w-[33.33%] text-right"
          id="s3"
        >
          GDPR
        </Link>
      </HeaderTwo>
      <h2 className="text-center text-[#FFC425] md:text-[10rem] leading-[10rem] text-[60px] font-druk-super md:mb-[6.25rem] mb-[1.5625rem] mt-[3.125rem] md:mt-[9.375rem]">
        GDPR COMPLIANCE POLICY
      </h2>
      <div className="max-w-[1128px] mx-auto px-[2rem] mb-[150px] md:text-[1.25rem] md:leading-[1.75rem]">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">
            GDPR Compliance Policy for Alinda AI
          </h1>
          <p className="text-center text-md mt-2">
            Effective Date: 23rd December 2024
          </p>
        </header>

        <section className="space-y-6">
          <p className="text-lg">
            At Alinda AI, we are committed to ensuring the highest standards of
            data protection and privacy. Our GDPR (General Data Protection
            Regulation) Compliance Policy reflects our dedication to
            safeguarding the personal data of individuals in the European Union
            (EU) and European Economic Area (EEA), as well as globally. This
            policy outlines how we collect, process, store, and protect personal
            data to comply with GDPR and other international data protection
            laws.
          </p>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              1. Data Protection Principles
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                <strong>Lawfulness, Fairness, and Transparency:</strong> We
                process personal data in a lawful, fair, and transparent manner.
              </li>
              <li>
                <strong>Purpose Limitation:</strong> We collect personal data
                for specified, explicit, and legitimate purposes and do not
                process it beyond those purposes.
              </li>
              <li>
                <strong>Data Minimization:</strong> We collect only the data
                necessary for the purposes for which it is processed.
              </li>
              <li>
                <strong>Accuracy:</strong> We keep personal data accurate and up
                to date.
              </li>
              <li>
                <strong>Storage Limitation:</strong> We retain personal data
                only as long as necessary for the purposes for which it was
                collected.
              </li>
              <li>
                <strong>Integrity and Confidentiality:</strong> We process
                personal data securely to prevent unauthorized or unlawful
                processing, accidental loss, destruction, or damage.
              </li>
              <li>
                <strong>Accountability:</strong> We take responsibility for
                compliance and can demonstrate adherence to GDPR principles.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              2. Personal Data We Collect
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                <strong>Identifying Information:</strong> Name, email address,
                phone number, gender, age, and location.
              </li>
              <li>
                <strong>Educational Data:</strong> Degree, university, or
                educational institution details.
              </li>
              <li>
                <strong>Behavioural Data:</strong> Interaction logs, voice
                commands, and gesture data.
              </li>
              <li>
                <strong>Payment Data:</strong> For subscription services,
                including credit/debit card details (processed securely through
                third-party payment processors).
              </li>
              <li>
                <strong>Technical Data:</strong> IP addresses, device
                identifiers, and cookies for analytics and platform
                optimization.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              3. Lawful Bases for Processing
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                <strong>Consent:</strong> For marketing communications, voice
                and gesture recognition, and personalized recommendations.
              </li>
              <li>
                <strong>Contractual Necessity:</strong> To provide our services
                to users who have subscribed or registered.
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with applicable
                laws and regulations.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> For fraud prevention,
                security measures, and improving our platform.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              4. Rights of Data Subjects
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                <strong>Right to Access:</strong> Request a copy of your
                personal data and information on how it is processed.
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate or incomplete data.
              </li>
              <li>
                <strong>Right to Erasure (“Right to Be Forgotten”):</strong>{" "}
                Request deletion of personal data, subject to certain
                conditions.
              </li>
              <li>
                <strong>Right to Restriction:</strong> Request limited
                processing of your data.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in
                a structured, commonly used format and transfer it to another
                controller.
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing based on
                legitimate interests or direct marketing.
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw consent at
                any time for data processing based on consent.
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> File a complaint
                with a supervisory authority if your rights are violated.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              5. Data Security and Protection Measures
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                <strong>Encryption:</strong> All sensitive data is encrypted in
                transit and at rest.
              </li>
              <li>
                <strong>Access Controls:</strong> Role-based access ensures only
                authorized personnel can access personal data.
              </li>
              <li>
                <strong>Data Anonymization:</strong> Voice and gesture data are
                anonymized for analysis and improvement.
              </li>
              <li>
                <strong>Regular Audits:</strong> We conduct security audits and
                vulnerability assessments.
              </li>
              <li>
                <strong>Incident Response:</strong> A robust plan to respond to
                and report data breaches within 72 hours as required by GDPR.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              6. Data Retention Policy
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                <strong>General User Data:</strong> Retained for the duration of
                the user’s account plus six months.
              </li>
              <li>
                <strong>Anonymized Data:</strong> Retained for analytics and
                research indefinitely.
              </li>
              <li>
                <strong>Payment Data:</strong> Retained as required by financial
                regulations (typically 7 years).
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              7. Data Sharing and Transfers
            </h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                <strong>Service Providers:</strong> With third-party providers
                for payment processing, hosting, analytics, and customer
                support.
              </li>
              <li>
                <strong>Educational Institutions:</strong> Data shared with
                universities or schools as part of institutional agreements.
              </li>
              <li>
                <strong>Legal Obligations:</strong> To comply with laws,
                regulations, or lawful requests by public authorities.
              </li>
              <li>
                <strong>International Transfers:</strong> Data may be
                transferred to countries outside the EEA. In such cases, we
                ensure compliance with GDPR using Standard Contractual Clauses
                (SCCs) or equivalent safeguards.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              8. Data Protection Officer (DPO)
            </h2>
            <p>
              We have appointed a Data Protection Officer to oversee GDPR
              compliance. For questions, concerns, or requests regarding your
              data, contact our DPO:
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:dpo@alinda.ai"
                className="text-blue-500 underline"
              >
                dpo@alinda.ai
              </a>
            </p>
            <p>Address: Bartle House, 9 Oxford Court, Manchester, M2 3WQ</p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              9. Cookies and Tracking
            </h2>
            <p>
              Alinda AI uses cookies and similar tracking technologies for
              analytics, performance optimization, and personalized
              recommendations. Users can manage or disable cookies through
              browser settings or our platform’s cookie management tool.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">10. Children’s Data</h2>
            <p>
              We comply with GDPR and COPPA regarding children’s data. For users
              under 16, parental or institutional consent is required before
              processing their data.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">11. Data Breaches</h2>
            <ul className="list-disc pl-[2rem] space-y-2">
              <li>
                We will notify affected individuals and relevant supervisory
                authorities within 72 hours.
              </li>
              <li>
                Our team will investigate the breach, mitigate risks, and
                implement corrective measures.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              12. Accountability and Training
            </h2>
            <p>
              Alinda AI maintains detailed records of data processing activities
              and trains employees on GDPR compliance. Our policies are reviewed
              annually and updated as required.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">
              13. Updates to This Policy
            </h2>
            <p>
              This GDPR Compliance Policy may be updated to reflect changes in
              laws, regulations, or our practices. Significant changes will be
              communicated via email or platform notifications.
            </p>
          </article>

          <article>
            <h2 className="text-3xl font-semibold mb-4">14. Contact Us</h2>
            <p>
              If you have questions about this policy or how we handle your
              personal data, please contact us:
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:privacy@alinda.ai"
                className="text-blue-500 underline"
              >
                privacy@alinda.ai
              </a>
            </p>
            <p>Address: Bartle House, 9 Oxford Court, Manchester, M2 3WQ</p>
          </article>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Gdpr;
