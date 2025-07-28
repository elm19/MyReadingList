import React from "react";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "DMCA", href: "/dmca" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", href: "/contact" },
      { name: "Ask for Help", href: "/ask-for-help" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaTwitter className="size-5" />, href: "https://twitter.com", label: "Twitter" },
];

const defaultLegalLinks = [
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export const Footer = ({
  logo = {
    url: "/",
    src: "/images/logo.svg", // Assuming you have a logo.svg in public/images
    alt: "OurReading List logo",
    title: "OurReading List",
  },
  sections = defaultSections,
  description = "Discover, curate, and share your reading journey.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} OurReadingList. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <section className="z-100  bottom-0 r-full bg-background border-t border-gray-200 dark:border-gray-800">
      <div className="container border-none mx-auto px-4">
        <div className="flex pt-4 w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logo.url}>
                {/* If you want to display a logo image, uncomment and adjust */}
                {/* <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8"
                /> */}
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </Link>
            </div>
            <p className="text-muted-foreground max-w-[70%] text-sm">
              {description}
            </p>
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground p-0 mt-8 flex flex-col justify-between gap-4 border-t border-gray-200 dark:border-gray-800 py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <Link href={link.href}> {link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

