import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup =()=>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const navigate = useNavigate();

     useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/login')
        }
    })

        const collectData = async () => {
        console.log(username,password, email, fullname )

        let result = await fetch('http://localhost:4000/register', {
            method: 'post',
            body: JSON.stringify({ username,password, email, fullname }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json()
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
         if (result) {
            navigate('/login')
        }
    }

    const directLogin =()=>{
        navigate('/login')
    }

    return(
        <div className="signup">
             <h1>Registration</h1>

          
            <input type="text" className="inputBox" placeholder="Enter User Name"
             value={username} onChange={(e)=>setUsername(e.target.value)} />
                         
            <input type="password" className="inputBox" placeholder="Enter Password"
            value={password} onChange={(e)=>setPassword(e.target.value)}  />
            
            <input type="text" className="inputBox" placeholder="Enter Email"
            value={email} onChange={(e)=>setEmail(e.target.value)} />

            <input type="text" className="inputBox" placeholder="Enter Full Name"
            value={fullname} onChange={(e)=>setFullname(e.target.value)} />

            <button type="button" className="signbtn" onClick={collectData}>Register</button><br /><br />

            <a href="login" className="loglink" onClick={directLogin}>Already have an accout? Login here</a>
        </div>
    )
}

export default Signup;