// pages/api/submit-form.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { formId, submissionData } = req.body;
  
    const apiKey = process.env.GRAVITY_WORDPRESS_API_KEY;
    const apiSecret = process.env.GRAVITY_WORDPRESS_API_SECRET;
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/gf/v2/forms/${formId}/submissions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        return res.status(200).json({ confirmation_message: result.confirmation_message });
      } else {
        return res.status(response.status).json({ error: result });
      }
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  