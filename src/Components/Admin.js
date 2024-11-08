import React, { useEffect, useState } from 'react';
import { Bars } from "react-loader-spinner";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../Redux/authSlice';
import { useNavigate } from 'react-router';
import { fetchItems, addItem, updateItem, deleteItem } from '../Redux/itemSlice';
import './Admin.css'

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const items = useSelector(state => state.items.filteredItems);
  const status = useSelector(state => state.items.status);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newItem, setNewItem] = useState({ Name: '', Type: '', Availability: true, StockLeft: 0, Description: '', Price: 0 });
  const [editItem, setEditItem] = useState(null);


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);
  console.log(items)

  useEffect(() => {
    if (user) {
      if (user.email === 'techstoreadmin@gmail.com') {
        setIsAdmin(true);
      } else {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }


  const handleAddItem = () => {
    dispatch(addItem(newItem));
    setNewItem({ Name: '', Type: '', Availability: true, StockLeft: 0, Price: 0, Description: '' });
  };

  const handleUpdateItem = () => {
    if (editItem) {
      dispatch(updateItem(editItem));
      setEditItem(null);
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleHideItem = (item) => {
    const updatedItem = { ...item, hidden: !item.hidden };
    dispatch(updateItem(updatedItem));
  };

  const renderItems = () => {
    if (status === 'loading') {
      return <div className="loader-container">
        <Bars height="80" width="80" color="#4fa94d" ariaLabel="loading-indicator" />
      </div>;
    }

    return items.map(item => (
      <div key={item.id} style={{ display: item.hidden ? 'none' : 'block' }}>
        <h3>{item.Name}</h3>
        <img src={item.Image} alt="are" />
        <p>Type: {item.Type}</p>
        <p>Availability: {item.Availability ? 'Available' : 'Unavailable'}</p>
        <p>Stock Left: {item.StockLeft}</p>
        <button onClick={() => handleHideItem(item)}>Hide</button>
        <button onClick={() => setEditItem(item)}>Edit</button>
        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
      </div>
    ));
  };

  return (
    <div>
      {isAdmin ? (
        <h1>Welcome, Admin!</h1>
      ) : (
        <h1>Access Denied,Not happening,Get out of Here!!!</h1>
      )}
      <h1>Admin Panel</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newItem.Name}
          onChange={(e) => setNewItem({ ...newItem, Name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Availability"
          value={newItem.Availability}
          onChange={(e) => setNewItem({ ...newItem, Availability: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.Price}
          onChange={(e) => setNewItem({ ...newItem, Price: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newItem.Type}
          onChange={(e) => setNewItem({ ...newItem, Type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock Left"
          value={newItem.StockLeft}
          onChange={(e) => setNewItem({ ...newItem, StockLeft: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.Description}
          onChange={(e) => setNewItem({ ...newItem, Description: e.target.value })}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>

      {editItem && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, Name: e.target.value })}
          />
          <input
            type="text"
            value={editItem.type}
            onChange={(e) => setEditItem({ ...editItem, Type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editItem.Description}
            onChange={(e) => setNewItem({ ...editItem, Description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editItem.Price}
            onChange={(e) => setNewItem({ ...editItem, Price: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Availability"
            value={editItem.Availability}
            onChange={(e) => setNewItem({ ...editItem, Availability: e.target.value })}
          />
          <input
            type="number"
            value={editItem.stockLeft}
            onChange={(e) => setEditItem({ ...editItem, StockLeft: parseInt(e.target.value) })}
          />
          <button onClick={handleUpdateItem}>Update</button>
        </div>
      )}

      <h2>Items</h2>
      {renderItems()}
    </div>
  );
};

export default Admin;