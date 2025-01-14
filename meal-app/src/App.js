import logo from './Logos/FRGLogo-PNG-white.png';
// import './App.css';
import './Branded_Template.css'
const pinterestClick = () => {
  console.log('Button clicked! Fetching the soup recipe...');
  // Add logic to fetch 3 recipes here
  window.open('https://www.pinterest.com/pin/492792384236773149/', '_blank');
}
const recipeClick = () => {
  console.log('Button clicked! Fetching the soup recipe...');
  // Add logic to fetch 3 recipes here
  const ingredients = [
    '1 tablespoon olive oil',
    '1 onion, chopped',
    '2 cloves garlic, minced',
    '6 cups chicken broth',
    '1 (14.5 ounce) can diced tomatoes',
    '1 (9 ounce) package refrigerated cheese tortellini',
    '3 cups baby spinach leaves',
    'Salt and pepper to taste',
    'Grated Parmesan cheese for serving'
  ];
  console.log('Ingredients for Spinach Tortellini Soup:', ingredients);
  const recipeList = document.createElement('ul');
  ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    recipeList.appendChild(listItem);
  });
  document.body.appendChild(recipeList);
}

function App() {
  return (
    <div className="App">
      <header>
        <link rel="icon" href={logo} />
        <title>Meal Scheduler</title>
        <h1 className='title1'>Welcome to the Meal Scheduler</h1>
        <h2>Spinach Tortellini Soup</h2>
        <button onClick={pinterestClick}>Pinterest</button>
        <button onClick={recipeClick}>Recipe</button>
      </header>
    </div>
  );
}

export default App;
