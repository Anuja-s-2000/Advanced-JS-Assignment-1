//const axios = require('axios');
const fetch =require('cross-fetch');
const api_url = "http://api.nobelprize.org/v1/prize.json";

let findPeople = function (data) {
    var people = [];
    data.filter((value) => value.category == 'chemistry' && value.year <= 2019 && value.year >= 2000).forEach(addPeople)
    function addPeople(value) {
        value.laureates.forEach(function (item) {
            people.push(item.firstname + ' ' + item.surname)
        })
    }
    return people
}

async function getapi(url) {
    const response = await fetch(url);
    data = await response.json();
    var people = findPeople(data.prizes)
    console.log(people.length,"People won prize for category 'Chemistry' between year 2000 to 2019:")
    console.log(people)
}

getapi(api_url);