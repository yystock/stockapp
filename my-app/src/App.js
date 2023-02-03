import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import Reset from "./components/ResetPassword";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Stock from "./components/stock/Stock";
import News from './components/News';
import Market from "./components/Market";
import Layout from "./components/Layout";
import Sector from "./components/Sector";
import Option from './components/options/Option';
import Future from './components/futures/Future';
import Crypto from './components/crypto/Crypto';
import Account from './components/Account';
import Premium from './components/Premium';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 
  return (
    <AuthProvider>
      <BrowserRouter>  
        <Routes>
          <Route index element={<Landing/>}/>
          <Route exact path="/login" element={<Login/>}/>
          {/* <Route exact path="/reset" element={<Reset/>} /> */}
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/premium" element={<Premium/>} />
        
          <Route exact path="/dashboard" element={<><PrivateRoute><Layout/></PrivateRoute></>}>
          <Route exact path="main" element={<Dashboard/>}/>
          <Route exact path="sector" element={<Sector/>}/>
          <Route exact path="stock" element={<Stock/>}/>
          <Route path="market" element={<Market/>}/>
          <Route path="news" element={<News/>}/>
          <Route path="option" element={<Option/>}/>
          <Route path="future" element={<Future/>}/>
          <Route path="crypto" element={<Crypto/>}/>
          
          </Route>
          <Route exact path="/account" element={<><PrivateRoute><Account/></PrivateRoute></>}/>
          
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
