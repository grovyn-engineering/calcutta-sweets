import { fetchFromBackend } from "@/lib/serverFetch";
import FooterClient from "./FooterClient";

const FALLBACK_CONTACT = {
  address: "Main Road, Tatibandh, Raipur, Chhattisgarh 492001",
  email: "calcuttasweets@example.com",
  phone: "+91 99930 60082",
  hours: "9 AM — 10 PM",
};

function mapContact(c: any) {
  // If fallback object directly
  if (c.hours && !c.id) return c;

  return {
    address: c.address ?? FALLBACK_CONTACT.address,
    email: c.email ?? FALLBACK_CONTACT.email,
    phone: c.phone ?? FALLBACK_CONTACT.phone,
    hours: FALLBACK_CONTACT.hours, // Backend model doesn't have hours currently
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