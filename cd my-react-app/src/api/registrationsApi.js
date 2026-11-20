const BASE_URL = "http://localhost:5173/api/registrations";

export async function fetchRegistrations({ search = "", status = "All", page = 1, pageSize = 5 }) {
  const params = new URLSearchParams({ search, status, page, pageSize });
  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch registrations");
  return res.json();
}

export async function createRegistration(newEntry) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  });
  if (!res.ok) throw new Error("Failed to create registration");
  return res.json();
}