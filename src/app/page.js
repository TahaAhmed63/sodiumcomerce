import Home from "@/app/Home";

async function getPageData() {
  try {
    const res = await fetch(
      "https://innovatechagency.tech/sodium/wp-json/wp/v2/pages/139",
      { cache: "no-store" } // Ensures fresh data on each request
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export default async function Page() {
  const data = await getPageData();
  return <Home data={data} />;
}
