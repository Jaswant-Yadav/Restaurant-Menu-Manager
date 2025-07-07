import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MenuList = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        getMenu();
    }, [])

    const getMenu = async () => {
        let result = await fetch('http://localhost:4000/menu', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setMenu(result);
    }
    const deleteMenu = async (id) => {
        let result = await fetch(`http://localhost:4000/menu/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if (result) {
            getMenu();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setMenu(result);
            }
        } else {
            getMenu();
        }
    }

    return (
        <div className="Menu-list">
            <h1>Product List</h1>
            <input className="Search-Box" type="text" placeholder="Search Product"
                onChange={searchHandle} />
            <ul>
                <li>Sr. no</li>
                <li>Name</li>
                <li>Category</li>
                <li>Price</li>
                <li>Operation</li>
            </ul>
            {
                menu.length > 0 ? menu.map((item, index) =>
                    <ul key={item}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.category}</li>
                        <li>$ {item.price}</li>


                        <li><button onClick={() => deleteMenu(item._id)}>Delete</button>
                            <Link to={`/editmenu/${item._id}`}>Edit</Link>
                        </li>
                    </ul>
                ) :
                    <h1>No Result Found</h1>
            }
        </div>
    )
}

export default MenuList;