import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import Appbar from './Components/Appbar/Appbar';
import BottomNavigation from './Components/BottomNavigation/Bottomnavigation';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Post from './Components/Post/Post';
import PostUpdate from './Components/PostUpdate/PostUpdate';
import Profile from './Components/Profile/Profile';
import Notification from './Components/Notification/Notification';
import Chat from './Components/Chat/Chat';
import Search from './Components/Search/Search';

function App() {
  return (
    <div className="App">

      <Router>

        <AuthProvider>

        <Appbar/>
        {/* <BottomNavigation/> */}

        <Switch>

          

          <Route exact path="/login">
          <Login/>
          </Route>

          <Route exact path="/signup">
          <Signup/>
          </Route>

          <PrivateRoute exact path="/" component={Home} />

          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          <PrivateRoute exact path="/search" component={Search} />

          <PrivateRoute exact path="/notification" component={Notification} />

          <PrivateRoute exact path="/post" component={Post} />

          <PrivateRoute exact path="/edit/:id" component={PostUpdate} />

          <PrivateRoute exact path="/chat-application" component={Chat} />

        </Switch>

        <BottomNavigation/>

        </AuthProvider>

      </Router>
      
    </div>
  );
}

export default App;
