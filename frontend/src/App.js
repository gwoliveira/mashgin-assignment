import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    axios.get('/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    axios.get(`/items?category_id=${categoryId}`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items for category:', error);
      });
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.category_id === selectedCategory)
    : items;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Menu</h1>
      </header>
      <main>
        <div className="categories">
          <h2>Categories</h2>
          <button onClick={() => setSelectedCategory(null)}>All</button>
          {categories.map(category => (
            <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
              <img src={category.image_url} alt={category.name} width="50" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        <div className="items">
          <h2>Items</h2>
          <ul>
            {filteredItems.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.name} width="100" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;