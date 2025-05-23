import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import MembershipPage from "./components/MembershipPage";

function App(){
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
                <Route path="/" element={<Feed/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/connections" element={<Connections/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/requests" element={<Requests/>}/>
                <Route path="/chat/:targetUserId" element = {<Chat/>}/>
                <Route path="/membership" element = {<MembershipPage/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
      
    </>
  )
}
export default App;
