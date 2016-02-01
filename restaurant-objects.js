var FoodItem = function (name, calories, vegan, glutenFree, citrusFree) {
	this.name 		= name;
	this.calories 	= calories;
	this.vegan 		= vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
}

FoodItem.prototype.stringify = function () {
	var output = ''
	output = output + this.name + '; ' 
	+ this.calories + ' calories' + ';' 
	if (this.vegan) { 	   output = output + ' Vegan;'; }
	if (this.glutenFree) { output = output + ' Gluten-Free;'; }
	if (this.citrusFree) { output = output + ' Citrus-Free'; }
	return output;
}

//DRINKS
var Drink = function (name, description, price, ingredients) {
 	this.name 		 = name;
 	this.description = description;
 	this.price 		 = price;
 	this.ingredients = ingredients;
}

Drink.prototype.stringify = function () {
	var output = this.name + ' - $' 
	+ this.price.toString() + '\n' 
	+ this.description + '\n'
	return output
}

//PLATES
var Plate = function (name, description, price, ingredients) {
	this.name 		 = name;
	this.description = description;
	this.price 		 = price;
	this.ingredients = ingredients;
}
Plate.prototype = {
	stringify: function () {
		var output = this.name + ' - $' 
		+ this.price.toString() + '\n' 
		+ this.description + '\n'
		return output
	},

	isVegan: function () {
		this.ingredients.forEach (function(ingredient) {
			if (!ingredient.isVegan) { return false }
		}); 	
		return true
	},

	isGlutenFree: function () {
		this.ingredients.forEach (function(ingredient) {
			if (!ingredient.isGlutenFree) { return false }
		});
		return true
	},

	isCitrusFree: function () {
		this.ingredients.forEach (function(ingredient) {
			if (!ingredient.isCitrusFree) { return false }
		});
		return true
	}
}

//ORDER	
var Order = function (plates) {
	this.plates = plates;
}
Order.prototype.stringify = function () {
	var output = '';
	this.plates.forEach(function(plate) {
		output = output + plate.name + ', '
	})
	return output;
}

//MENU
var Menu = function (plates) {
	this.plates = plates
}
Menu.prototype.stringify = function () {
	var output = '';
	this.plates.forEach(function(plate) {
		output = output + plate.stringify() + '\n'
	})
	return output
}

//RESTAURANT
var Restaurant = function (name, description, menu) {
	this.name 		 = name;
	this.description = description;
	this.menu 		 = menu;
}
Restaurant.prototype.stringify = function () {
	var output = this.name + '\n'
	+ this.description + '\n'
	+ this.menu.stringify()
	return output
}

//CUSTOMER
var Customer = function (dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
}
Customer.prototype.stringify = function () {
	return 'Dietary Preference: ' + this.dietaryPreference
}

// Ingredients - (Vegan, Gluten-free, Citrus-free)
var blackBeans 	= new FoodItem ('Black Beans', 200, true, true, true)
var carnitas   	= new FoodItem ('Carnitas', 200, false, true, false)
var avocado    	= new FoodItem ('Avocado', 200, true, true, true)

var lime 		= new FoodItem ('Lime', 5, true, true, false)
var tequila 	= new FoodItem ('Tequila', 200, true, true, true)

// Drinks
var margarita 	= new Drink ('Margarita', 'Tasty frozen margarita', 6, [tequila, lime])

// Plates
var burrito 	= new Plate ('Burrito', 'A tasty carnitas burrito', 6, [blackBeans, carnitas, avocado, lime])
var guac 		= new Plate ('Guacamole', 'Tasty home-made guac', 3, [avocado, lime])

// Menu
var menu 		= new Menu ([margarita, burrito, guac])

// Restaurant
var restaurant 	= new Restaurant ('Taco Town', 'Fancy Mexian Food', menu) 
console.log(restaurant.stringify())
