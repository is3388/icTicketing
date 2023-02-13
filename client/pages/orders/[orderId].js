import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders') // redirect to a list of user's orders
  })

  // call it one time after the component is rendered bc using empty []
  useEffect(() => {
    const findTimeLeft = () => {
      // const dateNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
      // const msLeft = new Date(order.expiresAt) - dateNow;
      const msLeft = new Date(order.expiresAt) - new Date() // calculate millisec left for order to be expired
      setTimeLeft(Math.round(msLeft / 1000)) // into second
    }
    findTimeLeft() // invoke it immediately bc setInterval will wait 1 sec for the component to reder first before kicks in
    const timerId = setInterval(findTimeLeft, 1000)
    
    return () => { // setInterval keep running forever unless we navigate away from this component
      // therefore needs to stop the interval entirely
      clearInterval(timerId)
    }
  }, [order])

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }

  // callback function to return a token so that use it to make a post request to Payment Service
  // Payment service will be responsible for billing the user's credit card
  // the key provide is publishable API key
  return (
    <>
    <div>Time left to pay: {timeLeft} seconds</div>
    <div>
    <StripeCheckout 
    // destructure to only token's id
      token ={({id}) => doRequest({token: id})}
      //stripKey = 'pk_test_51MYdwiLkh0p4PgVlmifgAUCIfE6zHak7X848kQEAKFqkp6Z6E897QmUo34VQnk2gdPqKLq8IBbZ4InPgO6URdtt100aEzEAm7m' 
      stripKey = {process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
      amount={order.ticket.price * 100}
      email = {currentUser.email} 
      />
  </div>
  <div>{errors}</div>
  </>
  )
}

// fetch the info about the order when the component first renders using nextjs fn
OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query
  const { data } = await client.get(`/api/orders/${orderId}`)
  return { order: data }
}

export default OrderShow