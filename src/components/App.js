import Header from "./Header";
import Speakers from "./Speakers";
import Layout from "./Layout";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <AuthProvider initialLoggedInUser="Ronald">
      <Layout startingTheme="light">
        <Header />
        <Speakers />
      </Layout>
    </AuthProvider>
  );
}

export default App;
