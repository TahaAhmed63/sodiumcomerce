export default async function handler(req, res) {
    const { formId } = req.query;
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/gf/v2/forms/${formId}`;
    const apiKey = process.env.GRAVITY_WORDPRESS_API_KEY;
    const apiSecret = process.env.GRAVITY_WORDPRESS_API_SECRET;
  
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      });
  console.log(apiUrl)
      if (!response.ok) {

        return res.status(response.status).json({ message: 'Error fetching form data' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  