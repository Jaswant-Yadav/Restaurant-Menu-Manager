import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {

    const [name, setName] = useState();
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState();
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const addItem = async () => {
        console.log(name, price, category);
        if (!name || !price || !category ) {
            setError(true);
            return false;
        }

   const userId = JSON.parse(localStorage.getItem('user'))._id;        
        let result = await fetch('http://localhost:4000/addmenu', {
            method: 'post',
            body: JSON.stringify({ name, category,price, userId }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/')
    }

    return (
        <div className="Items">
            <h1>Add Item</h1>

            <input className="inputBox" type="text" placeholder="Enter Item name"
                onChange={(e) => { setName(e.target.value) }} value={name} />
            {error && !name && <span className="invalid-input">Enter valid Name</span>}


            <select className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                <option value="select">Select</option>
                <option value="Income">Veg.</option>
                <option value="Expense" >Non Veg.</option>
            </select>
            {error && !category && <span className="invalid-input">Please select Category</span>}

            <input className="inputBox" type="text" placeholder="Enter Item Price"
                onChange={(e) => { setPrice(e.target.value) }} value={price} />
            {error && !price && <span className="invalid-input">Enter valid Price</span>}



            <button className="AddBtn" onClick={addItem} >Add Item to Menu</button>
        </div>
    )
}

export default AddMenu;