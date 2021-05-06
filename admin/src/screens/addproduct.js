import React, { useState } from 'react';


const AddProductScreen = () => {
    const [accountState, set_accountState] = useState('idle')
    const [errorsState, setErrorsState] = useState([]);

    let productName;
    let productDetails;
    let productPrice;
    let productImage;
    
    const formData = new FormData();

    const attachFile = (evt) => {
        const productImage = Array.from(evt.target.files);
        productImage.forEach(
            (file, index) => {
                formData.append(index, file);
            }
        )
    }

    const submitProduct = () => {
        const errors = [];
        // 1. Validate the fields
        if (productName.value.length === 0) {
            errors.push("Please enter your Product Name")
        }
        if (productPrice.value.length === 0) {
            errors.push("Please enter your Product Price")
        }
       if (productDetails.value.length === 0) {
            errors.push("Please enter your Product details")
        }

       

        // 1.1 If fields are invalid, setState("validation failed")
        if (errors.length > 0) {
            set_accountState("validation failed");
            setErrorsState(errors);
        }
        // 1.2 If the fields are valid, setState("sending")
        else {
            // 2 Show "sending..." and invoke the fetch()
            set_accountState("sending");
            formData.append('productname', productName.value);
            formData.append('details', productDetails.value);
            formData.append('price', productPrice.value);
            if (productImage) {
                formData.append('imageurl', productImage);
             
            }
            console.log()
            fetch(
                `${process.env.REACT_APP_BACKEND}/product/add`,
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then(
                    () => {
                        set_accountState('successful')
                        setErrorsState([])
                    }
                )
                .catch((err) => {
                    set_accountState('unsuccessful')
                    console.log(err)
                }
                )


        }

    }
    return (
        <form className= "container" >
            <h2 style= {{ 'margin-top': '150px', 'color': 'black', 'text-align': 'center' }} > Create New Product </h2>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="card shadow-lg col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 m-5 p-5">
                      
                        <div class="form-floating mb-3">
                            <label for="productName">Product Name <span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => productName = element} type="text" class="form-control" id="productName" required />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="productDetails">Product details<span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => productDetails = element} type="text" class="form-control" id="productDetails" required />
                        </div>
                        <div class="form-floating mb-3">
                            <label for="productPrice">Product price<span style={{ 'color': 'red' }}>*</span></label>
                            <input ref={(element) => productPrice = element} type="text" class="form-control" id="productPrice" required />
                        </div>
                      
                        
                        
                        
                        <div class="custom-file">
                            <input onChange={attachFile} type="file" class="custom-file-input" id="avatar" />
                            <label class="custom-file-label" for="avatar">Upload Product Image</label>
                        </div>
                        <br /><br />


                        {
                            accountState === "idle" && <button onClick={submitProduct} className="btn btn-primary"><span style={{ 'font-weight': 'bold' }}>Create New Product</span></button>
                        }
                        {
                            accountState === "sending" && <p>Please Wait untill the product is created successfully....... </p>
                        }
                        {
                            (accountState === "successful") &&
                            <div>
                                <button onClick={submitProduct} className="btn btn-primary col-12"><span style={{ 'font-weight': 'bold' }}>Create New Product</span></button>
                                <div class="alert alert-success mt-2">Product Created Successfully</div>
                            </div>
                        }
                        {
                            (accountState === "unsuccessful") &&
                            <div>
                                <button onClick={submitProduct} className="btn btn-primary col-12"><span style={{ 'font-weight': 'bold' }}>Create New Product</span></button>
                                <div class="alert alert-danger mt-2">Error, please try again</div>
                            </div>
                        }
                        {
                            accountState === "validation failed" &&
                            <div>
                                <button onClick={submitProduct} className="btn btn-primary col-12"><span style={{ 'font-weight': 'bold' }}>Create New Product</span></button>
                                <div className="alert alert-danger mt-2">
                                    <ul>
                                        {
                                            errorsState.map(
                                                (error, index) => <li key="index">- {error}</li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </form>
    )
}
export default AddProductScreen