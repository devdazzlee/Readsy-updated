import {
  LegalLayout,
  LegalList,
  LegalP,
  LegalSubheading,
  type LegalSection,
} from "./LegalLayout";

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <LegalP>
        When you place an order with The Readsy Publishers (i.e. you make
        payment for an order), you are considered to have read, understood,
        and agreed to the terms and conditions listed on this page.
      </LegalP>
    ),
  },
  {
    id: "copyright",
    title: "Copyright & Personal Use",
    body: (
      <LegalP>
        The products delivered to you are completely original content. The
        full copyright to the products and other materials delivered to you
        is retained by you and you alone. You agree to indemnify, defend, and
        hold harmless the Company for any and all unauthorized uses you may
        make of any material made available to you by the Company. Any
        unauthorized use of the delivered products and/or content of this
        website may subject you to civil or criminal penalties.
      </LegalP>
    ),
  },
  {
    id: "plagiarism",
    title: "No Plagiarism",
    body: (
      <>
        <LegalP>
          We do not condone, encourage, or knowingly take part in plagiarism
          or any other acts of fraud or dishonesty. We strongly adhere to and
          abide by all copyright laws, and will not knowingly allow any
          customer to commit plagiarism or violate copyright laws.
        </LegalP>
        <LegalP>
          Neither the Company nor any of its affiliates and/or partners shall
          be liable for any unethical, inappropriate, illegal, or otherwise
          wrongful use of the products and/or other written material received
          from our website. This includes plagiarism, lawsuits, poor grading,
          expulsion, academic probation, loss of scholarships, awards,
          grants, prizes, titles, or positions, failure, suspension, or any
          other disciplinary or legal actions. The buyer of material from our
          website is solely responsible for any and all disciplinary actions
          arising from the improper, unethical, and/or illegal use of the
          material.
        </LegalP>
      </>
    ),
  },
  {
    id: "images",
    title: "Our Policy for Using Images",
    body: (
      <LegalP>
        We do not own the copyright of images unless specifically designed by
        our in-house illustrators — hence we do not use copyrighted images
        ourselves. We will simply provide you with links to recommended
        images so you can license and place them yourself. You may use
        royalty-free images without any worry; however, for copyrighted
        images you may be required to pay the owner(s).
      </LegalP>
    ),
  },
  {
    id: "refunds",
    title: "Refund Policy",
    body: (
      <>
        <LegalP>
          It is important that you carefully read and understand this refund
          policy in order to have full knowledge of the privileges and
          limitations governed by The Readsy Publishers&apos; policies. We
          offer refunds only in special cases and under specified conditions,
          detailed below.
        </LegalP>
        <LegalP>
          The Readsy Publishers offers a 100% refund on all its services,
          however, it is not an unconditional 100% refund and certain
          conditions still apply.
        </LegalP>
        <LegalSubheading>
          The Readsy Publishers&apos; refund policy will be void if:
        </LegalSubheading>
        <LegalList
          items={[
            "You have chosen a special or a custom package.",
            "You have demanded revisions beyond the initial concepts.",
            "The customer has not been contacted or has been unresponsive for more than 2 weeks without notice.",
            "The project is placed on hold at the customer's request.",
            "Company policies have been violated.",
            "The creative brief is lacking required information from the client's end.",
            "The business is closing, or changing its name or business.",
            "The reason is a “change of mind,” a disagreement with a partner, or another reason that does not pertain to the service provided — these are not subject to refund under any circumstances.",
          ]}
        />
        <LegalP>
          Once a client has accepted multiple sets of revisions (for any
          service), the refund policy will no longer apply.
        </LegalP>
      </>
    ),
  },
  {
    id: "revisions",
    title: "Limitations on Revisions",
    body: (
      <>
        <LegalSubheading>Editing Orders</LegalSubheading>
        <LegalP>
          We will revise edited content to ensure that no objective or
          technical errors remain. If no objective or technical errors remain
          in the content, any further revisions to that content are provided
          at the sole discretion of the Company.
        </LegalP>
        <LegalSubheading>Writing Orders</LegalSubheading>
        <LegalP>
          We will revise small segments of written material until that
          segment is approved by the client. Once the client approves of the
          content that we develop, revisions to that content will be billed
          at an appropriate editing rate.
        </LegalP>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: (
      <>
        <LegalP>
          You agree to release and hold the Company and its employees,
          officers, directors, shareholders, agents, representatives,
          affiliates, subsidiaries, advertising, promotion and fulfillment
          agencies, any third-party providers or sources of information or
          data, and legal advisers (the &ldquo;Company&apos;s
          Affiliates&rdquo;) harmless from any and all losses, damages,
          rights, claims, and actions of any kind arising from or related to
          the products, including but not limited to: (a) telephone,
          electronic, hardware or software, network, Internet, email, or
          computer malfunctions, failures, or difficulties of any kind; (b)
          failed, incomplete, garbled, or delayed computer transmissions; (c)
          any condition caused by events beyond the control of the Company
          that may cause the product to be delayed, disrupted, or corrupted;
          (d) any injuries, losses, or damages of any kind arising in
          connection with or as a result of utilizing our services; or (e)
          any printing or typographical errors in any materials associated
          with our services. In addition, you agree to defend, indemnify, and
          hold the Company and Company&apos;s Affiliates harmless from any
          claim, suit, or demand, including attorney&apos;s fees, made by a
          third party due to or arising out of your use of our services, your
          violation or breach of these terms and conditions, your violation
          of any rights of a third party, or any other act or omission by
          you.
        </LegalP>
        <LegalP>
          In no event shall the Company be liable for any direct, indirect,
          punitive, incidental, special, or consequential damages arising out
          of or in any way connected with the use of this website or any
          information provided on this website. Because some states or
          jurisdictions do not allow the exclusion or limitation of liability
          for consequential or incidental damages, the above limitation may
          not apply to you.
        </LegalP>
      </>
    ),
  },
  {
    id: "amendments",
    title: "Amendments",
    body: (
      <LegalP>
        You acknowledge and agree that we may unilaterally change this
        Privacy Policy and these Terms and Conditions. We recommend
        reviewing both pages from time to time, as any such changes will be
        reflected in this section of our website.
      </LegalP>
    ),
  },
  {
    id: "contact",
    title: "Contacting Us",
    body: (
      <LegalP>
        If you have any questions regarding our policies, you may email us
        at{" "}
        <a
          href="mailto:contact@thereadsypublishers.com"
          className="font-semibold text-sky transition hover:text-sky-bright"
        >
          contact@thereadsypublishers.com
        </a>
        .
      </LegalP>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: (
      <LegalP>
        All company logos and trademarks appearing on our website are the
        property of their respective owners. We are not affiliated,
        associated with, endorsed by, or in any way officially connected
        with these companies or their trademarks. The use of these logos and
        trademarks does not imply any endorsement, affiliation, or
        relationship between us and the respective companies. We use these
        logos and trademarks solely for identification purposes. All
        information and content provided on our website is for informational
        purposes only and should not be construed as professional advice. We
        do not guarantee the accuracy or completeness of any information
        provided on our website. We are not responsible for any errors or
        omissions, or for the results obtained from the use of this
        information. Any reliance you place on such information is strictly
        at your own risk.
      </LegalP>
    ),
  },
];

export function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms and Conditions"
      updated="August 22, 2026"
      intro="Please read these terms carefully before placing an order with The Readsy Publishers. Making a payment for an order means you agree to everything below."
      sections={SECTIONS}
      crossLink={{ href: "/privacy", label: "Read our Privacy Policy" }}
    />
  );
}
