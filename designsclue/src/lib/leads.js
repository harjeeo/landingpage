// Public lead capture — posts to the shared Laravel Super Admin backend,
// tagged source: "dc" so it shows up in the Super Admin Leads list
// alongside Ojar's own leads.

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function submitLead({ name, contact, sourcePage, message }) {
  const res = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      contact,
      source: "dc",
      source_page: sourcePage,
      message,
    }),
  });

  if (!res.ok) throw new Error("Could not submit — please try again.");
  return res.json();
}
