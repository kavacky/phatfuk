var Observable = require('FuseJS/Observable');

var weight = Observable("");
var notes = Observable("");

var saveLoading = Observable(false);
var saveSuccess = Observable(false);
var saveError = Observable(false);

function save() {
	console.log('w: ' + weight.value);
	console.log('c: ' + notes.value);

	saveLoading.value = true;
	saveSuccess.value = false;
	saveError.value = false;


	fetch('<URL>', {
	    method: 'POST',
	    headers: { "Content-type": "application/json"},
	    body: JSON.stringify({
			weight: weight.value,
			notes: notes.value,
			token: '<TOKEN>'
		})
	}).then(function(response) {
	    console.log('response: ' + JSON.stringify(response));
	    return response.json();
	}).then(function(responseObject) {
		saveLoading.value = false;
		if (responseObject.status == 'success') {
			saveSuccess.value = true;
		}
		else {
			saveError.value = true;;
		}
		console.log('responseObj: ' + JSON.stringify(responseObject));
	}).catch(function(err) {
		saveLoading.value = false;
		saveError.value = true;
		console.log('eggog: ' + JSON.stringify(err));
	});
}

module.exports = {
	save: save,
	weight: weight,
	notes: notes,
	saveLoading: saveLoading,
	saveSuccess: saveSuccess,
	saveError: saveError
};
