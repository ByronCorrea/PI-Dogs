import "./App.css";
import Intro from "./components/Intro/Intro.jsx";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.jsx";
import Favorites from "./components/Favorites/Favorites.js";
import Create from "./components/Create/Create.jsx";
import Nav from "./components/Nav/Nav.jsx";
import Details from "./components/Home/Details/Details";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route exact path="/" component={Intro} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/create" component={Create} />
        <Route path="/details/:id" component={Details} />
        {/* <Redirect path="*" to="/" /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
