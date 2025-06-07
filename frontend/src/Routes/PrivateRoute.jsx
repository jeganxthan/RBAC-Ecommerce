import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(UserContext)

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PrivateRoute
