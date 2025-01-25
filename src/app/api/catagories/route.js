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

    try{
        const apiResponse = await api.get("products/categories")
        const catagories= await apiResponse?.data || [];
        return NextResponse.json(catagories)
    }catch(error){
        responseData.error = error.message;
        console.error("Error fetching products:", error);
        return NextResponse.json(catagories, { status: 500 });
    }
}