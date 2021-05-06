import React from 'react';

const Menu = (props) => {
    return (
                  
                  
                      <div class="single-food">
                          <div class="food-img">
                              <img src={props.image} class="img-fluid" alt=""/>
                          </div>
                          <div class="food-content">
                              <div class="d-flex justify-content-between">
                                  <h5>{props.title}</h5>
                                  <span class="style-change">{props.price}</span>
                              </div>
                              <p class="pt-3">{props.details}</p>
                          </div>
                      </div>
      )
  }

export default Menu;