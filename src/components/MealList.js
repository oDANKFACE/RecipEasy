import React from 'react';
import { Link } from 'react-router-dom';


function MealList({ meals }) {
    if (meals === null) {
        return <p>Uhh... We didn't find anything. Try again!</p>;
    }

    return (
        <div className="meal-list">
            {meals.map((meal) => (
                <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal} className="meal-item">
                        <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
                        <h3>{meal.strMeal}</h3>
                </Link>
            ))}
        </div>
    );
}

export default MealList;
