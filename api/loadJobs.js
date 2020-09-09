DB_API_URL = 'http://localhost:9000/db';
const fetch = require("node-fetch");
const options = ['junior developer', 'software internship', 'senior developer', 
'senior developer', 'frontend engineer', 'fullstack engineer', 'backend engineer',
'summer analyst', 'data science', 'data science internship'
];

fetchJobs();
async function fetchJobs(){
    var option = '';
    var location = '';
    for(var i =0; i<options.length;i++){
        try{
            option = options[i];
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
}
