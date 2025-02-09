import Image from "next/image";
import WPBakeryRenderer from "@/Components/wpBakeryComponents/WpBakeryRender";
// import SinglePageHeader from "@/Components/singlepageheader/SinglePageHeader";
// import Allpagebanner from "@/assets/homepage-images/allpagebanner.jpg";
import { notFound } from "next/navigation";

// ✅ Function to fetch all pages (for Static Generation)
async function fetchAllPages() {
  try {
    const res = await fetch(
      "https://innovatechagency.tech/sodium/wp-json/wp/v2/pages/",
      { cache: "no-store" } // Always fetch fresh data
    );

    if (!res.ok) throw new Error("Failed to fetch pages");

    return await res.json();
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return [];
  }
}

// ✅ Pre-generate static paths (only works in production mode)
export async function generateStaticParams() {
  const allPages = await fetchAllPages();
  
  return allPages.map((page) => ({
    slug: page.slug,
  }));
}

// ✅ Fetch single page data based on slug
async function fetchPageData(slug) {
  const allPages = await fetchAllPages();
  return allPages.find((page) => page.slug === slug) || null;
}

// ✅ Generate metadata dynamically
export async function generateMetadata({ params }) {
  const pageData = await fetchPageData(params.slug);
  if (!pageData) return {};
  
  return {
    title: pageData?.title?.rendered,
  };
}

// ✅ Page Component (Server Component)
export default async function Page({ params }) {
  const pageData = await fetchPageData(params.slug);

  if (!pageData) {
    notFound(); // Show 404 page if slug doesn't match
  }

  return (
    <>
      {/* <SinglePageHeader title={pageData?.title?.rendered} pagebanner={Allpagebanner} /> */}
      <div className="container">
        <WPBakeryRenderer content={pageData?.parsed_wp_bakery_content} />
      </div>
    </>
  );
}
