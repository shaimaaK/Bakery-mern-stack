import { useContext } from 'react'
import AppContext from '../AppContext'
import { useHistory } from "react-router-dom";

const LogoutScreen = () => {
    const [globalState, setGlobalState] = useContext(AppContext);
    const history = useHistory();

    console.log(globalState.loggedIn)
    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        history.push('/')
        setGlobalState(
            {
                ...globalState,
                loggedIn: false,
                user: {}
            }
        )
    }


    return (
        <div className="jumbotron jumbotron-fluid" style={{ 'margin-top': '150px', 'margin-bottom': '150px' }}>
            <div className="container">
                <h2 style={{ 'color': 'black' }}>Are You Sure You Want To Logout</h2>
                <button onClick={logout} className="btn btn-danger my-3">logout anyways</button>
            </div>
        </div>
    )

}
export default LogoutScreen