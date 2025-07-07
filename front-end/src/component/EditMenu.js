import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMenu = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchMenu = async () => {
            let data = await fetch(`http://localhost:4000/menu/${params.id}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            data = await data.json();
            setName(data.name);
            setCategory(data.category);
            setPrice(data.price);
        };
        fetchMenu();
    }, [params.id]);

    const UpdateMenu = async () => {
        if (!name || !category || !price) {
            setError(true);
            return;
        }

        await fetch(`http://localhost:4000/menu/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, category, price }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        navigate('/');
    }

    return (
        <div className="UpdateMenu">
            <h1>Update Product</h1>

            <input className="inputBox" type="text" placeholder="Enter Item name"
                onChange={(e) => setName(e.target.value)} value={name} />
            {error && !name && <span className="invalid-input">Enter valid Name</span>}

            <select className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select</option>
                <option value="Veg">Veg.</option>
                <option value="Non-Veg">Non Veg.</option>
            </select>
            {error && !category && <span className="invalid-input">Please select Category</span>}

            <input className="inputBox" type="text" placeholder="Enter Item Price"
                onChange={(e) => setPrice(e.target.value)} value={price} />
            {error && !price && <span className="invalid-input">Enter valid Price</span>}

            <button className="UpdateBtn" onClick={UpdateMenu}>Update Product</button>
        </div>
    );
}

export default EditMenu;
