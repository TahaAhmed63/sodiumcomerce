import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { NextResponse } from 'next/server';
import { isEmpty } from 'lodash';

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3',
});

export async function POST(req) {
  try {
    const body = await req.json();

    if (isEmpty(body)) {
      return NextResponse.json({ success: false, error: 'Required data not sent' }, { status: 400 });
    }

    body.status = 'pending';
    body.set_paid = false;

    const { data } = await api.post('orders', body);

    return NextResponse.json({
      success: true,
      orderId: data.number,
      total: data.total,
      currency: data.currency,
      paymentUrl: data.payment_url,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
