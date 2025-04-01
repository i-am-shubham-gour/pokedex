import { Pages } from "./component/pages";
import "./App.scss";
import { AuthContextProvider } from "./component/authContentAPi/authContentApi";
import { axiosConfig } from "./axiosConfig";

function App() {
  axiosConfig();
  return (
    <AuthContextProvider>
      <Pages />
    </AuthContextProvider>
  );
}

export default App;
