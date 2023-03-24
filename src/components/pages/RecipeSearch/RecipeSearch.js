import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./styles/recipe-search.css";

const RecipeSearch = () => {
    const [recipes, setRecipes] = useState(null | Array);
    const [recipeSearch, setRecipeSearch] = useState('');
    const [calorieLimit, setCalorieLimit] = useState('');
    const [mealType, setMealType] = useState('');
    const [searched, setSearched] = useState(false);

    const getRecipes = (e) => {
        e.preventDefault();
        setSearched(true);
        // build api query string
        var queryString = 'https://api.edamam.com/api/recipes/v2?app_id=' + process.env.REACT_APP_EDAMAM_APP_ID + '&app_key=' + process.env.REACT_APP_EDAMAM_APP_KEY + '&type=any&q=' + recipeSearch;
        calorieLimit != '' ? queryString += '&calories=1-' + calorieLimit : queryString += ''
        mealType != '' ? queryString += '&mealType=' + mealType : queryString += ''
        axios.get(queryString)
            .then(res => {
                setRecipes(res.data.hits);
            })
            .catch(error => { console.log(error) });
    }

    useEffect(() => {
        recipes ? console.log(recipes) : console.log('No recipes yet')
    });

    return (
        <>
            <div className="container mx-auto">
                <div className="w-full max-w-xs mx-auto">
                    <h1 className="text-4xl font-extrabold">Recipe Search</h1>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={getRecipes}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipeSearch">
                                Whatcha hungry for?<sup className="text-red-500">*</sup>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                type="text"
                                name="recipeSearch"
                                placeholder="Enter Recipe to Search"
                                value={recipeSearch}
                                onChange={(e) => setRecipeSearch(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mealType">
                                Meal Type
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                name="mealType"
                                defaultValue={'DEFAULT'}
                                onChange={(e) => setMealType(e.target.value)}
                            >
                                <option value="DEFAULT" disabled>Choose Meal Type</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calorieLimit">
                                Max Calories per Serving:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                type="number"
                                name="calorieLimit"
                                placeholder="Enter Max Calories Per Serving"
                                value={calorieLimit}
                                onChange={(e) => setCalorieLimit(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Get Recipes</button>
                    </form>   
                </div>

                {
                    searched
                        ? <h2 className="text-2xl font-extrabold">Search Results</h2>
                        : ''
                }
                
                <div className="recipe-cards-container">
                    {
                        recipes 
                            ? 
                                recipes.map((recipe, index) =>                           
                                        <div className="single-recipe mx-2 mb-4 rounded overflow-hidden shadow-lg" key={recipe.recipe.url}>
                                            <img className="w-full" src={recipe.recipe.images.REGULAR.url} />
                                            <div className="px-6 py-4">
                                                <div className="font-bold text-xl mb-2">{recipe.recipe.label}</div>
                                                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" href={recipe.recipe.url} target="_blank">
                                                    View Recipe
                                                </a>
                                            </div>
                                            <div className="border-t-2 border-neutral-100 py-3 px-6 dark:border-neutral-600 ">
                                                1 Serving:<br />
                                                Cals - {Math.round((recipe.recipe.calories) / (recipe.recipe.yield))} | P - {Math.round((recipe.recipe.totalNutrients.PROCNT.quantity) / (recipe.recipe.yield))}g | F - {Math.round((recipe.recipe.totalNutrients.CHOCDF.quantity) / (recipe.recipe.yield))}g | C - {Math.round((recipe.recipe.totalNutrients.FAT.quantity) / (recipe.recipe.yield))}g
                                            </div>
                                        </div>
                                )
                            : 
                                <p>No recipes yet &#128543;</p>
                    }
                </div>
            </div>
        </>
    )
}

export default RecipeSearch