import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';




const ReserveTableScreen =()=>{

    const [date, onChangeDay] = useState(new Date());
    const [time, onChangeTime] = useState('00:00');
    const [reserveState, setReserve] = useState("idle");
    let name;
    
    const reserve =()=>{
        let fullDate, day,month,year;
        day = date.getDate()
        month= date.getMonth()
        year = date.getFullYear()
        fullDate=[day,month, year].join('-')
        
        const formData = new FormData();
        formData.append('name', name.value)
        formData.append('time', time.toString())
        formData.append('date', fullDate)
        
    

        fetch(
            `${process.env.REACT_APP_BACKEND}/reserve-table`,
            {
                method: 'POST',
                body: formData
            }
        )
            .then(
                () => {
                    setReserve("success")
                        console.log("success")
                    
                }
            )
            .catch((err) => {
                setReserve("fail")
                console.log("in catch fail ", err)
            }
            )
    }
    

    return (
        <>
        <section class="banner-area text-center">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1><i>Reservations</i></h1>
                    <p class="pt-2"><i>Make your events special with our reservations.</i></p>
                </div>
            </div>
        </div>
    </section>
        
         <div class="table-area section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-12">    
                        <div class="section-top2 text-center">
                            <h3>Book <span>your</span> table</h3>
                            <p><i>Beast kind form divide night above let moveth bearing darkness.</i></p>
                        </div>
                        </div>
                        </div>
                        <div class="row">

                       
                <div class="col-lg-8 offset-lg-2">
                 
                                    <div class=" input-group mb-3 justify-content-evenly">
                                        <span class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        <DatePicker selected={date} onChange={(date) => onChangeDay(date) } />
                                        </span>
                                    </div>
                                     {/* time */}
                                    <div class="input-group mb-3 justify-content-evenly">
                                        <span class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-clock-o"></i></span>
                                        <TimePicker clockIcon ={null} value={time} onChange={(time) => onChangeTime(time) } />
                                        </span>
                                    </div>
                                    {/* users */}
                                    <div class=" input-group mb-3 justify-content-evenly">
                                        <span class="input-group-prepend" >
                                            <span class="input-group-text"><i class="fa fa-user-o"></i></span>
                                            <input type="text" placeholder="Guests Number"  ref={(element) => name = element}/>
                                        </span>
                                        
                                    </div>
                                    <div className="table-btn text-center">
                                        <button class="template-btn mt-4" onClick={reserve}>Reserve</button>
                                    </div>
                                    </div>
                                    {
                                        (reserveState === "success") &&
                                        <div>
                                            <div class="alert alert-success mt-2">Table Reservation Successfully</div>
                                        </div>
                                    }
                                    {
                                        (reserveState === "fail") &&
                                        <div>
                                            <div class="alert alert-danger mt-2">Error, please try again</div>
                                        </div>
                                    }     
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReserveTableScreen