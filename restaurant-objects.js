var resto = angular.module('resto', []);

resto.controller('frontEnd', ['$scope', 'facto', function($scope, facto)
{
	$scope.facto = facto;
	$scope.tacoTown = facto.tacoTown;

	$scope.order = {
				
	}

	var Order = function() {
		this.foods = [],
		this.total = 0
	}

	Order.prototype = {
		computePrice : function() {
			this.total = 0;
			this.foods.forEach(function(item) {
				this.total += item.price;
			})
		},
		addItem : function(item) {
			this.foods.push(item);
			this.computePrice();
		},
		removeItem : function(item) {
			var index = this.foods.indexOf(item);
			if (index) { this.foods.splice(index, 1); }
			this.computePrice()
		}
	}

	// track orders; add them to the "order"
		// compute price



	$scope.computePrice(order)

	console.log($scope.tacoTown);

}])

resto.factory('facto', function() {

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

	// // Ingredients - (Vegan, Gluten-free, Citrus-free)
	var blackBeans 	= new FoodItem ('Black Beans', 200, true, true, true)
	var carnitas   	= new FoodItem ('Carnitas', 200, false, true, false)
	var avocado    	= new FoodItem ('Avocado', 200, true, true, true)
	var tortilla 	= new FoodItem ('Tortilla', 200, true, false, true)
	var jalapeno 	= new FoodItem ('Jalapeno', 5, true, true, true)
	var queso 		= new FoodItem ('Queso', 200, false, true, true)

	var lime 		= new FoodItem ('Lime', 5, true, true, false)
	var tequila 	= new FoodItem ('Tequila', 200, true, true, true)

	// // Drinks
	var margarita 	= new Drink ('Margarita', 'Tasty frozen margarita', 6, [tequila, lime])
	var spicyMarg 	= new Drink ('Spicy Margarita', 'Our frozen margarita, but Jalapeno-infused', 7, [tequila, lime, jalapeno])

	// // Plates
	var burrito 	= new Plate ('Burrito', 'A tasty carnitas burrito', 6, [tortilla, blackBeans, carnitas, avocado, lime])
	var tamale		= new Plate ('Tamale', 'Meat and carbs, yum yum', 7, [tortilla, blackBeans, carnitas, jalapeno])
	var quesadilla 	= new Plate ('Quesadilla', 'Meat, cheese and carbs in one place', 8, [tortilla, carnitas, queso])
	var guac 		= new Plate ('Guacamole', 'Tasty home-made guac', 3, [avocado, lime])
	var chips 		= new Plate ('Tortilla Chips', 'Old tortillas baked into chips in our very own oven', 2, [tortilla])

	// // Menu
	var tacoLessMenu = new Menu ([margarita, spicyMarg, burrito, tamale, quesadilla, guac, chips])

	// // Restaurant
	var tacoTown 	= new Restaurant ('Taco Town', 'Taco-Free Mexican Food', tacoLessMenu) 

	var fullInventory = {
		blackBeans 	: blackBeans,
		carnitas 	: carnitas,
		avocado 	: avocado,
		tortilla 	: tortilla,
		jalapeno 	: jalapeno,
		queso 		: queso,
		lime 		: lime,
		tequila 	: tequila,
		margarita 	: margarita,
		spicyMarg 	: spicyMarg,
		burrito 	: burrito,
		tamale 		: tamale,
		quesadilla 	: quesadilla,
		guac 		: guac,
		chips 		: chips,
		tacoLessMenu: tacoLessMenu,
		tacoTown 	: tacoTown
	}

	return {
		FoodItem 	: FoodItem,
		Drink 		: Drink,
		Plate 		: Plate,
		Menu 		: Menu,
		Restaurant 	: Restaurant,
		fullInventory : fullInventory,
		tacoTown	: tacoTown
	}

});
