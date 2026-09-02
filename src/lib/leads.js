// Public lead capture — called from marketing pages (no auth). Posts to the
// same Laravel backend as the Super Admin, tagged source: "ojar" so it shows
// up in the Super Admin Leads list alongside Designs Clue's own leads.

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function submitLead({ name, contact, sourcePage, message }) {
  const res = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      contact,
      source: "ojar",
      source_page: sourcePage,
      message,
    }),
  });

  if (!res.ok) throw new Error("Could not submit — please try again.");
  return res.json();
}
