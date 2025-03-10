export const startSession = (user: any, id: string, firstName: string) => {
  sessionStorage.setItem("email", user.email)
  sessionStorage.setItem("accessToken", user.accessToken)
  sessionStorage.setItem("id", user.uid)
  sessionStorage.setItem("firstName", firstName)
}

export const getSession = () => {
  return {
    email: sessionStorage.getItem("email"),
    accessToken: sessionStorage.getItem("accessToken"),
    id: sessionStorage.getItem("id"),
    firstName: sessionStorage.getItem("firstName")
  }
}

export const endSession = () => {
  sessionStorage.clear()
}

export const isLoggedIn = () => {
  return getSession().accessToken
}
