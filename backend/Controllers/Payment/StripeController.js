require("dotenv").config();
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Checkout = async (req, res) => {
  const { product } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              description: product.description,
              images:[product.img]
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/failed`,
    });
    res.status(200).json({id:session.id});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allCheckout = async(req, res)=>{
  const {productsToCheckout,userId,selectedAddress,cartId}=req.body;
  try{
    const session=await stripe.checkout.sessions.create({
      payment_method_types:['card'],
      line_items:productsToCheckout.map((product)=>{
        return{
          price_data:{
            currency:'inr',
            product_data:{
              name:product.name,
              description:product.description,
              images:[product.img]
            },
            unit_amount:product.price*100
          },
          quantity:product.quantity
        }}),
      mode:'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/failed`,
      metadata: {
        userId: userId,
        cartId: cartId,
        selectedAddress:JSON.stringify(selectedAddress),
      }
    })
    res.status(200).json({id:session.id});
  }  catch (error) {
  console.error("Stripe session error:", error); // Add this line
  res.status(500).json({ error: error.message });
}
};
  

module.exports =  {Checkout,allCheckout} ;
