import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data.meals[0]);
            })
            .catch(error => console.error('That\'s not good... Don\'t look, we\'ll fix it!', error));
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    const ingredients = [];

    let i = 1;
    while (recipe[`strIngredient${i}`]) {
        ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
        i++;
    }

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-details">
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className="area-category">{`${recipe.strArea} ${recipe.strCategory}`}</div>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <div>{recipe.strInstructions}</div>
        </div>
    );
}

export default RecipeDetails;
