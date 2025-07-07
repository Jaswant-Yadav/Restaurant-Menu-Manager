import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const [ username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

     useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            Navigate('/')
        }
    })

     const handleLogin = async () => {
        console.log("username", "password", username, password);
        let result = await fetch('http://localhost:4000/login', {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.username) {
            localStorage.setItem("user", JSON.stringify(result.username));
          
            Navigate('/')
        } else {
            alert("Please enter correct email and password");
        }
    }

    const directSignup =()=>{
        Navigate('/signup')
    }

    return(
        <div className="login">
            <h1>Login Page</h1>

            
            <input type="text" className="inputBox" placeholder="Enter your username"
            onChange={(e)=>setUsername(e.target.value)} value={username} />
             

            
            <input type="password" className="inputBox" placeholder="Enter your password"
             onChange={(e) => setPassword(e.target.value)} value={password} />

            <button type="button" className="loginbtn" onClick={handleLogin}>Login</button><br /><br />

            <a href="signup" className="signlink" onClick={directSignup}>New user? Register here</a>
        </div>
    )
}

export default Login;