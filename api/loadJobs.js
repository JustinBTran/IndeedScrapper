DB_API_URL = 'http://localhost:9000/db';
const fetch = require("node-fetch");
const options = ['junior developer', 'software internship', 'senior developer', 
'senior developer', 'frontend engineer', 'fullstack engineer', 'backend engineer',
'summer analyst', 'data science', 'data science internship'
];

fetchJobs();
async function fetchJobs(){
    try{
        const option = 'junior developer';
        const location = '';
        await fetch(DB_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify({option,location})
        })
    }catch(err){
        //console.log(err.message);
    }
}
