import React from 'react';

const About = () => {
    return (
            <section class="welcome-area section-padding2">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 align-self-center">
                    <div class="welcome-img">
                        <img src="assets/images/welcome-bg.png" class="img-fluid" alt=""/>
                    </div>
                </div>
                <div class="col-md-6 align-self-center">
                    <div class="welcome-text mt-5 mt-md-0">
                        <h3><span class="style-change">Welcome</span> <br/>to Bakery</h3>
                        <p class="pt-3">The smell of good bread baking, like the sound of lightly flowing water, is indescribable in its evocation of innocence and delight.</p>
                        <p>It's all about a balancing act between time, temperature and ingredients: That's the art of baking.</p>
                       
                            <a href="#" class="template-btn mt-3">book a table</a>
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
  }

  export default About;