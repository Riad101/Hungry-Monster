

// Creating Dynamic Meal API to search meal By Name
function getMealDetails() {
    var inputMeal = document.getElementById('search-meal').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`;
    
    if (inputMeal == '') {
        return alert('You have not entered any meal information you are seeking! ');
    }
    else {        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const mealName = data.meals;                
                getMealInfo(mealName);
            })
            .catch(err => {
                console.log(err);
                alert('Click Home page to initiate Meal search.');
                inputMeal = '';
            })
    }
}
// Function to display meal information in web page
const getMealInfo = foodName => {
    const mealContent = document.getElementById('displayMeals-area');
    foodName.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'each-meal-div';
        mealDiv.id = 'hideDiv';
        const mealInfo = `
        <img onclick="mealDetailsAPI('${meal.strMeal}')" src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h3>
        `;
        mealDiv.innerHTML = mealInfo;
        mealContent.appendChild(mealDiv);
    })
}



// Creating dynamic meal ingredients to look up

const mealDetailsAPI = async mealByName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealByName}`
    
    try{
        const res = await fetch(url);
        const data = await res.json();
        showMealIngredients(data.meals);
    }catch(err){
        return alert("Meal Details not found!");
    }

};

// Function to display meal ingredient information 
const showMealIngredients = ingredients => {
    document.getElementById("allData").style.display = 'none'
    document.getElementById("mealDetails").style.display = "block"
    const mealDetails = document.getElementById("mealDetails");
    ingredients.forEach(details => {
        const mealDetailDiv = document.createElement('div')
        const mealDetailInfo = `
        <img src="${details.strMealThumb}">
        <h2 class="text"> ${details.strMeal}</h2>
        <li class="text">${details.strMeasure1}  ${details.strIngredient1}</li>
        <li class="text">${details.strMeasure2}  ${details.strIngredient2}</li>
        <li class="text">${details.strMeasure3}  ${details.strIngredient3}</li>
        <li class="text">${details.strMeasure4}  ${details.strIngredient4}</li>
        <li class="text">${details.strMeasure5}  ${details.strIngredient5}</li>
        <li class="text">${details.strMeasure6}  ${details.strIngredient6}</li>
        <li class="text">${details.strMeasure7}  ${details.strIngredient7}</li>
        <li class="text">${details.strMeasure8}  ${details.strIngredient8}</li>
        <li class="text">${details.strMeasure9}  ${details.strIngredient9}</li>   
        <li class="text">${details.strMeasure10}  ${details.strIngredient10}</li>        
        <footer class="footerHere"><a href="${details.strYoutube}" target="blank">Watch Video</a></footer>
    `
        mealDetailDiv.innerHTML = mealDetailInfo;
        mealDetails.appendChild(mealDetailDiv);
    });
}
// clickHandler for  search button
document.getElementById('search-btn').addEventListener('click', function searchBtnClick() {
    getMealDetails();
    document.getElementById('search-btn').value = '';
    document.getElementById("allData").style.display = 'block';
    document.getElementById('displayMeals-area').innerHTML = '';
})

// clickHandler for  Home button
document.getElementById("homeClicked").addEventListener('click', function () {
    document.getElementById("mealDetails").style.display = 'none';
    document.getElementById("allData").style.display = 'block';
    document.getElementById('mealDetails').innerHTML = '';
})
