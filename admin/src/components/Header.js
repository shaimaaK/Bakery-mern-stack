import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from '../AppContext'



const Header = (props) => {
    const [globalState, setGlobalState] = useContext(AppContext);

    return (

        <header className="header-area">
            <div className="container">
                <div class="row">
                    <div class="col-lg-2">
                        <div class="logo-area">
                            <a href="/"><img src={props.logo} width="159 px" height="49 px" alt="logo" /></a>
                        </div>
                    </div>
                    <div class="col-lg-10">
                        <div class="custom-navbar">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="main-menu">
                            <ul>
                                {
                                    props.links.map(
                                        (link, index) => (
                                        <li key={index}>
                                            <Link to={link.path}> {
                                                (globalState.loggedIn  && link.label == 'Logout') ?
                                                <img className="user-avatar" src={( localStorage.getItem('avatar')) ? localStorage.getItem('avatar') : '/assets/images/user.svg' } /> :''}
                                                {link.label}
                                            </Link>
                                        </li>)
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header;