import {
  LegalLayout,
  LegalList,
  LegalP,
  LegalSubheading,
  type LegalSection,
} from "./LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "The Information We Collect From You",
    body: (
      <>
        <LegalP>
          You share your information with us when you register with us
          through our website, at the time of placing an order, when you
          fill out a form, or when you subscribe to our newsletter.
        </LegalP>
        <LegalP>
          The information you will typically be sharing with us may include
          your name, email address, mailing address, phone number, or credit
          card information. We also provide the option to visit our site as
          an anonymous visitor.
        </LegalP>
      </>
    ),
  },
  {
    id: "why-we-need-it",
    title: "Why Do We Need Your Information?",
    body: (
      <>
        <LegalP>We may use your information for the purposes below:</LegalP>
        <LegalList
          items={[
            "The information we collect helps us better serve your individual needs.",
            "Based on the information and feedback we receive from you, we continually strive to improve our website offerings.",
            "To enable us to effectively respond to your customer service requests and support needs.",
            "To use your provided email address to send you information, respond to inquiries, and/or other requests or questions.",
          ]}
        />
        <LegalP>
          We assure you that your provided information (public or private)
          will not be sold, exchanged, transferred, or given to any other
          company for any reason whatsoever, without your consent, other
          than for the express purpose of delivering the purchased product
          or service requested.
        </LegalP>
      </>
    ),
  },
  {
    id: "protection",
    title: "Is Your Information Protected?",
    body: (
      <>
        <LegalP>
          When you place an order, or enter, submit, or access your personal
          information at any level, we have implemented security measures to
          maintain the safety of your personal information.
        </LegalP>
        <LegalP>
          Through the use of SSL, we ensure the security and confidentiality
          of the information you share. After a transaction, your private
          information (credit cards, social security numbers, financials,
          etc.) will not be stored on our servers.
        </LegalP>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Why Do We Use Cookies?",
    body: (
      <>
        <LegalP>
          In order to keep track of advertisements and compile aggregate
          data about site traffic and site interaction, we use cookies. This
          enables us to offer better site experiences and tools in the
          future.
        </LegalP>
        <LegalP>
          If required, we may use services from third parties to help us
          better understand our site visitors. However, third-party service
          providers are not allowed to use the collected information except
          for the express purpose of customer analysis.
        </LegalP>
      </>
    ),
  },
  {
    id: "no-sharing",
    title: "We Never Share Personally Identifiable Information With Third Parties",
    body: (
      <LegalP>
        Information that is personally identifiable is not sold, traded, or
        otherwise transferred to outside parties. This means you can be sure
        we will not distribute your personal information to outside parties
        without your consent. However, non-personally identifiable visitor
        information may be provided to other parties for marketing,
        advertising, or other uses.
      </LegalP>
    ),
  },
  {
    id: "applicability",
    title: "Applicability of This Privacy Policy",
    body: (
      <LegalP>
        Our privacy policy does not apply to information collected through
        offline media. This policy applies only to the information we
        collect through online channels.
      </LegalP>
    ),
  },
  {
    id: "mobile-privacy",
    title:
      "Privacy Assurance: No Sharing of Mobile Information With Third Parties",
    body: (
      <LegalP>
        No mobile information will be shared with third parties or
        affiliates for marketing or promotional purposes. All other
        categories exclude text messaging originator opt-in data and
        consent — this information will not be shared with any third
        parties.
      </LegalP>
    ),
  },
  {
    id: "sms-terms",
    title: "SMS Terms and Conditions",
    body: (
      <>
        <LegalP>
          <em>SMS program last updated: August 22, 2026</em>
        </LegalP>

        <LegalSubheading>1. Program Description</LegalSubheading>
        <LegalP>
          By opting in to SMS messaging from The Readsy Publishers, you agree
          to receive promotional text messages about our publishing,
          ghostwriting, editing, cover design, and book marketing services,
          including offers, discounts, and package announcements. Messages
          are sent to the mobile number you provided.
        </LegalP>

        <LegalSubheading>2. How to Opt In</LegalSubheading>
        <LegalP>
          You may opt in by ticking the SMS consent checkbox on the contact
          form at thereadsypublishers.com/contact, or by texting START to
          our number. Consent is not a condition of purchase or of using any
          of our services. You are not required to agree to receive text
          messages in order to submit our contact form or to purchase
          anything from The Readsy Publishers.
        </LegalP>

        <LegalSubheading>3. Message Frequency</LegalSubheading>
        <LegalP>
          Message frequency varies. You will receive up to 6 messages per
          month.
        </LegalP>

        <LegalSubheading>4. Cost</LegalSubheading>
        <LegalP>
          Message and data rates may apply. These charges come from your
          mobile carrier and are your responsibility. The Readsy Publishers
          does not charge for this service.
        </LegalP>

        <LegalSubheading>5. How to Opt Out</LegalSubheading>
        <LegalP>
          You may cancel at any time by replying STOP, STOPALL, UNSUBSCRIBE,
          CANCEL, END, or QUIT to any message from us. After you reply STOP,
          we will send you one confirmation message and you will receive no
          further promotional messages. If you wish to rejoin, reply START
          or opt in again through our website.
        </LegalP>

        <LegalSubheading>6. How to Get Help</LegalSubheading>
        <LegalP>
          Reply HELP to any message from us for assistance, or contact us at{" "}
          <a
            href="mailto:contact@thereadsypublishers.com"
            className="font-semibold text-sky transition hover:text-sky-bright"
          >
            contact@thereadsypublishers.com
          </a>{" "}
          or{" "}
          <a
            href="tel:+17373945403"
            className="font-semibold text-sky transition hover:text-sky-bright"
          >
            (737) 394-5403
          </a>
          .
        </LegalP>

        <LegalSubheading>7. Supported Carriers</LegalSubheading>
        <LegalP>
          This service is available on most major U.S. mobile carriers.
          Carriers are not liable for delayed or undelivered messages.
          Delivery is subject to effective transmission by your carrier and
          is not guaranteed.
        </LegalP>

        <LegalSubheading>8. Privacy</LegalSubheading>
        <LegalP>
          No mobile information will be shared with third parties or
          affiliates for marketing or promotional purposes. Information
          sharing to subcontractors in support services, such as customer
          service, is permitted. All other use case categories exclude text
          messaging originator opt-in data and consent — this information
          will not be shared with any third parties. For full details, see
          the sections above.
        </LegalP>

        <LegalSubheading>9. Changes to These Terms</LegalSubheading>
        <LegalP>
          We may update these SMS Terms and Conditions from time to time.
          The revised version will be posted on this page with an updated
          effective date, and continued participation in the program
          constitutes acceptance.
        </LegalP>

        <LegalSubheading>10. Contact</LegalSubheading>
        <LegalP>
          The Readsy Publishers
          <br />
          5900 Balcones Dr, STE 100, Austin, TX 78731
          <br />
          <a
            href="mailto:contact@thereadsypublishers.com"
            className="font-semibold text-sky transition hover:text-sky-bright"
          >
            contact@thereadsypublishers.com
          </a>
          <br />
          <a
            href="tel:+17373945403"
            className="font-semibold text-sky transition hover:text-sky-bright"
          >
            (737) 394-5403
          </a>
        </LegalP>
      </>
    ),
  },
];

export function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="August 22, 2026"
      intro="Your privacy matters to us. This page explains what information we collect, why we collect it, and how we keep it safe."
      sections={SECTIONS}
      crossLink={{ href: "/terms", label: "Read our Terms & Conditions" }}
    />
  );
}
