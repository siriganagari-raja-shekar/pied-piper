import "./../Assets/Styles/Header.scss";
import { useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";

const Header = () => {

    useEffect(() => {
        document.querySelectorAll(".nav-link").forEach(link => {
            if (!link.classList.contains("fs-5"))
                link.classList.add("fs-5");
        });
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand mx-5" to="/">Pied Piper</Link>
                <button className="navbar-toggler mx-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link navactive" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/subscribe">Subscribe</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                        </ul>
                        <a className="nav-link p-sm-2" href="#">Sign Up</a>
                        <button className="btn btn-primary mx-sm-3 mt-3 mt-sm-0 login-btn fs-5">
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );

}


export default Header;