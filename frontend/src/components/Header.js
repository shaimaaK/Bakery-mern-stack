import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from '../AppContext'



const Header = (props) => {
    const [globalState, setGlobalState] = useContext(AppContext);
    console.log(globalState);

    return (

        <header className="header-area">
            <div className="container">
                <div class="row">
                    <div className="col-lg-2">
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
                                        (link, index) => (<li key={index}>
                                            <Link to={link.path}> {link.label}</Link></li>)
                                    )

                                }
                                {(globalState.loggedIn) ?
                                    <li className="dropdown"><a href="#"><img className="user-avatar" src={globalState.user.avatar? globalState.user.avatar : '/assets/images/user.svg' } /> {globalState.user.username}</a>
                                        <ul class="sub-menu">
                                            <li><a href="/wishlist">Wishlist</a></li>
                                            <li><a href="/logout">Logout</a></li>
                                            <li><a href="/update-profile">update account</a></li>
                                        </ul>
                                    </li>
                                    : <li className="dropdown"><a href="/login">Login</a>
                                        <ul class="sub-menu">
                                            <li><a href="/Register">Register</a></li>
                                        </ul>
                                    </li>                                    
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