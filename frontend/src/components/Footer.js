import React from 'react';


const Footer = (props) => {
    return (
  <footer class="footer-area">
  <div class="footer-widget section-padding">
      <div class="container-fluid m-0 p-0">
          <div className="row d-flex justify-content-center" >
              <div class="col-md-4 d-flex justify-content-center" >
                  <div class="single-widget single-widget1">
                      <a href="/"><img src={props.logo} width="182px" height="53 px" alt=""/></a>
                      <p class="mt-3">Great taste in every bite.</p>
                  </div>
              </div>
              <div class="col-md-4 d-flex justify-content-center" >
                  <div class="single-widget single-widget2 my-5 my-md-0">
                      <h5 class="mb-4">contact us</h5>
                      <div class="d-flex">
                          <div class="into-icon">
                              <i class="fa fa-map-marker"></i>
                          </div>
                          <div class="info-text">
                              <p>1234 Dubai, UAE </p>
                          </div>
                      </div>
                      <div class="d-flex">
                          <div class="into-icon">
                              <i class="fa fa-phone"></i>
                          </div>
                          <div class="info-text">
                              <p>(123) 456 78 90</p>
                          </div>
                      </div>
                      <div class="d-flex">
                          <div class="into-icon">
                              <i class="fa fa-envelope-o"></i>
                          </div>
                          <div class="info-text">
                              <p>support@bakery.com</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-md-4 d-flex justify-content-center" >
                  <div class="single-widget single-widget3">
                      <h5 class="mb-4">opening hours</h5>
                      <p>Monday ...................... Closed</p>
                      <p>Tue-Fri .............. 10 am - 12 pm</p>
                      <p>Sat-Sun ............... 8 am - 11 pm</p>
                      <p>Holidays ............. 10 am - 12 pm</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <p style={{'background-color':'black', 'padding':'20px', 'text-align':'center'}} >Copyrights 	&#169; 2021 Hala, Zahra, Yosra, Shaimaa </p>
  </footer>
  )
  }

export default Footer;