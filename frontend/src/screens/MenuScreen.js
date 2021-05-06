
import Menu from '../components/Menu';
import React, { useState, useEffect} from 'react';

                
function MenuScreen() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND}/product/list`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            console.log(result)
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
        return(
            <div>
                <div>
                    <section class="food-area section-padding">
                        <div class="container">
                        <div class="row"> 
                                <div class="col-md-5">
                                    <div class="section-top">
                                        <h3><span class="style-change">we serve</span> <br/>delicious bakeries</h3>
                                        <p class="pt-3">They're fill divide i their yielding our after have him fish on there for greater man moveth, moved Won't together isn't for fly divide mids fish firmament on net.</p>
                                    </div>
                                </div>

                            </div>

                        <div class="row">
                        {
                            items.map(
                           item => {
                                return <div class="col-md-4 col-sm-6"> {<Menu productId= {item._id} image = {item.imageurl} title= {item.productname} details ={item.details} price = {item.price
} />} </div>
                            }
                            )
                        }
                        </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
  }  

// Trail number:1 - ends

export default MenuScreen
