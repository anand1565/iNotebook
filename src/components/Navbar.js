import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export default function Navbar() {

    const navigate = useNavigate();

    let location = useLocation();
    useEffect(() => {
    }, [location]);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/'}?"active":""`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about'}?"active":""`} to="/about">About</Link>
                        </li>
                    </ul>
                    {/* <form className='d-flex mx-2'>
                    </form> */}
                    {(!localStorage.getItem('token')) ? <form className="d-flex">
                        <div className="btn-group ">
                            <Link to="/login" className="btn btn-outline-primary " aria-current="page">Login</Link>
                            <Link to="/signup" className="btn btn-outline-primary me-3 ">SignUp</Link>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </div>
                    </form> : <button onClick={handleLogOut} className="btn btn-outline-primary ">Log Out</button>}
                </div>
            </div>
        </nav>
    )
}
