import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8085/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZmE1N2YzYWI3NWM5NDc2Y2RmODk1In0sImlhdCI6MTY5NzYyMTQwMH0.qSaOzDYcvhYjhNpxlU-HRfWa8qDn9gZlitEiJCR4di4"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect 
            localStorage.setItem('token', json.authToken);
            navigate("/login");
            props.ShowAlert("Account Created Successfully", "success");
        }
        else {
            props.ShowAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container my-5 bg-secondary p-5'>
            <h2 className='text-center'>Sign Up to continue to iNotebook</h2>
            <form className='mt-5' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name </label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={6} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} minLength={6} required />
                </div>
                <div>
                    {credentials.password !== credentials.confirmPassword && "Password should match"}
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
