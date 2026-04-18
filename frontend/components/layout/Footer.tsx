import { fetchFromBackend } from "@/lib/serverFetch";
import FooterClient from "./FooterClient";

const FALLBACK_CONTACT = {
  address: "Main Road, Tatibandh, Raipur, Chhattisgarh 492001",
  email: "calcuttasweets@example.com",
  phone: "+91 99930 60082",
  hours: "9 AM — 10 PM",
  socialLinks: [] as { platform: string; url: string }[],
};

function mapContact(c: any) {
  const pickLinks = (raw: unknown) =>
    Array.isArray(raw)
      ? raw.filter(
          (row: { platform?: string; url?: string }) =>
            typeof row?.platform === "string" &&
            row.platform.trim().length > 0 &&
            typeof row?.url === "string" &&
            row.url.trim().length > 0
        )
      : [];

  // Legacy plain fallback object from serverFetch (no id)
  if (c.hours && !c.id) {
    return {
      address: c.address ?? FALLBACK_CONTACT.address,
      email: c.email ?? FALLBACK_CONTACT.email,
      phone: c.phone ?? FALLBACK_CONTACT.phone,
      hours: typeof c.hours === "string" && c.hours.trim() ? c.hours : FALLBACK_CONTACT.hours,
      socialLinks: pickLinks(c.socialLinks),
    };
  }

  return {
    address: c.address ?? FALLBACK_CONTACT.address,
    email: c.email ?? FALLBACK_CONTACT.email,
    phone: c.phone ?? FALLBACK_CONTACT.phone,
    hours: c.hours?.trim() ? c.hours : FALLBACK_CONTACT.hours,
    socialLinks: pickLinks(c.socialLinks),
  };
}

export default async function Footer() {
  const data = await fetchFromBackend("/contact", {
    fallback: FALLBACK_CONTACT,
  });

  // Handle case where API might return an array of contacts
  const rawContact = Array.isArray(data) ? data[0] : data;
  
  const contact = mapContact(rawContact || FALLBACK_CONTACT);

  return <FooterClient contact={contact} />;
}