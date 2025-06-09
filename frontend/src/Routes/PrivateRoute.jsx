import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

const PrivateRoute = ({ allowedRoles }) => {
  const { loading } = useContext(UserContext)

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />
}

export default PrivateRoute
