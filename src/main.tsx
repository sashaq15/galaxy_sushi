import ReactDOM from "react-dom/client"
import App from "./App.js"
import { store } from "./store/store.js"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
