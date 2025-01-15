import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { InputLabel, Paper } from '@mui/material';
import { TextField, Select, MenuItem } from '@mui/material';

const initialIngredients = [
    {id: 1, name: 'Olive Oil', type: 'Condiment'},
    {id: 2, name: 'Onion', type: 'Vegetable'},
    {id: 3, name: 'Garlic', type: 'Vegetable'},
    {id: 4, name: 'Chicken Broth', type: 'Soup Base'},
    {id: 5, name: 'Diced Tomatoes', type: 'Canned'},
    {id: 6, name: 'Cheese Tortellini', type: 'Pasta'},
    {id: 7, name: 'Baby Spinach Leaves', type: 'Vegetable'},
    {id: 8, name: 'Salt', type: 'Seasoning'},
    {id: 9, name: 'Pepper', type: 'Seasoning'},
    {id: 10, name: 'Parmesan Cheese', type: 'Cheese'},
    {id: 11, name: 'Basil', type: 'Seasoning'},
    {id: 12, name: 'Sausage', type: 'Meat'},
    {id: 13, name: 'Carrots', type: 'Vegetable'},
    {id: 14, name: 'Celery', type: 'Vegetable'},
    {id: 15, name: 'Ground Beef', type: 'Meat'},
    {id: 16, name: 'Potatoes', type: 'Vegetable'},
    {id: 17, name: 'Green Beans', type: 'Vegetable'},
    {id: 18, name: 'Corn', type: 'Vegetable'},
    {id: 19, name: 'Peas', type: 'Vegetable'},
    {id: 20, name: 'Tomato Sauce', type: 'Canned'},
    {id: 21, name: 'Chicken Breast', type: 'Meat'},
    {id: 22, name: 'Sweet Potatoes', type: 'Vegetable'},
    {id: 23, name: 'Corn Tortillas', type: 'Bread'},
    {id: 24, name: 'Black Beans', type: 'Canned'},
    {id: 25, name: 'Sour Cream', type: 'Dairy'},
    {id: 26, name: 'Cheddar Cheese', type: 'Cheese'},
    {id: 27, name: 'Taco Seasoning', type: 'Seasoning'},
    {id: 28, name: 'Salsa', type: 'Condiment'},
    {id: 29, name: 'Lime', type: 'Fruit'},
    {id: 30, name: 'Cilantro', type: 'Herb'},
    {id: 31, name: 'Avocado', type: 'Fruit'},
    {id: 32, name: 'Lettuce', type: 'Vegetable'},
    {id: 33, name: 'Tomato', type: 'Vegetable'},
    {id: 34, name: 'Yogurt', type: 'Dairy'},
    {id: 35, name: 'Cucumber', type: 'Vegetable'},
    {id: 36, name: 'Pita Bread', type: 'Bread'}
];

function getUniqueIngredientTypes(ingredients) {
    const types = ingredients.map(ingredient => ingredient.type);
    return [...new Set(types)];
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 }
];

const paginationModel = { page: 0, pageSize: 5 };

function createData(
    ingredients,
    name,
    type
) {
    return { id: ingredients.length + 1, name, type };
}

function isIngredientUnique(ingredients, name) {
    return ingredients.filter(ingredient => ingredient.name === name).length === 0;
}

export default function IngredientsTable() {
    const [ingredients, setIngredients] = React.useState(initialIngredients);
    const [ingredient, setIngredient] = React.useState('');
    const [ingredientTypes, setIngredientTypes] = React.useState(getUniqueIngredientTypes(ingredients));
    const [ingredientType, setIngredientType] = React.useState('');
    const [isUniqueIngredient, setIsUniqueIngredient] = React.useState(true);
    const [newType, setNewType] = React.useState('');
    const handleIngredientChange = (event) =>{
        setIngredient(event.target.value)
        setIsUniqueIngredient(isIngredientUnique(ingredients, event.target.value));
    }
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <TextField id="outlined-basic" label="Ingredient" value={ingredient} onChange={handleIngredientChange} />
            <InputLabel id="demo-simple-select-label">Ingredient Type</InputLabel>
            <TextField
                placeholder="New Type"
                value={newType}
                onChange={(event) => setNewType(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        const newType = event.target.value;
                        if (newType && !ingredientTypes.includes(newType)) {
                            setIngredientTypes([...ingredientTypes, newType]);
                            setIngredientType(newType);
                            setNewType('');
                        }
                    }
                }}
            />
            <Select
                id="demo-simple-select"
                labelId="demo-simple-select-label"
                label="Ingredient Type"
                value={ingredientType}
                onChange={(event) => setIngredientType(event.target.value)}
                sx={{ width: 200 }}
            >
                {ingredientTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
            <button disabled={!isUniqueIngredient} onClick={() => {
                const newIngredient = createData(ingredients, ingredient, ingredientType);
                setIngredients(ingredients.concat(newIngredient));
                setIngredient('')
                setIngredientType('')
            }}>Submit</button>
            {!isUniqueIngredient && (
                <p style={{ color: 'red' }}>This ingredient already exists.</p>
            )}
            <DataGrid
                rows={ingredients}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}