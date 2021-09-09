//const axios = require('axios');
const fetch = require('cross-fetch');
const api_url = "https://api.github.com/search/repositories?q=node";

let findAns = async function (data) {

    ans = []
    c = data.length

    async function getData(url) {
        var response1 = await fetch(url);
        var data1 = await response1.json();
        return data1
    }

    async function createObj(d, newLicense) {
        var arr = {
            "name": d.name,
            "full_name": d.full_name,
            "private": d.private,
            "owner": {
                "login": d.owner.login,
                "name": (await getData(d.owner.url)).name,
                "followersCount": (await getData(d.owner.followers_url)).length,
                "followingCount": (await getData(d.owner.following_url.replace(/{(.*)}/, ''))).length
            },
            "licenseName": newLicense.name,
            "score": d.score,
            "numberOfBranch": (await getData(d.branches_url.replace(/{(.*)}/, ''))).length
        }
        return arr
    }

    data.forEach( async (d, i, arr) => {
            const newLicense = d.license || {}
            await createObj(d, newLicense)
            .then((data) => {
                ans.push(data)
                if (c-- == 1) { console.log(ans) }
            })
            .catch((e) => { console.log("waiting", e) })
    })
}

async function getapi(url) {
    const response = await fetch(url)
    data = await response.json()
    //var d1 = []
    //d1.push(data.items[0])
    //d1.push(data.items[1])
    //d1.push(data.items[2])
    findAns(data.items)
}

getapi(api_url)
