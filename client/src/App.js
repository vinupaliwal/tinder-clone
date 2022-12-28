
import './App.css';
import Login from './components/Login';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
    <GoogleOAuthProvider clientId="1025198237355-ppv8l3tei7obopkkstognqmdstsam3ft.apps.googleusercontent.com">
    <Router>
     <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route path='/home/:email' element={< Home />}></Route>
     </Routes>
        {/* <GoogleOAuthProvider clientId="1025198237355-ppv8l3tei7obopkkstognqmdstsam3ft.apps.googleusercontent.com">
          <Login/>
        </GoogleOAuthProvider> */}
    </Router>
    </GoogleOAuthProvider>
    </div>
  );
}

export default App;

// clinetId = 1025198237355-ppv8l3tei7obopkkstognqmdstsam3ft.apps.googleusercontent.com