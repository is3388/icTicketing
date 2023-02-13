// props from getInitialProps function for nextjs to fetch data during server side rendering process

import Link from 'next/link'

const LandingPage = ({currentUser, tickets}) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
          <a>View</a>
        </Link>
        </td>
      </tr>
    )
  })
  
  return (
    <div>
      <h1>Tickets for Sale</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  )
  }

// getInitialProps is next js function use to fetch data especially for initial rendering for our app from the server
// it is static function and it gets called only one time and the component gets rendered only one time immediately
// send back to the browser and cannot update the state etc
// req is the object what receive in NextJS app
//LandingPage.getInitialProps = ({req}) => {
// the argument passing to getInitialProps simple req and res
  LandingPage.getInitialProps = async (context, client, currentUser ) => {
  //console.log(req.headers) // headers include host(domanin) and cookie
  //console.log('I am on the server')
  //return {color: 'red'} // what it returns will be the props for the component so that component can get access to
  //const {data} = axios.post('/api/users/currentuser') // make a request from the server of nextjs inside client pod
  //return data // the returned data will be passing to as a prop for the component
  //if (typeof window === 'undefined') { // window object exists only in the browser
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk to reach out to ingress-nginx
    // and the path /api/users/currentuser is what we want it to be forward to
    // go to terminal and ticketing root $kubectl get namespace and $kubectl get services -n ingress-nginx
    // ingress-nginx-controller is the service and ingress-nginx is the namespace
    // service.namespace.svc.cluster.local
    // also specify the option to nginx the domain is ticketing.dev as it does not have a domain and the ingress-nginx srv file doesn't have a rule for it 
    //const {data} = axios.post('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    //{
      //headers: req.headers //{
        //Host: 'ticketing.dev'
      //}
    //}
    //)
  //   return data
  // } else {
  //   // we are on the browser!
  //   // requests can be made with a base url of '' and the browser will append the domain for us
  //   const {data} = axios.post('/api/users/currentuser')
  //   return data
  // }
  /* delete it because to get current user already fetched in _app.js 
  console.log('LANDING PAGE!')
  const client = buildClient(context) //build the client 
  const {data} = await client.get('/api/users/currentuser') // make the actual request
  return data 
  it is about fetching some data is required to show this component on the screen*/
  const {data} = await client.get('/api/tickets')
  return { tickets: data} // this object will be merged into the props that are being passed to the LandingPage
  // component, bc this object has a key tickets, we can receive that props as tickets inside this LandingPage component
}

export default LandingPage