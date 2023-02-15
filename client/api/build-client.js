import axios from 'axios'
// helper file to create a different copy of axios depending on our app running on Kubernetes cluster or on the browser
// take incoming request with headers and env and then use logic to build a preconfig version of axios 
// that work on the current env
// req is the object what receive from the NextJS app and inside it has headers contains host and cookie etc
// we need to run this buildClient function before running getInitialProps bc need to know our app running on server or on browser
const buildClient = ({ req }) => {
  // window object only exists on browser not server
  if (typeof window === 'undefined') {
    // we are on the server,  we are running our app or rendering our app on Kubernetes cluster during the 
    // server side rendering phase
    // axios.create() to create an instance of axios
    // baseURL now is for DEV cluster, need to put down the real domain name as baseURL for PROD cluster in Digital Ocean
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
  }
  else { // we are running our app on the browser no need to include headers as browser will append to the request auto
    return axios.create({
      baseURL: '/'
    })

  }
}

export default buildClient