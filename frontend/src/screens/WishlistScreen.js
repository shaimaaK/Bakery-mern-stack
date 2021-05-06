import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../AppContext';
import Menu from '../components/Menu';

const WishlistScreen = () => {
    const [globalState, setGlobalState] = useContext(AppContext);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    let formData = new FormData();
    formData.append('userId', globalState.user.id)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND}/wishlist/all`,
            {
                method: 'POST',
                body: formData
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div>
                    <section class="food-area section-padding">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="section-top">
                                        <h3><span class="style-change">❤ </span> Backery<br /></h3>
                                        <p class="pt-3">They're fill divide i their yielding our after have him fish on there for greater man moveth, moved Won't together isn't for fly divide mids fish firmament on net.</p>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                {
                                    items.map(
                                        item => {
                                            return <div class="col-md-4 col-sm-6"> {<Menu image={item.imageurl} title={item.productname} details={item.details} price={item.price
                                            } />} </div>
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        )
    }
}

export default WishlistScreen