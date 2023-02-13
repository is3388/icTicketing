import { useState } from 'react'
//import axios from 'axios'
import useRequest from '../../hooks/use-request'
//import Router from '/next/Router'
import { useRouter } from 'next/router'

const signIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [errors, setErrors] = useState([])
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => {
      router.push('/')
    }
  })
  const submitHandler = async (event) => {
    event.preventDefault()
    await doRequest()
    /* try {
      const {data} = await axios.post('/api/users/signup', { email, password })
      console.log(data)
    }
    catch (err) {
      setErrors(data.errors)
    } */
  }
  return (
  <form onSubmit={submitHandler}>
    <h1>Sign In</h1>
    <div className='form-group'>
      <label>Email Address:</label>
      <input className='form-control' value={email} onChange={e=> setEmail(e.target.value)} />
    </div>
    <div className='form-group'>
      <label>Password:</label>
      <input className='form-control' value={password} onChange={e=> setPassword(e.target.value)} />
    </div>
    { errors }
    {/*{ errors.length > 0 && (<div className='alert alert-danger'>
      <h4>Ooops...</h4>
      <ul className='my-0'>
        {errors.map(error => (
          <li key={error.message}>
            {error.message}
          </li>)
          )}
      </ul>
    </div> )}*/} 
    <button className='btn btn-primary'>Sign In</button>
  </form>
  )
}

export default signIn