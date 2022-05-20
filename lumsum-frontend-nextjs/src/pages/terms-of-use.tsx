import Head from 'next/head';
import Footer from '../layouts/Footer';
import BreadCrumb from '../components/BreadCrumb';
import styles from '../styles/terms-of-use.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Terms Of Use | Lumsum  </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main>
        <BreadCrumb title="Terms of Use">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>Terms of Use</BreadCrumb.Item>
        </BreadCrumb>
        <div className={styles.container}>
          <div className={styles.inner}>
            <h1 className={styles.title}>Terms Of Use</h1>
            <div className={styles.content}>
              <p className={styles.paragraph}>These terms of service ("Terms", "User Agreement") are an agreement between LumSum Services FZ LLC,
              Owner and operator of the website www.lumsum.io ("Lumsum’’ "us", "we" or "our") and you ("User", "you" or"your").
              This Agreement sets forth the general terms and conditions of your use of the www.lumsum.io website and any of its
              products or services (collectively, "Website" or "Services"). In this User Agreement, except where the context
              requires otherwise, words indicating the singular also include the plural and words indicating the plural also
              include the singular. In this User Agreement, the marginal words and other headings shall not be taken into
                consideration for the interpretation.</p>

              <h2 className={styles.subTitle}>1. DEFINITIONS</h2>
              <p className={styles.paragraph}>In this User Agreement, the following words and expressions shall have the meanings stated. Words indicating
                    persons or parties include corporations and other legal entities, except where the context requires otherwise.</p>
              <p className={styles.paragraph}>1.1 "Agreement" means this User Agreement and the Privacy Policy, as may be amended by LUMSUM from time to time.</p>
              <p className={styles.paragraph}>1.2 “Content’’ means Website’s design, layout, text, images, graphics, sound, video, links, embedded items, features, etc.</p>
              <p className={styles.paragraph}>1.3 “LUMSUM”, ‘’us’’,‘’our’’ or ‘’we’’ means LumSum Services FZ LLC, a company duly registered in U.A.E ,
                    which term shall mean and include its successors and assigns.</p>
              <p className={styles.paragraph}>1.4 “lumsum.io’’ means the internet Website currently located at the URL www.lumsum.io, which is owned and operated by LumSum services FZ LLC.</p>
              <p className={styles.paragraph}>1.5 “Services’’ means services including free, premium and/or upgraded services, or any content or
                    information provided as part of these services individually or collectively.</p>
              <p className={styles.paragraph}>1.6 “User Agreement’’ means this agreement as may be amended by LumSum from time to time.</p>
              <p className={styles.paragraph}>1.7 “Website’’means this website www.lumsum.io</p>
              <p className={styles.paragraph}>1.8 “you’’, “your’’,“User’’, “Registered User’’ / “Member’’ or “Unregistered User’’/ “Visitor’’ means a person
              who visits the Website. Including but not limited to individuals representing themselves, individuals representing privately
                    held companies, individuals representing government entities, etc.</p>

              <h2 className={styles.subTitle}>2. INTRODUCTION</h2>
              <p className={styles.paragraph}>2.1 Purpose:To act as a mere platform for Users to list their business, locate or identify companies and professionals
                    to interact, make decisions and avail business services.</p>
              <p className={styles.paragraph}>2.2 Agreement:You agree that by using the Website or using Services, you are entering into a legally binding
              agreement (even if you are using our Services on behalf of a company or for free). If you do not agree to this
              Agreement, do NOT click “Register’’ (or similar) and do not access or otherwise use any of our Services.
                    This Agreement applies to both Registered Users (“Members”) and Unregistered Users (“Visitors”).</p>

              <h2 className={styles.subTitle}>3. OBLIGATIONS</h2>
              <p className={styles.header}>3.1 Accounts and membership</p>
              <p className={styles.paragraph}>To use the Website, you must be an individual of at least 18 years of age. If you create an account
              at the Website, you are responsible for maintaining the security of your account and you are fully responsible
              for all activities that occur under the account and any other actions taken in connection with it.
              Providing false contact information of any kind may result in the termination of your account.
              You must immediately notify us of any unauthorized uses of your account or any other breaches
              of security. We will not be liable for any acts or omissions by you, including any damages of
              any kind incurred as a result of such acts or omissions and for any consequences caused by
              your use of Services. We may suspend, disable, or delete your account (or any part thereof)
              if we determine that you have violated any provision of this Agreement or that your conduct or
              content would tend to damage our reputation and goodwill. If we delete your account for the
              foregoing reasons, you may not re-register for our Services. We may block your email address
                    and Internet protocol address to prevent further registration.</p>
              <p className={styles.header}>3.2 Register on behalf of a company</p>
              <p className={styles.paragraph}>If you register on behalf of a company or any business entity, you represent, warrant and undertake that
              you must possess the full authority to bind the entity to this Agreement and all the information
                    submitted to Lumsum during the registration process must be: true, accurate and complete.</p>
              <p className={styles.header}>3.3 Messages</p>
              <p className={styles.paragraph}>By becoming a Registered User, you authorize Lumsum to share information, such as your profile and
              links with other user(s), share on Lumsum social media accounts, and consent to be contacted by Lumsum
              through email, phone calls, SMS notifications or any other means of communication even if your and your
                    organization's contact number(s) are on Do Not Call Registry.</p>

              <h2 className={styles.subTitle}>4. RIGHTS AND LIMITS</h2>
              <p className={styles.header}>4.1 Your content</p>
              <p className={styles.paragraph}>We do not own any data, information or material ("Your content") that you submit or post to the Website
              in the course of using the Service. You own Your content. You shall have the sole responsibility for
              the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property
                    ownership or right to use of Your content. </p>
              <p className={styles.paragraph}>We may, but have no obligation to monitor Your content. You agree to provide license and right to
              Lumsum to use, copy, modify, distribute, publish, and process, information and content that you
              provide in the Website, without any further consent, notice and/or compensation to you or others.
              You grant us permission to access, copy, distribute, store, transmit, reformat, display and perform
              Your content as required for the purpose of providing the Services. Without limiting any of those
              representations or warranties, we have the right, though not the obligation, to, in our own sole
              discretion, refuse or remove any of Your content that, in our reasonable opinion, violates any of
              our policies or is in any way harmful or objectionable. You acknowledge that Lumsum owns all IPRs
              in www.lumsum.io and its database. You agree that your profile information will be truthful and
                    agree to only provide content or information that:</p>
              <br />
              <p className={styles.paragraph}>a)does not violate the law;</p>
              <p className={styles.paragraph}>b)other’s intellectual property rights; and</p>
              <p className={styles.paragraph}>c)does not breach a contract.</p>
              <p className={styles.paragraph}>Lumsum may, in its sole discretion, refuse the Service to you at any time.</p>
              <p className={styles.header}>4.2 Content</p>
              <p className={styles.paragraph}>The Content contained in this Website might be inaccurate, incomplete, delayed, misleading,
              illegal, offensive or otherwise harmful. You agree that LumSum is not responsible for any Users’
              or third parties' content or information or for any damages as result of your use of or reliance on it.
              User accepts full responsibility for its use. You are responsible for deciding if you want to access or use
                    third party links from our Website.</p>
              <p className={styles.header}>4.3 Third party services</p>
              <p className={styles.paragraph}>If you decide to enable, access or use third party services, be advised that your access and use of such
              other services is governed solely by the terms and conditions of such other services, and we do not
              endorse, we are not responsible or liable for, and make no representations as to any aspect of such
              other services, including, without limitation, their content or the manner in which they handle data
              (including your data) or any interaction between you and the provider of such other services.
                    You irrevocably waive any claim against LumSum with respect to such other services. </p>
              <p className={styles.paragraph}>LumSum is not liable for any damage or loss caused or alleged to be caused by or in connection
              with your enablement, access or use of any such other services, or your reliance on the privacy
              practices, data security processes or other policies of such other services. You may be required
              to register for or log into such other services on their respective websites. By enabling any
              other services, you are expressly permitting LumSum to disclose your data as necessary to
                    facilitate the use or enablement of such other service.</p>
              <p className={styles.header}>4.4 Backups</p>
              <p className={styles.paragraph}>We perform regular backups of the Website, Your content and “Content”, however, these backups
              are for our own administrative purposes only, and are in no way guaranteed. You are responsible
              for maintaining your own backups of your data. We do not provide any sort of compensation for
              lost or incomplete data in the event that backups do not function properly. We will do our best
                    to ensure complete and accurate backups but assume no responsibility for this duty.</p>
              <p className={styles.header}>4.5 Links to other websites</p>
              <p className={styles.paragraph}>Although this Website may be linked to other websites, we are not, directly or indirectly,
              implying any approval, association, sponsorship, endorsement, or affiliation with any linked
              website, unless specifically stated herein. We are not responsible for examining or evaluating,
              and we do not warrant the offerings of, any businesses or individuals or the content of their websites.
              We do not assume any responsibility or liability for the actions, products, services and content of any
              other third parties. You should carefully review the legal statements and other conditions of use of any
              website which you access through a link from this Website. Your linking to any other off-site pages or
                    other websites is at your own risk.</p>
              <p className={styles.header}>4.6 Advertisements</p>
              <p className={styles.paragraph}>During use of the Website, you may enter into correspondence with or participate in promotions
              of advertisers or sponsors showing their goods or services through the Website. Any such activity,
              and any terms, conditions, warranties or representations associated with such activity, is solely
              between you and the applicable third-party. We shall have no liability, obligation or responsibility
                    for any such correspondence, purchase or promotion between you and any such third-party.</p>
              <p className={styles.header}>4.7 Prohibited uses</p>
              <p className={styles.paragraph}>In addition to other terms and conditions as set forth in the Agreement, you are prohibited from using the website or its content:</p>
              <p className={styles.paragraph}>(a) For any unlawful purpose;</p>
              <p className={styles.paragraph}>(b) To solicit others to perform or participate in any unlawful acts;</p>
              <p className={styles.paragraph}>(c) To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; Including but not
                    limited to all laws set by the U.A.E. government governing both commercial and digital business practices now and in the future.</p>
              <p className={styles.paragraph}>(d) To infringe upon or violate our intellectual property rights or the intellectual property rights of others;</p>
              <p className={styles.paragraph}>(e) To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation,
                    religion, ethnicity, race, age, national origin, or disability;</p>
              <p className={styles.paragraph}>(f) To submit false or misleading information;</p>
              <p className={styles.paragraph}>(g) To upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the
                    functionality or operation of the Service or of any related website, other websites, or the Internet;</p>
              <p className={styles.paragraph}>(h) To collect or track the personal information of others;</p>
              <p className={styles.paragraph}>(i) To spam, phish, pharm, pretext, spider, crawl, or scrape;</p>
              <p className={styles.paragraph}>(j) For any obscene or immoral purpose; or</p>
              <p className={styles.paragraph}>(k) To interfere with or circumvent the security features of the Service or any related website,
              other websites, or the Internet. We reserve the right to terminate your use of the Service or any related
                    website for violating any of the prohibited uses.</p>
              <p className={styles.header}>4.8 Rights</p>
              <p className={styles.paragraph}>LumSum reserves the right to:</p>
              <p className={styles.paragraph}>(a) Change, suspend or end any Service;</p>
              <p className={styles.paragraph}>(b) Terminate, limit or deny access to some or all of the Website to any user with or without any prior notice;</p>
              <p className={styles.paragraph}>(c) Change the features without any prior notice; and</p>
              <p className={styles.paragraph}>(d) Restrict, suspend, or terminate your account</p>
              <br />
              <p className={styles.paragraph}>in the event LumSum believes that you may be in breach of this Agreement or law or are misusing
              the Website or it’s Services.User hereby agree that in no event shall the Website be liable to the
              User or any third parties for any inability to use the Website (whether due to disruption, limited access,
              changes to or termination of any features on the Website or otherwise), any delays, errors or omissions
              with respect to any communication or transmission, or any damage (direct, indirect, consequential or otherwise)
                    arising from the use of or inability to use the Website or any of its features.</p>
              <p className={styles.header}>4.9 Intellectual Property Rights</p>
              <p className={styles.paragraph}>This Agreement does not transfer from LumSum to you any of LumSum’s or third party’s intellectual property,
                    and all right, title, and interest in and to such property will remain (as between the parties) solely with LumSum.</p>
              <p className={styles.paragraph}>All trademarks, service marks, graphics and logos used in connection with our Website or Services,
              are trademarks or registered trademarks of LumSum or LumSum licensors. Other trademarks, service marks,
              graphics and logos used in connection with our Website or Services may be the trademarks of other third parties.
              Your use of our Website and Services does not in any way grant you the  license to reproduce or otherwise
                    use any LumSum or third-party trademarks.</p>
              <p className={styles.header}>4.10 Copyright</p>
              <p className={styles.paragraph}>Content on this Website is protected by copyright and/or other intellectual property rights.
                    LumSum retains copyright of Content except the third-party content and link to third party websites on <a href="/">www.lumsum.io</a> .
                    You shall not systematically extract or copy the Content through automated tools or manuals for any
                    purpose without written permission from LumSum. The Content available in the Website contains information
                    that has been compiled from published and publicly available sources and LumSum is in no way trying to
                    infringe on the respective copyrights or businesses of these entities.</p>
              <p className={styles.header}>4.11 Sub-Domain</p>
              <p className={styles.paragraph}>Sub-domain names or dedicated urls assigned by LumSum to its Users is the exclusive property of
              LumSum and the same is not permanent in any case. LumSum reserves the right, without prior notice,
                    at any point of time, to suspend or terminate or restrict access to or edit the Sub domain names.</p>
              <p className={styles.header}>4.12 Developers</p>
              <p className={styles.paragraph}>The web developers and any party that receives information from LumSum, to add, modify, delete,
              or amend the website shall not under any circumstances use, recreate, or modify the information/content
              originally intended for this website; and use in another project, advertisement or any media without
              the prior written consent of LumSum. This clause supersedes any previous agreements made between
                    LumSum and any developing party.</p>

              <h2 className={styles.subTitle}>5. DISCLAIMER OF WARRANTY</h2>
              <p className={styles.header}>LumSum:</p>
              <p className={styles.paragraph}>a)expressly disclaims all warranties of any kind, whether express or implied, including but not
              limited to the implied warranties of merchantability, fitness for a particular purpose,
                    accuracy of data and non-infringement;</p>
              <p className={styles.paragraph}>b)makes no warranty that the Service will be uninterrupted, timely, secure, or error free;</p>
              <p className={styles.paragraph}>c)makes no warranty that the Services will meet your requirements,nor do we make any warranty as
              to the results that may be obtained from the use of the Service or as to the accuracy or reliability
                    of any results or information obtained through the Service or that defects in the Service will be corrected;</p>
              <p className={styles.paragraph}>d)makes no warranty regarding any services purchased or obtained through the Service or any transactions entered
                    into through the Service; and</p>
              <p className={styles.paragraph}>e)Provide the Service including but not limited to content and information on an AS IS and AS AVAILABLE basis.
              You understand and agree that any material and/or data downloaded or otherwise obtained through the use of
              Service or reliance upon any content is done at your own discretion and risk and that you will be solely
              responsible for any damage to your computer system or loss of data that results from the download of
              such material and/or data. No advice or information, whether oral or written, obtained by you from
                    us or through the Service shall create any warranty not expressly made herein.</p>

              <h2 className={styles.subTitle}>6. LIMITATION OF LIABILITY</h2>
              <p className={styles.paragraph}>To the fullest extent permitted by applicable law, in no event will LumSum, its affiliates, officers,
              directors, employees, agents, suppliers or licensors be liable to any person for: any indirect, incidental,
              special, punitive, cover or consequential damages (including, without limitation, damages for lost profits,
              revenue, sales, goodwill, reputation, use or content, impact on business, business interruption, loss of
              anticipated savings, loss of business opportunity) however caused, under any theory of liability, including,
              without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Lumsum
              has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent
              permitted by applicable law, the aggregate liability of LumSum and its affiliates, officers, employees, agents,
              suppliers and licensors, relating to the services will be limited to an amount not greater than any amounts
              actually paid in cash by you to LumSum for the prior one-month period prior to the first event or occurrence
              giving rise to such liability. This limitation of liability is part of the basis of the bargain between you
              and LumSum. The limitations and exclusions also apply if this remedy does not fully compensate you for any
                    losses or fails of its essential purpose.</p>

              <h2 className={styles.subTitle}>7. INDEMNITIES</h2>
              <p className={styles.paragraph}>You will at all times fully indemnify and hold harmless LumSum and its affiliates, directors, officers,
              employees, and agents from and against any liabilities, losses, damages or costs in connection with or
              arising from any third-party allegations, proceedings, claims, actions, disputes, demands, damages, fines,
              costs, expenses and charges, which are incurred or suffered by LumSum and its affiliates, directors, officers,
              employees, and agents as a result of or relating to Your content, your use of the Website or Services, your
              conduct, including, but not limited to,any breach of this Agreement and claims threatened or made against
              us arising as a result of your non-compliance with any of your representations, warranties or
                    obligations set out in this Agreement.</p>

              <h2 className={styles.subTitle}>8. SEVERABILITY</h2>
              <p className={styles.paragraph}>All rights and restrictions contained in the Agreement may be exercised and shall be applicable
              and binding only to the extent that they do not violate any applicable laws and are intended to be
              limited to the extent necessary so that they will not render the Agreement illegal, invalid or
              unenforceable. If any provision or portion of any provision of the Agreement shall be held to
              be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention
              of the parties that the remaining provisions or portions thereof shall constitute their agreement
              with respect to the subject matter hereof, and all such remaining provisions or portions thereof
                    shall remain in full force and effect.</p>

              <h2 className={styles.subTitle}>9. APPLICABLE LAW AND JURISDICTION</h2>
              <p className={styles.paragraph}>This Agreement is governed by and construed in accordance with the laws of U.A.E and you agree,
              in the event of any dispute arising in relation to this Agreement or any dispute arising in
              relation to the Website, to submit to the jurisdiction of the courts located at Ras Al Khaimah,
                     U.A.E for the resolution of all such disputes.</p>

              <h2 className={styles.subTitle}>10. ASSIGNMENT</h2>
              <p className={styles.paragraph}>You may not assign, resell, sub-license or otherwise transfer or delegate any of your
              rights or obligations hereunder, in whole or in part, without our prior written consent,
              which consent shall be at our own sole discretion and without obligation; any such assignment
              or transfer shall be null and void. However, you agree that LumSum is free to assign any of
              its rights or obligations hereunder, in whole or in part, to any third party as part of the sale
                    of all or substantially all of its assets or stock or as part of a merger.</p>

              <h2 className={styles.subTitle}>11. CHANGES AND AMENDMENTS</h2>
              <p className={styles.paragraph}>LumSum reserves the right to modify this Agreement or its policies relating to the
              Website or Services at any time, effective upon posting of an updated version of this Agreement
              on the Website. When we do, we will revise the updated date at the bottom of this page.
              Continued use of the Website or Services after any such changes shall constitute your
                    consent to such changes. If you don't agree to these changes, you must stop using the Services.</p>

              <h2 className={styles.subTitle}>12. ACCEPTANCE OF THESE TERMS</h2>
              <p className={styles.paragraph}>This Agreement (including additional terms that may be provided by LumSum when you engage
              with a feature of the Service) is the only agreement between us regarding the Services
              and supersedes all prior agreements for the Services. If LumSum doesn't act to enforce a
              breach of this Agreement, that does not mean that LumSum has waived its right to enforce
              this Agreement. You acknowledge that you have read this Agreement and agree to all its terms
              and conditions. By using the Website or its Services you agree to be bound by this Agreement.
              If you do not agree to abide by the terms of this Agreement, you are not authorized to use or
                    access the Website and its Services.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}