const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  // CORS Headers for safety
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey.trim() === '') {
      return res.status(400).json({
        error: 'Stripe API key is missing. Please add STRIPE_SECRET_KEY in your Vercel Project Settings > Environment Variables, then redeploy.'
      });
    }

    const stripe = new Stripe(secretKey);

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { items } = body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    const origin = req.headers.origin || (req.headers.referer ? new URL(req.headers.referer).origin : 'https://flexifib.com');

    const line_items = items.map((item) => {
      const price = item.numericPrice || parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 5;
      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.title || 'FlexiFib Product',
            description: item.subtitle || 'Eco-friendly hemp product',
          },
          unit_amount: Math.round(price * 100), // amount in pence
        },
        quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'NL', 'IE'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'gbp' },
            display_name: 'Plastic-Free Eco Delivery (Free)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      line_items,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#shop`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create checkout session.' });
  }
};
