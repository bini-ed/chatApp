import "./App.css";
import { Route } from "react-router-dom";
import HomePageScreen from "./components/homePageScreen";
import ChatScreen from "./components/chatScreen";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={HomePageScreen}></Route>
      <Route path="/chat" component={ChatScreen}></Route>
    </div>
  );
}

export default App;
