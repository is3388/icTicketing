import useRequest from "../../hooks/use-request"
import Router from 'next/router'

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id // ticketId is what we provide to the backend route and ticket.id is the ticketDoc
    },
    // navigate to a wildcard route in next, first arg is the filename path, 
    // second arg is the actual url we want to go to
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  })
  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: ${ticket.price}</h4>
      {errors}
      <button className='btn btn-primary' onClick={() => doRequest()}>Buy Now</button>
    </div>
  )
}
// use nextjs fn to load up info when the component first renders so we don't use the custom hook to make a request
TicketShow.getInitialProps = async (context, client) => {
// extract the ticketid from the url for which ticket is going to fetch
const { ticketId } = context.query // ticketId which is what we named this file in square braceket
const { data } = await client.get(`/api/tickets/${ticketId}`)
return { ticket: data } // this object will be merged into all other props to this component for accessing
}

export default TicketShow