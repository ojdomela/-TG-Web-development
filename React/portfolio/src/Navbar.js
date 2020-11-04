import './Navbar.css';

function Navbar() {
    return (
        <nav className="topnav">
            <ul className="navList">
                <a className="navLink"><li className="navItem">Intro</li></a>
                <a className="navLink"><li className="navItem">Credentials</li></a>
                <a className="navLink"><li className="navItem">Projects</li></a>
                <a className="navLink"><li className="navItem">Contact</li></a>
            </ul>
        </nav>
    );
}

export default Navbar;