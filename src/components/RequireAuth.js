import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../components/Auth'

export function RequireAuth({ children }) {
  let auth = useAuth()
  let location = useLocation()

  localStorage.setItem('redirect', location.pathname)

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/auth/login' state={{ from: location }} replace />
  } else if (!auth.user.isSubscribed) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate to='/auth/get-started' state={{ from: location }} replace />
    )
  }

  return children
}
