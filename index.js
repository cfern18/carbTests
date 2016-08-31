var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// Require inside your project
var NutritionixClient = require('nutritionix');
var nutritionix = new NutritionixClient({
    appId: '89b2a057',
    appKey: '8bdfcf6398c7c4d6ab6407b92826264a'
    // debug: true, // defaults to false
});

//Update to actually use autocomplete after 
var autoCompleteSearch = {
	q:'cheesebur'
};

var errMsgs = {
	search: 'There was a problem performing an autocomplete search',
	carbs: 'There was a problem with carbohydrate lookup',
	uncaught: 'There was an uncaught exception'
};

function logJson(o) {
    console.log(JSON.stringify(o,null,4));
}

function RequestErrorHandler(msg) {
    return function reqErrHndlr(e) {
        console.error(msg);

        // if (_.isObject(e) && !(e instanceof Error)) {
        //     logJson(e);
        // } else {
        //     console.error(e);
        // }

        //process.exit(1);

    };
}




//AUTOCOMPLETE
// console.log('Attempting to autocomplete: %s', autoCompleteSearch.q); 
// nutritionix.autocomplete(autoCompleteSearch)
// 	.then(searchSuccess, new RequestErrorHandler(errMsgs.search))
// 	.catch(new RequestErrorHandler(errMsgs.uncaught));

//ERROR with API CALL
var carbSearch = {
	q:'cheeseburger',
	limit: 10,
	offset: 0,
	search_nutrient: 'carb'
};

//CARBOHYDRATE SEARCH
//Average the top 20 results from nutritionix? 
console.log('Attempting to find carbs for: %s', carbSearch.q); 
nutritionix.search(carbSearch)
	.then(carbohydrateSuccess, new RequestErrorHandler(errMsgs.carbs))
	.catch(new RequestErrorHandler(errMsgs.uncaught));


function carbohydrateSuccess(searchResults) {
	cosole.log("Completed Carbohydrate lookup API call. Parsing results. ")
	
	logJson(seearchResults);

	var result = searchResults[0];
	//Testing format of the result
	logJson(result);
	var name = [
		//FILL IN
	]

	cosnole.log(('search successful retreving ' +
				'carbs for item %s'), name);

	//FIX return statemnt 
	return nutritionix.item({

	})
}


function searchSuccess(searchResults) {
	console.log("Completed autocomplete API call. Parsing results.");
	logJson(searchResults);
	
	var result = searchResults[0];
	var name = [
		result.id,
		result.text,
	].join(' - ');

	console.log(('search successful retrieving '+
				'record for item: %s'), name);

	//FIX THIS RETURN
	return nutritionix.item({
		id: result.id
	});
}

app.get('/', function(request, response) {
  response.send('Completed API request')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
