import Stripe from 'stripe'

// create an instance of stripe and make available to the app

export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion:'2020-08-27'
  })
