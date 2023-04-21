import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./controller/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Mainpage />} />

            <Route path="/:movieId" exact element={<Mainpage />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
