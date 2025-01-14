const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3",
});

export default async function handler(req, res) {
	const { slug } = req.query;
	const responseData = {
		success: false,
		product: null,
	};

	try {
		// Fetch products by slug
		const { data: products } = await api.get("products", {
			slug,
			status: "publish", // Ensure only published products are fetched
		});

		if (products.length > 0) {
			const product = products[0];
			
			// Fetch variations if it's a variable product
			if (product.type === "variable") {
				const { data: variations } = await api.get(
					`products/${product.id}/variations`
				);
				product.variations = variations;
			}
			
			responseData.success = true;
			responseData.product = product;
		} else {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.json(responseData);
	} catch (error) {
		console.error("Error fetching product by slug:", error.message);
		res.status(500).json({ success: false, message: error.message });
	}
}
