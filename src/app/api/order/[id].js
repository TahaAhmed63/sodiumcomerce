const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

// Initialize WooCommerce REST API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, // WooCommerce site URL
  consumerKey: process.env.WC_CONSUMER_KEY, // WooCommerce Consumer Key
  consumerSecret: process.env.WC_CONSUMER_SECRET, // WooCommerce Consumer Secret
  version: "wc/v3", // API version
});

export default async function handler(req, res) {
  const { id } = req.query; // Get order ID from the query parameters
  const responseData = {
    success: false,
    order: null,
  };

  try {
    // Fetch the order by ID
    const { data: order } = await api.get(`orders/${id}`);

    if (order) {
      responseData.success = true;
      responseData.order = order;
      res.json(responseData);
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching order by ID:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
