// app/api/get-products/route.js
import { NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const perPage = searchParams.get("perPage") || 50;
  const page = searchParams.get("page") || 1;

  const responseData = {
    success: false,
    products: [],
  };

  try {
    const apiResponse = await api.get("products", {
      per_page: perPage,
      page,
      _fields: "id,name,price,images,price_html,status,slug,short_description,stock,type,variations",
    });

    const products = apiResponse?.data || [];
    responseData.success = true;
    responseData.products = products;

    return NextResponse.json(responseData);
  } catch (error) {
    responseData.error = error.message;
    console.error("Error fetching products:", error);
    return NextResponse.json(responseData, { status: 500 });
  }
}
