import React, {useState}  from 'react';
import {Button, Image} from "react-bootstrap"
import {NavLink } from 'react-router-dom';
import { Home,Menu,List,Target,BarChart,DollarSign,BarChart2,Cloud,X,Layers} from 'react-feather';
import logo from './logo.svg';

const SideBar = () => {
  const [isExpanded, setExpendState] = useState(false);
  const toggle = () => setExpendState(!isExpanded);
  return (
    <div className={isExpanded? "sidebar-container": "sidebar-container sidebar-container-n"}> 
      <div className='sidebar-header'>
        <NavLink to="/">
          {isExpanded && <Image
          src={logo}
          />}
        </NavLink>
        {isExpanded && <Button className="close-b" onClick={() => toggle()}> 
        <X fill='#FFFFFF'/>
        </Button>}
        {!isExpanded && <Button className="menu-b" onClick={() => toggle()}> 
          <Menu fill='#FFFFFF'/>
        </Button>}
      </div>
      <div className="sidebar-items"
          onMouseEnter={() => setExpendState(true)}
          onMouseLeave={() => setExpendState(false)}>
          <NavLink className='sidebar-link' to="main" end><Home/>{isExpanded && <p>Home</p> }</NavLink>           
          <NavLink className='sidebar-link' to="news"><Target/>{isExpanded && <p>News</p> }</NavLink>
          <NavLink className='sidebar-link' to="stock"><BarChart2/>{isExpanded && <p>Stock</p> }</NavLink>
          <NavLink className='sidebar-link' to="option"><DollarSign/>{isExpanded && <p>Option</p> }</NavLink>
          <NavLink className='sidebar-link' to="sector"><Cloud/>{isExpanded && <p>Sector</p> }</NavLink>
          <NavLink className='sidebar-link' to="market"><BarChart/>{isExpanded && <p>Market</p> }</NavLink>
          <NavLink className='sidebar-link' to="crypto"><Layers/>{isExpanded && <p>Crypto</p> }</NavLink>       
          <NavLink className='sidebar-link' to="future"><List/>{isExpanded && <p>Future</p> }</NavLink>
      </div>
    </div>
    );
  };


export default SideBar;