import CallPage from "./Components/callPage";
import ContactsList from "./Components/ContactsList";
import { Provider } from "react-redux";
import store from "./Redux/Store"

function App() {
  return (<>
    <Provider store={store}>
      <ContactsList />
      <CallPage />
    </Provider>
  </>)
}

export default App;
