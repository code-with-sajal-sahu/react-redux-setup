import React, { useEffect } from 'react'
import UserLayout from "../layout/Layout";
import { Link } from 'react-router-dom';
import "./recipesList.css"
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../../redux/user/userThunks';
// https://dummyjson.com/docs/recipes#recipes-all
const RecipesList = () => {
    const { recipesList } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    console.log({recipesList})
    useEffect(()=>{
        dispatch(getAllRecipes())
    }, [])
  return (
    <UserLayout>
    <div class="wrap">
        {recipesList?.recipes?.map((recipe)=>(
            <div class="box">
            <div class="box-top">
              <img class="box-image" src={recipe.image} alt={recipe.name}/>
              <div class="title-flex">
                <h3 class="box-title">{recipe.name}</h3>
                <p class="user-follow-info">17 Projects</p>
              </div>
              <p class="description">Whipped steamed roast cream beans macchiato skinny grinder café. Iced grinder go mocha steamed grounds cultivar panna aroma.</p>
            </div>
            <Link class="button">Follow Kelsie</Link>
          </div>
        ))}
    </div>
    </UserLayout>
  )
}

export default RecipesList