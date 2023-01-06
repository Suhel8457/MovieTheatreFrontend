import axios from "axios";
import { useState, useEffect } from "react";
import "./admin-body.css";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Header from "../shared/Header";
import foodandbeweragesUrl from "../environment/foodandbeweragesUrl";
import bookingUrl from "../environment/bookingUrl";
import HeaderUser from "../shared/HeaderUser";


let imageUrl = "https://assets-in.bmscdn.com/promotions/cms/creatives/1652696821976_728x100.png";
let categories = ["All", "Popcorn", "Snacks", "Drinks", "Combos"]






let convenienceFeesPercentage = 0.16;
let IGSTPercentage = 0.18;
let theaterName = "Anjan multiplex 4k"





let currentCategory = "All";
let previousCategory;



const AdminBody = () => {




    let [foodItemsList, setFoodItemsList] = useState([]);
    let currentDeletingItemId;
    const [renderer, setRenderer] = useState(false);
    const [loadStatus, setLoadStatus] = useState(false);

    const [ticketBookingSummary, setTicketBookingSummary] = useState({
        seatType: "N/A",
        totalTickets: "N/A",
        seats: "N/A",
        theatre: "N/A",
        screen: "N/A",
        basicFare: "N/A",
    });

    const tempObj = {
        seatType: "balcony",
        totalTickets: 3,
        seats: ["C1", "C2", "C3"],
        theatre: "Anjan multiplex 4k",
        screen: "2",
        basicFare: 150,
    }


    useEffect(() => {
        axios.get(`${bookingUrl}/seat`).then(
            (Response) => (handleTicketBookingSummeryFetchEvent(Response.data)))
    }, [])

    const handleTicketBookingSummeryFetchEvent = (data) => {
        if (data) {
            const temp = { ...ticketBookingSummary }
            const temp2 = data[0]
            temp.basicFare = temp2.price
            temp.seatType = temp2.seatType
            temp.seats = [temp2.name]
            temp.totalTickets = temp.seats.length
            temp.theatre = theaterName
            setTicketBookingSummary(temp)
        }
    }

    useEffect(() => {
        axios.get(`${foodandbeweragesUrl}/all`).then(
            (Response) =>
                setFoodItemsList(Response.data), setRenderer(!renderer))
    }, [])

    useEffect(() => {
        handleCategorySelectedEvent(currentCategory)
        setRenderer(!renderer)
    }, [foodItemsList])
    useEffect(() => {
        axios.get(`${foodandbeweragesUrl}/all`).then((response) => setFoodItemsList(response.data))
    }, [loadStatus])

    let [foodItemsList1, setFoodItemsList1] = useState([]);
    let [currentEditItemId, setCurrentEditItemId] = useState(0);
    let totalTicketPrice = parseFloat(ticketBookingSummary.basicFare) * parseFloat(ticketBookingSummary.totalTickets)
    let baseAmount = (totalTicketPrice * convenienceFeesPercentage)
    let IGSTFee = (baseAmount * IGSTPercentage)
    let totalConvenienceFee = baseAmount + IGSTFee
    let [totalAddonsCost, setTotalAddonsCost] = useState(0);
    // let [totalDiscount, setTotalDiscount] = useState(0);
    let tempFoodItemObj = { id: "", code: "", name: "", description: "", category: "", actualPrice: "", offerPrice: "", quantityAvailable: "", itemImageUrl: "" }
    let [tempFoodItemDisplayObj, setTempFoodItemDisplayObj] = useState({ id: "", code: "", name: "", description: "", category: "", actualPrice: "", offerPrice: "", quantityAvailable: "", itemImageUrl: "" })
    const [currentFoodIemsList, setCurrentFoodItemsList] = useState(foodItemsList);
    const [addedFoodItems, setAddedFoodItems] = useState({});
    const [popupFlag, setPopupFlag] = useState(false);
    const [itemCodeWarning, setItemCodeWarning] = useState("");
    const [actualPriceError, setActualPriceError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [offerPriceError, setOfferPriceError] = useState("");





    if (popupFlag) {
        if (document.getElementById("form-popup"))
            document.getElementById("form-popup").style.display = "flex";
    }
    else {
        if (document.getElementById("form-popup"))
            document.getElementById("form-popup").style.display = "none";
    }
    const toggleFormPopup = () => {
        setPopupFlag(!popupFlag);
    };



    useEffect(() => {
        const obj = document.getElementById(currentCategory)
        obj.style.backgroundColor = "#181E40";
        obj.style.color = "#ffff";
        const prevObj = document.getElementById(previousCategory)
        if (prevObj) {
            prevObj.style.backgroundColor = "rgb(234, 234, 234)";
            prevObj.style.color = "#181E40";
        }
    }, [currentCategory]);

    useEffect(() => {
        let tempTotal = 0;
        for (const key in addedFoodItems) {
            tempTotal += currentFoodIemsList.find(item => item.id == key).offerPrice * addedFoodItems[key]
        }
        setTotalAddonsCost(tempTotal)
    }, [addedFoodItems])







    const handleView = (id) => {
        const obj = document.getElementById(id)
        if (obj.style.display == "flex")
            obj.style.display = "none"
        else
            obj.style.display = "flex"

    }


    const handleFoodItemAddEvent = (id) => {
        const temp = { ...addedFoodItems }
        if (id in temp) {
            temp[id]++
            setAddedFoodItems(temp)
        }
        else {
            temp[id] = 1
            setAddedFoodItems(temp)
        }
    }
    const handleFoodItemDecrementEvent = (id) => {
        const temp = { ...addedFoodItems }
        if (id in temp) {
            if (temp[id] > 0)
                temp[id]--
            setAddedFoodItems(temp)
        }
    }
    const handleFoodItemRemoveEvent = (id) => {
        const temp = { ...addedFoodItems }
        if (id in temp) {
            delete temp[id]
            setAddedFoodItems(temp)
        }
    }

    const handleItemCodeValidation = (code) => {
        const temp = foodItemsList.filter(item => item.code == code);
        if (temp.length)
            setItemCodeWarning("*Item code already exists!");
        else
            setItemCodeWarning("");
    }

    const handleSaveNewFoodItemEvent = (e) => {
        toggleFormPopup();


        console.log(tempFoodItemObj.category)
        foodItemsList.push(tempFoodItemObj)
        axios.post(`${foodandbeweragesUrl}/`, tempFoodItemObj).then((Response) => console.log(Response.data))

        handleCategorySelectedEvent(currentCategory)
    }

    const validation = (e) => {
        tempFoodItemObj.code = document.getElementById("input-code").value.toUpperCase();
        tempFoodItemObj.actualPrice = document.getElementById("input-actualprice").value;

        tempFoodItemObj.offerPrice = document.getElementById("input-offerprice").value;
        tempFoodItemObj.description = document.getElementById("input-description").value;
        tempFoodItemObj.quantityAvailable = document.getElementById("input-quantity").value;

        tempFoodItemObj.itemImageUrl = document.getElementById("input-imageurl").value;
        tempFoodItemObj.category = document.getElementById("input-category").value;
        tempFoodItemObj.name = document.getElementById("input-name").value;
        if (tempFoodItemObj.actualPrice <= 0) {
            e.preventDefault();
            console.log(tempFoodItemObj)
            setActualPriceError("Price Can't be Negative or Zero");

        }
        else if (tempFoodItemObj.offerPrice <= 0) {
            e.preventDefault();
            console.log(tempFoodItemObj)
            setActualPriceError("Price Can't be Negative or Zero");

        }
        else if (tempFoodItemObj.offerPrice > tempFoodItemObj.actualPrice) {
            e.preventDefault();
            setOfferPriceError("Offer Price is more than Actual Price");

        }
        else if (tempFoodItemObj.quantityAvailable <= 0) {
            e.preventDefault();
            console.log(tempFoodItemObj)
            setQuantityError("At Least one quantity must be available")
        }

        else {

            handleSaveNewFoodItemEvent(e)
        }
    }
    const handleFoodItemEditEvent = (itemId) => {
        setCurrentEditItemId(itemId)
        console.log("New food item edit event is called.for " + itemId);
        setTempFoodItemDisplayObj({ ...foodItemsList.filter(item => item.id == itemId)[0] })
        console.log(tempFoodItemObj);
        handleView("edit-popup-bg")
    }

    const editAttribute = (attribute, value) => {
        console.log(value);
        if (value) {
            // setTempFos({ ...cdata, [e.target.name]: e.target.value })
            tempFoodItemObj[attribute] = value;
        }
    }

    const editItem = async () => {
        const temp = { ...foodItemsList.filter(item => item.id == currentEditItemId)[0] }
        for (const key in temp) {
            if (tempFoodItemObj[key] == "" || tempFoodItemObj[key] == null)
                tempFoodItemObj[key] = temp[key]
        }

        console.log(tempFoodItemObj)
        if (tempFoodItemObj.actualPrice <= 0) {
            setActualPriceError("Price can't be negative or Zero")
        }
        else if (tempFoodItemObj.offerPrice <= 0) {
            setOfferPriceError("Offer Price can't be negative or Zero");

        }
        else if (parseInt(tempFoodItemObj.actualPrice) < parseInt(tempFoodItemObj.offerPrice)) {
            setOfferPriceError("Offer Price must be lessthan actual price");

        }
        else if (tempFoodItemObj.quantityAvailable <= 0) {
            setQuantityError("Atleast one quantity must be available")
        }
        else {
            foodItemsList = foodItemsList.filter(item => item.id != currentEditItemId)
            foodItemsList = [...foodItemsList, tempFoodItemObj]
            console.log(foodItemsList)
            await axios.put(`${foodandbeweragesUrl}/update/item`, tempFoodItemObj).then(() => setLoadStatus(!loadStatus))
            handleCategorySelectedEvent(currentCategory)
            handleView("edit-popup-bg")
        }
    }

    const handleFoodItemDeleteEvent = (itemId) => {
        console.log("New food item delete event is called. for " + itemId);
        currentDeletingItemId = itemId;
        handleView('delete-popup')
    }

    const deleteItem = async () => {
        await axios.delete(`${foodandbeweragesUrl}/delete/${currentDeletingItemId}`).then(() => setLoadStatus(!loadStatus));
        console.log("Item deleted...");
        handleCategorySelectedEvent(currentCategory)
        handleView('delete-popup')
        // handleFoodItemRemoveEvent(currentDeletingItemId)
        // foodItemsList1 = foodItemsList.filter(item => item.id != currentDeletingItemId)
        // console.log(foodItemsList1)
        // setFoodItemsList([]);
        // setFoodItemsList(foodItemsList1);
        // console.log(foodItemsList)
        // handleCategorySelectedEvent(currentCategory)
        // handleView('delete-popup')
    }



    const handleCategorySelectedEvent = (category) => {
        if (currentCategory != category) {
            previousCategory = currentCategory;
            currentCategory = category;
        }
        if (category === "All")
            setCurrentFoodItemsList(foodItemsList)
        else {
            setCurrentFoodItemsList(foodItemsList.filter(item => item.category == category))
        }

    }
    const setErrors = () => {

        setActualPriceError("")
        setOfferPriceError("")
    }

    const handleSortEvent = (property) => {
        console.log(property);
        switch (property) {
            case ("name:a-z"): {
                let temp = foodItemsList
                temp.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();
                    if (fa < fb) return -1;
                    if (fa > fb) return 1;
                    return 0;
                });
                setCurrentFoodItemsList(temp)
                handleCategorySelectedEvent(currentCategory)
                setRenderer(!renderer)
                break;
            }
            case ("name:z-a"): {
                let temp = foodItemsList
                temp.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();
                    if (fa > fb) return -1;
                    if (fa < fb) return 1;
                    return 0;
                });
                setCurrentFoodItemsList(temp)
                handleCategorySelectedEvent(currentCategory)
                setRenderer(!renderer)
                break;
            }
            case ("price:low to high"): {
                let temp = foodItemsList
                temp.sort((a, b) => a.offerPrice - b.offerPrice);
                setCurrentFoodItemsList(temp)
                handleCategorySelectedEvent(currentCategory);
                setRenderer(!renderer)
                break;
            }
            case ("price:high to low"): {
                let temp = foodItemsList
                temp.sort((a, b) => b.offerPrice - a.offerPrice);
                setCurrentFoodItemsList(temp)
                handleCategorySelectedEvent(currentCategory)
                setRenderer(!renderer)
                break;
            }
        }
    }




    return (
        <div>

            {/* ------------------------------Popup form for adding new food item ---------------*/}
            <div className="fandb-form-popup" id="form-popup" >
                <div className="fandb-form-area">
                    <button className="fandb-form-exit-btn" onClick={toggleFormPopup}>X</button>
                    <br />
                    <br />
                    <form className="fandb-form" onSubmit={(e) => validation(e)}>

                        <div className="fandb-form-section">
                            <label className="label-fandb" htmlFor="input-name"><b>Name</b></label>
                            <input required={true} type="text" onInput={e => tempFoodItemObj.name = e.target.value} id="input-name" placeholder="popcorn"></input>
                        </div>
                        <div className="fandb-form-section">
                            <label className="label-fandb" htmlFor="input-description"><b>Description</b></label>
                            <input required={true} type="text" onInput={e => tempFoodItemObj.description = e.target.value} id="input-description" placeholder="cheesy popcorn 250g"></input>
                        </div>
                        <div className="fandb-form-section">
                            <label className="label-fandb" htmlFor="input-category"><b>Category</b></label>
                            <select required={true} type="text" onInput={e => tempFoodItemObj.category = e.target.value} id="input-category" placeholder="popcorn">
                                <option value="Popcorn">Popcorn</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Combos">Combos</option>
                            </select>
                        </div>

                        <div className="fandb-form-section">
                            <label className="label-fandb" htmlFor="input-code"><b>Item Code</b></label>
                            <input required={true} onInput={e => handleItemCodeValidation(e.target.value.toUpperCase())} type="text" id="input-code" placeholder="PC04"></input>
                            <label className="label-fandb" htmlFor="input-code" id="input-code-warning" style={{ color: "red", fontWeight: "light", fontSize: "0.75rem" }}>{itemCodeWarning}</label>
                        </div>
                        <div className="fandb-price-div">
                            <div className="fandb-form-section">
                                <label className="label-fandb" htmlFor="input-actualprice" min={0}><b>Actual Price</b></label>
                                <input required={true} type="number" onInput={e => tempFoodItemObj.actualPrice = e.target.value} onMouseDown={setErrors} id="input-actualprice" placeholder="2800"></input>

                            </div>
                            <div className="fandb-form-section">
                                <label className="label-fandb" htmlFor="input-offerprice" min={0}><b>Offer Price</b></label>
                                <input required={true} type="number" onInput={e => tempFoodItemObj.offerPrice = e.target.value} id="input-offerprice" placeholder="1700" onMouseDown={setErrors} ></input>
                            </div>

                        </div>

                        <div className="fandb-form-section">
                            <span className="fandb-input-errors">{actualPriceError}</span>
                            <span className="fandb-input-errors">{offerPriceError}</span>
                            <label className="label-fandb" htmlFor="input-quantity" min={0}><b>Quantity</b></label>
                            <input required={true} type="number" onInput={e => tempFoodItemObj.quantityAvailable = e.target.value} onMouseDown={() => setQuantityError("")} id="input-quantity" placeholder="200"></input>
                            <span className="fandb-input-errors">{quantityError}</span>

                        </div>
                        <div className="fandb-form-section">
                            <label className="label-fandb" htmlFor="input-imageurl" ><b>Image url</b></label>

                            <input required={true} type="text" onInput={e => tempFoodItemObj.itemImageUrl = e.target.value} id="input-imageurl" placeholder="Https://source.unsplash.com/random"></input>

                        </div>

                        <div className="fandb-submit-btn">
                            <button type="submit" className="fandb-btn btn-sm btn-primary mt-3"  >Save</button>
                        </div>

                    </form>
                </div>
            </div>
            {/* ------------------------------Popup form for adding new food item ends here---------------*/}


            {/* -----------------------------Popup for delete option -------------------------------------*/}
            <div id="delete-popup" className="fandb-delete-popup" >
                <div className="fandb-delete-warning">
                    <p>This item will be deleted permanently!</p>
                    <div className="fandb-delete-choice">
                        <button className="fandb-delete-btn" onClick={deleteItem} >
                            delete
                        </button>
                        <button className="fandb-cancel-btn" onClick={() => handleView('delete-popup')}>
                            cancel
                        </button>
                    </div>
                </div>
            </div>
            {/* -----------------------------End of Popup for delete option  -------------------------------------*/}

            {/* -----------------------------Popup for Edit option -------------------------------------*/}
            <div className="fandb-edit-popup-bg" id="edit-popup-bg">
                <div className="fandb-edit-popup-area">


                    <label className="label-fandb" htmlFor="name">Name</label><br />
                    <input placeholder={tempFoodItemDisplayObj.name} defaultValue={tempFoodItemDisplayObj.name} className="fandb-name" onInput={e => editAttribute("name", e.target.value)} >
                    </input><br />
                    <label className="label-fandb" htmlFor="description">Description</label><br />
                    <input placeholder={tempFoodItemDisplayObj.description} defaultValue={tempFoodItemDisplayObj.description} className="fandb-description" onInput={e => editAttribute("description", e.target.value)}></input><br />
                    <label className="label-fandb" htmlFor="category">Category</label><br />
                    <span className="fandb-category" onChange={e => editAttribute("category", e.target.value)}>
                        <select name="category" id="category-select" className="fandb-category">
                            {categories.slice(1).map((item) =>
                                item == tempFoodItemDisplayObj.category ?
                                    (<option key={item} selected value={item}>{item}</option>) :
                                    (<option key={item} value={item}>{item}</option>)
                            )
                            }
                        </select>
                    </span><br />
                    <label className="label-fandb" htmlFor="actual-price">Actual-price</label><br />
                    <input placeholder={tempFoodItemDisplayObj.actualPrice} defaultValue={tempFoodItemDisplayObj.actualPrice} className="fandb-actual-price" onChange={e => editAttribute("actualPrice", e.target.value)} onMouseDown={() => setActualPriceError("")} ></input><br />
                    <span className="fandb-input-errors">{actualPriceError}</span>
                    <label className="label-fandb" htmlFor="offer-price">Offer-price</label><br />
                    <input placeholder={tempFoodItemDisplayObj.offerPrice} defaultValue={tempFoodItemDisplayObj.offerPrice} className="fandb-offer-price" onInput={e => editAttribute("offerPrice", e.target.value)} onMouseDown={() => setOfferPriceError("")}></input><br />
                    <span className="fandb-input-errors">{offerPriceError}</span>
                    <label className="label-fandb" htmlFor="quantity-available">Quantity-available</label><br />
                    <input placeholder={tempFoodItemDisplayObj.quantityAvailable} defaultValue={tempFoodItemDisplayObj.quantityAvailable} onMouseDown={() => setQuantityError("")} className="fandb-quantity-available" onInput={e => editAttribute("quantityAvailable", e.target.value)} ></input><br />
                    <span className="fandb-input-errors">{quantityError}</span>
                    <label className="label-fandb" htmlFor="Image-url">Image-url</label>
                    <input placeholder={tempFoodItemDisplayObj.itemImageUrl} defaultValue={tempFoodItemDisplayObj.itemImageUrl} className="fandb-Image-url" onInput={e => editAttribute("imageUrl", e.target.value)}></input>
                    <div className="fandb-buttons">
                        <button className="fandb-save-edit btn btn-sm btn-primary mt-3" title="Save edited details" onClick={() => editItem()}>Save</button>
                        <button className="fandb-cancel-edit btn btn-sm btn-primary mt-3" title="Cancel editing" onClick={() => handleView("edit-popup-bg")}>Cancel</button>
                    </div>
                </div>
            </div>
            {/* -----------------------------End of Popup for Edit option -------------------------------------*/}

            <div className="main-Container-head">
                <HeaderUser pass={"admin"} />
            </div>
            
            <div style={{ height: "4.5rem" }}></div>

            <div className="fandb-bodymain" style={{}}>
                {/* <progress className="fandb-progress-bar" value="30" max="100"></progress> */}




                {/* ------------------------------Body left start here-------------------- */}
                <div className="fandb-body-left">
                    {/* ----------------------------Ad-Image display-------------------------- */}
                    <div className="fandb-adcard-display">
                        <a href="#" title="click to get offer">
                            <img className="fandb-ad-image"
                                src={imageUrl}
                                alt="ad-image"
                                style={{ borderRadius: "0px" }}
                            />
                        </a>
                    </div>
                    {/* ----------------------------End od Ad-Image display-------------------------- */}
                    {/* ----------------------------Category list start-------------------------- */}
                    <div className="fandb-food-category">

                        <ul>

                            {categories.map(category =>
                            (<li key={category}>
                                <button
                                    onClick={e => handleCategorySelectedEvent(e.target.id)}
                                    key={category}
                                    id={category}
                                    title={`View ${category}`}
                                >
                                    {category}
                                </button>
                            </li>))}
                            <label className="label-fandb" htmlFor="select-sorting" style={{ fontWeight: 600, marginLeft: "90px" }}>Sort By: </label>

                            <li className="fandb-sorting">
                                <select name="sorting" id="select-sorting" onChange={e => handleSortEvent(e.target.value)}>
                                    <option value="default" hidden={true} defaultValue={true}>Default</option>
                                    <option value="name:a-z">Name: A-Z</option>
                                    <option value="name:z-a">Name: Z-A</option>
                                    <option value="price:low to high">PRICE: LOW TO HIGH</option>
                                    <option value="price:high to low">PRICE: HIGH TO LOW</option>
                                </select>

                            </li>
                            <li className="fandb-add-new-food-item">
                                <button
                                    onClick={() => toggleFormPopup()}
                                    title={`Add new food item`}
                                >
                                    {"Add new Item"}
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* ----------------------------End of Category list start-------------------------- */}
                    {/* ----------------------------Food items dynamic display starts here-------------------------- */}
                    <div className="fandb-food-item-display">
                        < div className="fandb-food-items" >
                            {
                                currentFoodIemsList.length <= 0
                                    ? (<div style={{ textAlign: "center", color: "red" }}><h6>Currently Unavailable! Please try again later.</h6></div>)
                                    : currentFoodIemsList.map(
                                        item => (
                                            <div className="fandb-container" key={item.id} >
                                                <div className="fandb-itemImage">
                                                    <img src={item.itemImageUrl} alt="Image of food item" />
                                                    <hr />
                                                </div>
                                                <div className="fandb-details">
                                                    <div className="fandb-title-description">
                                                        <p className="fandb-food-item-title">{item.name}</p>
                                                        <p className="fandb-food-item-description">{item.description}</p>
                                                    </div>
                                                    <div className="fandb-food-item-button-container ">
                                                        <div className="fandb-actualprice price"><del style={{ color: "red" }}>{item.actualPrice}/-</del></div>
                                                        <div className="fandb-offerprice price"><b>{item.offerPrice}/-</b></div>
                                                        <div className="fandb-button-container">
                                                            <button title="Add item to list" className="btn btn-outline-danger btn-sm  item-btn add" value={item.id} onClick={(e) => handleFoodItemAddEvent(e.target.value)}>Add</button>
                                                            <button title="Edit details" className="btn btn-outline-danger btn-sm  item-btn edit" value={item.id} onClick={(e) => handleFoodItemEditEvent(e.target.value)}>Edit</button>
                                                            <button title="Delete permanently" className="btn btn-outline-danger btn-sm  item-btn delete" value={item.id} onClick={(e) => handleFoodItemDeleteEvent(e.target.value)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="fandb-discountline"><small>save upto {parseInt(((parseFloat(item.actualPrice) - parseFloat(item.offerPrice)) / parseFloat(item.actualPrice)) * 100)}%</small></div>
                                            </div>
                                        )
                                    )
                            }
                        </div >
                    </div>
                    {/* ----------------------------End of Food items dynamic display-------------------------- */}
                </div>

                {/* ------------------------------Body rightside part start-------------------- */}
                <div className="fandb-body-right">
                    <div className="fandb-body-right-title">
                        <p>ORDER SUMMAARY</p>
                    </div>
                    <div className="fandb-ticket-details">
                        <div className="fandb-ticket-price">
                            <p>{ticketBookingSummary.seatType.toUpperCase()}{" - "}{ticketBookingSummary.seats.toString()}
                                <small>{` (${ticketBookingSummary.totalTickets} Tickets)`}</small>
                            </p>
                            <p className="fandb-amount-display">Rs.{totalTicketPrice.toFixed(2)}</p>
                            <p className="fandb-theatrename-display">{ticketBookingSummary.theatre}</p>
                        </div>
                        <div className="fandb-convenience-fee">
                            <p className="fandb-convenience-fee-text">
                                {" Convenience fees"}
                            </p>
                            <p className="fandb-amount-display">Rs.{totalConvenienceFee.toFixed(2)}</p>
                            <p className="fandb-sub-convenience-fee conv-fee-text " style={{ marginTop: "-1rem", marginLeft: "2rem" }}>{"Base Amount"}</p>
                            <p className="fandb-sub-convenience-fee amount-display" style={{ marginTop: "-1rem" }}>{`Rs. ${baseAmount.toFixed(2)} `}</p>
                            <p className="fandb-sub-convenience-fee conv-fee-text " style={{ marginTop: "-1rem", marginLeft: "2rem" }}>{`Integrated GST (IGST) @ ${IGSTPercentage * 100}% `}</p>
                            <p className="fandb-sub-convenience-fee amount-display" style={{ marginTop: "-1rem" }}>{`Rs. ${IGSTFee.toFixed(2)} `}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="fandb-subtotal">
                        <span className="fandb-subtotal-title">{"Subtotal"}</span>
                        <span className="fandb-subtotal-amount">Rs.{(totalTicketPrice + totalConvenienceFee).toFixed(2)}</span>
                    </div>
                    <div className="fandb-addons-title">
                        <span>
                            Food and Beverages
                        </span>
                        <span className="fandb-addons-title-price">
                            Rs.{totalAddonsCost}
                        </span>
                    </div>

                    <div className="fandb-addons">
                        <ul className="fandb-addons-ul">
                            {Object.keys(addedFoodItems).map(id => (
                                <li key={id}>
                                    <button className="fandb-button rm-btn" title="remove item from cart" value={id} onClick={(e) => handleFoodItemRemoveEvent(e.target.value)}>
                                        X
                                    </button>
                                    <span>{foodItemsList.filter(item => item.id == id)[0].name}</span>
                                    <button className="fandb-button inc-btn" value={id} title="Increase quantity" onClick={(e) => handleFoodItemAddEvent(e.target.value)} >{"+"}</button>
                                    <button className="fandb-button dec-btn" value={id} title="Decrease quantity" onClick={(e) => handleFoodItemDecrementEvent(e.target.value)}>{"-"}</button>
                                    <span className="fandb-quantity">{addedFoodItems[id]}{"   "}</span>
                                    <span className="fandb-item-total-price">Rs.{foodItemsList.filter(item => item.id == id)[0].offerPrice * addedFoodItems[id]}</span>
                                </li>
                            )
                            )}

                        </ul>
                    </div>
                    <div className="fandb-body-right-footer">
                        <div className="fandb-pay-btn-div">
                            <button>Amount Payable: Rs.{(totalAddonsCost + totalConvenienceFee + totalTicketPrice).toFixed(2)}</button>
                        </div>
                    </div>
                </div>
                {/* ------------------------------End of Body rightside part start-------------------- */}
            </div >
        </div>);
}

export default AdminBody;