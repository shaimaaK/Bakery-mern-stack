import React from 'react';
import { useState, useContext } from 'react';
import AppContext from '../AppContext'



const Menu = (props) => {
    const [colorState, setColorState] = useState('grey')
    const [globalState, setGlobalState] = useContext(AppContext)

    const formData = new FormData()
    const addToWishList = () => {

        let pId = props.productId
        let uId = globalState.user.id;

        formData.append('userId', uId);
        formData.append('productId', pId);
        if (colorState === "grey")
            fetch(`${process.env.REACT_APP_BACKEND}/wishlist/add`, {
                method: 'post',
                body: formData
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setColorState('red')
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        // setIsLoaded(true);
                        // setError(error);
                    }
                )
        else
            fetch(`${process.env.REACT_APP_BACKEND}/wishlist/remove`, {
                method: 'post',
                body: formData
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setColorState('grey')
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        // setIsLoaded(true);
                        // setError(error);
                    }
                )
    }
    return (


        <div class="single-food">
            <div class="food-img">
                <img src={props.image} class="img-fluid" alt="" />
            </div>
            <div class="food-content">
                <div class="d-flex justify-content-between">
                    <h5>{props.title}</h5>
                    <span class="style-change">{props.price}</span>
                </div>
                <p class="pt-3">{props.details}</p>
                <button class="btn bg-transparent" onClick={addToWishList}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={colorState} class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                    </svg>
                </button>
            </div>
        </div>




    )
}

export default Menu;