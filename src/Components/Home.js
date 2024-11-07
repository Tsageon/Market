import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/itemSlice";
import { selectUser } from "../Redux/authSlice";
import { addToCart } from "../Redux/cartSlice";
import { Bars } from "react-loader-spinner";
import Img from "./pHilMckacking (1).png";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = (item) => {
  const productSectionRef = useRef(null);
  const user = useSelector(selectUser);
  const items = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showPriceSlider, setShowPriceSlider] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  console.log('User:', user);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (filteredItems.length === 0) {
      alert("Product Not Found/Added Yet.");
    }
  };
  
  const handleExploreClick = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }; 

  const handleDealsClick = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
    setTimeout(() => {
      alert("No specials yet, enjoy our very limited product range.");
    }, 500);
  };

  const handleDonationClick = () => {
    alert("Thanks for caring enough to donate, but it's not necessary.");
  };

  const handleProfileClick = () => {
    if (!user?.email) {
      console.log('User from Redux store:', user);  
      alert("Please log in to see your profile.");
      navigate("/");
    } else {
      navigate("/profile",);
    }
  };
  
  const handleAddToCart = () => {
    console.log("Add to cart clicked!");
    if (item && item.Name && item.Price && item.Description) {
      console.log('Item being added:', item);
      dispatch(addToCart({
        id: item.id, 
        name: item.Name,
        description: item.Description,
        price: item.Price,
        quantity: 1
      }));
    } else {
      console.log('Item data is incomplete or invalid');
    }
  };
  
  

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.Name.toLowerCase().includes(
      searchQuery.toLowerCase()
    );

    if (selectedFilter === "all") {
      return matchesSearch;
    }

    if (selectedFilter === "availability") {
      return matchesSearch && item.Availability === "In Stock";
    }

    if (selectedFilter === "stockLeft") {
      return matchesSearch && item.StockLeft > 0;
    }

    if (selectedFilter === "price") {
      return matchesSearch && item.Price >= minPrice && item.Price <= maxPrice;
    }

    if (selectedFilter === "type") {
      return (
        matchesSearch &&
        item.Type &&
        item.Type.toLowerCase() === searchQuery.toLowerCase()
      );
    }

    return matchesSearch;
  });

  const handleFilterChange = (filterType) => {
    setSelectedFilter(filterType);
    if (filterType === "price") {
      setShowPriceSlider(true);
    } else {
      setShowPriceSlider(false);
    }
  };

  const handleShowMoreClick = () => {
    alert("We don't have that many products");
    console.log("Show more products logic here");
  };

  const handleBuyNow = (item) => {
    if (!user) {
      alert("Please log in to buy your headphones.");
      navigate("/login");
    } else {
      navigate("/product", { state: { item } });
    }
  };
  

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  console.log('User:', user);

  return (
    <div className="Home-container">
        <header className="header">
        <img className="mage" src={Img} alt="logs" />
        <h2>Tech Store</h2>
        <nav className="Nav">
          <ul>
            <li onClick={handleDealsClick}>Deals</li>
            <li onClick={handleDonationClick}>Donation</li>
            <li onClick={handleExploreClick}>Explore</li>
          </ul>
        </nav>
        <br />
        <div className="search-section">
          <input
            type="text"
            placeholder="Search recipes"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className="account-cart">
          <button className="cart" onClick={handleGoToCart}>
          ({cartItems.length} items)in Cart
          </button>
          <button className="profile" onClick={handleProfileClick}>
            Profile
          </button>
        </div>
      </header>
    
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("availability")}>Availability</button>
        <button onClick={() => handleFilterChange("stockLeft")}>Stock Left</button>
        <button onClick={() => handleFilterChange("price")}>Price</button>
        <button onClick={() => handleFilterChange("type")}>Type</button>
      </div>
      {showPriceSlider && (
        <div className="price-filter">
          <div>
            <label>Min Price: {minPrice}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Max Price: {maxPrice}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="Products-section">
        <h2>Items</h2>
        <p>Welcome, {user?.user?.email || "Guest"}</p>
        {status === "loading" ? <Bars  height="80" width="80" color="#4fa94d" ariaLabel="loading-indicator" /> : null}
        <div id="product-section" className="Products-section">
          <h3>
            <b>Products for You</b>
          </h3>
          <br />
          {status === "loading" ? (
             <div className="loader-container">
             <Bars height="80" width="80" color="#4fa94d" ariaLabel="loading-indicator" />
           </div>
          ) : (
            <div className="product-card-container">
              {filteredItems.map((item) => (
                <div key={item.id} className="product-card">
                  <img src={item.Image} alt={item.Name} />
                  <h4>{item.Name}</h4>
                  <p>{item.Description}</p>
                  <p>Price: R{item.Price}</p>
                  <p>Stock Left: {item.StockLeft} left</p>
                  <p>Availability: {item.Availability}</p>
                  <button
                    className="buy-button"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy
                  </button>
                  <button className="buy-button"  onClick={ handleAddToCart}><FaCartPlus/>Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="showmore-button" onClick={handleShowMoreClick}>
        Show more
      </div>
    </div>
  );
};

export default Home;