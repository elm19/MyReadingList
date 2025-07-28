import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DMCA Policy - OurReadingList",
  description: "Information regarding OurReadingList' Digital Millennium Copyright Act (DMCA) policy.",
};

export default function DMCAPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>DMCA Policy</h1>
      <p>
        OurReadingList respects the intellectual property rights of others and expects its users to do the same.
        In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we will respond promptly to claims of copyright infringement committed using the OurReadingList service.
      </p>
      <h2>1. Notification of Infringement</h2>
      <p>
        If you are a copyright owner or an agent thereof and believe that any content on OurReadingList infringes upon your copyrights,
        you may submit a notification pursuant to the DMCA by providing our Copyright Agent with the following information in writing:
      </p>
      <ul>
        <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;</li>
        <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site;</li>
        <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit the service provider to locate the material;</li>
        <li>Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and, if available, an electronic mail;</li>
        <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and</li>
        <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
      </ul>
      <h2>2. Counter-Notification</h2>
      <p>
        If you believe that your content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner,
        the copyright owner&apos;s agent, or pursuant to the law, to post and use the content, you may send a counter-notification containing the following information to our Copyright Agent:
      </p>
      <ul>
        <li>Your physical or electronic signature;</li>
        <li>Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled;</li>
        <li>A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content; and</li>
        <li>Your name, address, telephone number, and e-mail address, a statement that you consent to the jurisdiction of the federal court in San Francisco, California, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
      </ul>
    </div>
  );
}