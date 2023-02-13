import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
//import Router from 'next/Router'
import { useRouter } from 'next/router'
 
const signOut = () => {
  const router = useRouter()
  // useRequest to make a request to sign user out and redirect to the landing page
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => 
      router.push('/')
  })

  useEffect(() => {
    doRequest()
  }, []) // call it once
  return <div>Signing you out...</div>;
}

export default signOut