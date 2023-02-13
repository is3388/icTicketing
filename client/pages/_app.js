// this file for next.js to wraps up each component inside pages directory into its own
// default Component called app in order to apply styling for the whole nextjs project

import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  
  return (
    <div>
      <h1>
        <Header currentUser={currentUser ? currentUser : ""}/>
      </h1>
      <div className='container'>
      <Component currentUser={currentUser} {...pageProps} /> 
      </div>
    </div>
  
  )
}
// NextJS server issue when getInitialProps get called, it will block component to call getInitialProps()
// the argument passing to getInitialProps for this custom App Component is not simple req and res
// it is nested inside ctx object - context === {Component, ctx: {req, res}}
/* AppComponent is the parent of all child components LandingPage, ShowTicketPage, ShowOrderPage.
   When the user navigates to the root, nextjs finds index.js which shows the LandingPage Component
   Next calls the App's getInitialProps function by default which defined in AppComponent
   and fetch some data in this case is to find out who the current user is.
   Then we manually invoke the LandingPage's getInitialProps function too */
AppComponent.getInitialProps = async (appContext) => {
 //console.log(Object.keys(appContext)) // 'Component, 'router', 'ctx'
 const client = buildClient(appContext.ctx)
 const {data} = await client.get('/api/users/currentuser')
 // we manually invoke getInitialProps for individual page like LandingPage, SignIn, SignUp page so that can access currentUser state
 let pageProps = {}
 if (appContext.Component.getInitialProps) { // if this child component to be displayed has getInitialProps function, if yes, call it
  pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser)
}
  //console.log(pageProps)
  // return info will be showed up as Props on the top and pass it down to the child component as a prop
  // <Component {...pageProps} /> see the frontend code
  return {pageProps,
    ...data }// or currentUser: data.currentUser
 
 
 
}

export default AppComponent
