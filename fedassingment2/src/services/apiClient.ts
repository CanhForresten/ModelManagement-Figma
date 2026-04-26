// Så slipper vi for gentagende fetches

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}