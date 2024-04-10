import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
    typescript: true
})

export const getStripeSession = async({priceId, domianUrl, customerId}:{
    priceId: string,
    domianUrl: string,
    customerId: string
}) => {
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        billing_address_collection: 'auto',
        line_items: [{price: priceId, quantity: 1}],
        payment_method_types: ['card'],
        customer_update: {
            address: "auto",
            name: "auto",
        },
        success_url: `${domianUrl}/payment/success`,
        cancel_url: `${domianUrl}/payment/cancelled`,
    });

    return session.url as string;
};