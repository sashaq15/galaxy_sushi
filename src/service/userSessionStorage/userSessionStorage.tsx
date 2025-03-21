export const startSession = (user: any) => {
  sessionStorage.setItem("email", user.email)
  sessionStorage.setItem("accessToken", user.accessToken)
  sessionStorage.setItem("id", user.uid)
}

export const getSession = () => {
  return {
    email: sessionStorage.getItem("email"),
    accessToken: sessionStorage.getItem("accessToken"),
    id: sessionStorage.getItem("id"),
  }
}

export const endSession = () => {
  sessionStorage.clear()
}

export const isLoggedIn = () => {
  return getSession().accessToken
}
