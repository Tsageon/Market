import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../Redux/authSlice';
import { useNavigate } from 'react-router';
import { fetchItems, addItem, updateItem, deleteItem} from '../Redux/itemSlice';
import './Admin.css'

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.items.filteredItems);
  const status = useSelector(state => state.items.status);
  const [isAdmin] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', type: '', availability: true, stockLeft: 0 });
  const [editItem, setEditItem] = useState(null);


  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

    const user = useSelector(selectUser);
    if (!user || user.role !== 'admin') {
      return navigate('/'); 
    }


  const handleAddItem = () => {
    dispatch(addItem(newItem));
    setNewItem({ name: '', type: '', availability: true, stockLeft: 0 });
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
      return <p>Loading...</p>;
    }

    return items.map(item => (
      <div key={item.id} style={{ display: item.hidden ? 'none' : 'block' }}>
        <h3>{item.name}</h3>
        <p>Type: {item.type}</p>
        <p>Availability: {item.availability ? 'Available' : 'Unavailable'}</p>
        <p>Stock Left: {item.stockLeft}</p>
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
        <h1>Access Denied,Not happening,get out of here</h1>
      )}
      <h1>Admin Panel</h1>
      <div>
        <h2>Add Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={newItem.type}
          onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock Left"
          value={newItem.stockLeft}
          onChange={(e) => setNewItem({ ...newItem, stockLeft: parseInt(e.target.value) })}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>

      {editItem && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="text"
            value={editItem.type}
            onChange={(e) => setEditItem({ ...editItem, type: e.target.value })}
          />
          <input
            type="number"
            value={editItem.stockLeft}
            onChange={(e) => setEditItem({ ...editItem, stockLeft: parseInt(e.target.value) })}
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