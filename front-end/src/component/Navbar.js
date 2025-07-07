import React from "react";
import { Link, useNavigate} from 'react-router-dom';

const Navbar =()=>{
     const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout =()=>{
        localStorage.clear();
        navigate('/signup')
    }

    return(
        <div>
          { auth ?   <ul className="navbar-ul">
                <li><Link to="/">Menu</Link></li>
                <li><Link to="/addmenu">Add Menu</Link></li>
                
                <li><Link onClick={logout} to = "/signup">Logout</Link></li>
                
           </ul> :

           <ul className="navbar-ul nav-right">
                <li><Link to = "/signup">Sign Up</Link></li>
                <li><Link to = "/login">Log in</Link></li>
            </ul>
}
        </div>
    )
}

export default Navbar;