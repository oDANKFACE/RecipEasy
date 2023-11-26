import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import MealList from "./components/MealList";
import RecipeDetails from "./components/RecipeDetails";


function App() {
    const [meals, setMeals] = useState([]);

    const handleSearch = (searchTerm) => {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Check if the API returned any meals
                if (data.meals) {
                    setMeals(data.meals);
                } else {
                    // If no meals are found, set the meals state to null
                    setMeals(null);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setMeals(null);
            });
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <SearchBar onSearch={handleSearch} />
                                <MealList meals={meals} />
                            </>
                        }/>
                        <Route path="/meal/:id" element={<RecipeDetails />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
