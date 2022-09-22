// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length;
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	return filmingLocations.sort(function(a,b){ return new Date(a.fields.date_debut) - new Date(b.fields.date_debut);});
}
const sortedLocations = sortFilmingLocationsByStartDate();
console.log(`${JSON.stringify(sortedLocations[0])} \n${JSON.stringify(sortedLocations[sortedLocations.length-1])}`)

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	return filmingLocations.filter(item => item.fields.annee_tournage === "2020").length;
}
console.log(`There were ${getFilmingLocationsNumber2020()} filming locations in 2020`);

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	let res = {}
	for (let i = 2016; i < 2023; i++) {
		const element = `${i}`;
		const num = filmingLocations.filter(item => item.fields.annee_tournage === `${i}`).length
		res[element] = num;
	}
	return res
}
console.log(getFilmingLocationsNumberPerYear());

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	let res = {}
	for (let i = 75001; i < 75020; i++) {
		const element = `${i}`;
		const num = filmingLocations.filter(item => item.fields.ardt_lieu === `${i}`).length
		res[element] = num;
	}
	return res
}
console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	const res = {};
	for (const elem of filmingLocations) {
		if(res[elem.fields.nom_tournage]){
			res[elem.fields.nom_tournage] += 1;			
		}
		else {
			res[elem.fields.nom_tournage] = 1;
		}
	}
	return res;
}
console.log(getFilmLocationsByFilm());

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	const temp = [];
	for (const elem of filmingLocations) {
		if (!temp[elem.fields.nom_tournage]) {
			temp.push(elem.fields.nom_tournage)
		}		
	}
	return temp.length;
}

console.log(getNumberOfFilms());

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	const res = [];
	for (const elem of filmingLocations) {
		if (elem.fields.nom_tournage === `LRDM - Patriot season 2` && !res[elem.fields.adresse_lieu]) {
			res.push(elem.fields.adresse_lieu);
		}	
	}
	return res;
}
console.log(getArseneFilmingLocations());

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	const res = {};
	favoriteFilmsNames.forEach(film => {
		const temp = []
		for (const elem of filmingLocations) {
			if (elem.fields.nom_tournage === film && !temp.includes(elem.fields.ardt_lieu)) {
				temp.push(elem.fields.ardt_lieu);
			}
		}
		res[film] = temp;
	});
	return res;
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]

console.log(getFavoriteFilmsLocations(favoriteFilms));

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const res = {};
	for (const elem of filmingLocations) {
		if (!res[elem.fields.nom_tournage]) {
			res[elem.fields.nom_tournage] = [elem.fields.adresse_lieu];
		}
		else if (res[elem.fields.nom_tournage]){
			res[elem.fields.nom_tournage].push(elem.fields.adresse_lieu);
		}
	}
	return res;
}
console.log(getFilmingLocationsPerFilm());
// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	const res = {}
	for (const elem of filmingLocations) {
		if(!res[elem.fields.type_tournage]){
			res[elem.fields.type_tournage] = 1;
		}
		else if(res[elem.fields.type_tournage]){
			res[elem.fields.type_tournage] +=1;
		}
	}
	return res;
}

console.log(countFilmingTypes());

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	const inp = countFilmingTypes();
	const res = [];
	for (const key in res) {
		if (Object.hasOwnProperty.call(res, key)) {
			res.push({type:key,count:res[key]})			
		}
	}
	res.sort(function(a,b){ return a.count - b.count;})
	return res;
}

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration
function longestFilmingLocation() {
	let temp = {};
	let tLength = 0;
	for (const elem of filmingLocations) {
		const timeDiff = new Date(elem.fields.date_fin) - new Date(elem.fields.date_debut);
		if (timeDiff>tLength) {
			temp = elem;
			tLength = timeDiff;
		}
	}
	return {temp,tLength};
}
const longest = longestFilmingLocation();
console.log(longest.temp, duration(longest.tLength));

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result

// It works but is unsafe in so many ways
function averageFilmingTime(){
	let totalTime = 0;
	for (const elem of filmingLocations) {
		totalTime += (new Date(elem.fields.date_fin) - new Date(elem.fields.date_debut));
	}
	return duration(totalTime/filmingLocations.length);
}
console.log(averageFilmingTime());