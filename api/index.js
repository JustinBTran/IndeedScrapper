const express = require('express')
const app = express()
const port = 9000

const bodyParser = require('body-parser');
const indeedScrapper = require('./indeedScrapper');
const zipScrapper = require('./zipScrapper');

const db = require('./db');
const { getJobsByType, processJobsIntoDB } = require('./db');

app.use(bodyParser.json())
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

var mockJobs = {
  jobs: [{
    title: 'Junior Developer', company: 'IBM',
    location: 'Toronto, On', 
    keyWords: ['C++','MySQL','HTML5','CSS','Javascript'],
    link: "https://careers.google.com/teams/engineering-technology/",
  },
  {
    title: 'SDE 1', company: 'Microsoft',
    location: 'Toronto, On', 
    keyWords: ['Python','C++','MongoDB','Git','Javascript'],
    link: "https://www.amazon.jobs/en/jobs/1033022/sde1",
  }]

}

app.get('/jobs', async (req, res) => {
  //res.send('Hello World!')s
  
  res.send(mockJobs)
})

async function scrapeIndeed(option,location){
  console.log("scrapping indeed");
  const jobsData = await indeedScrapper.scrapeIndeed(option,location);
  console.log("indeed scrapping finished");
  return jobsData;
}

async function scrapeZip(option,location){
  console.log("scrapping zipRecruiter");
  const jobsData = await zipScrapper.scrapeZip(option,location);
  console.log("zipRecruiter scrapping finished");
  return jobsData;
}

async function filterBySkills(jobsData, skills){
  var bodyText = "";
  var foundSkills = [];
  var jobJson = {};
  var filteredJobs = [];
  var count = 1;
  for(var i = 0; i<jobsData.length;i++){
    //console.log("filtering job " + count);
    console.log('filetering job at ' + jobsData[i].company);
    bodyText = jobsData[i].bodyText;
    foundSkills = [];
    for(var j = 0; j<skills.length;j++){
      //console.log("Checking if job has " + skills[j]);
      if(bodyText.indexOf(skills[j])!==-1){
        foundSkills.push(skills[j]);
      }
    }
    jobJson = {
      title: jobsData[i].title,
      company: jobsData[i].company,
      location: jobsData[i].location,
      link: jobsData[i].link,
    }
    //console.log("foundSkills:" + foundSkills.length);
    /*if(foundSkills.length<1){
      delete jobsData[i].bodyText;
      jobsData.splice(i,i+1);
    }else{
      jobsData[i].keyWords = foundSkills;
      delete jobsData[i].bodyText;
    }*/
    jobJson.keyWords = foundSkills;
    if(foundSkills.length>0){
      filteredJobs.push(jobJson);
    }
    count++;
  }
  return filteredJobs;
}

app.post('/jobs', async (req,res) =>{
  console.log(req.body.option)
  console.log(req.body.location)
  console.log(req.body.skills)
  //const indeedData = await scrapeIndeed(req.body.option,req.body.location)

  const rawJobData = await getJobsByType(req.body.option);
  console.log("found " + rawJobData.length + " jobs");
  const indeedJobCards = await filterBySkills(rawJobData,req.body.skills)
  console.log('filtering complete')
  mockJobs.jobs = indeedJobCards
  console.log(mockJobs);

  res.send('success')
})

app.post('/db', async(req,res) => {
  console.log('fetching jobs');
  const indeedData = await scrapeIndeed(req.body.option,req.body.location)
  await processJobsIntoDB(req.body.option,indeedData)
  res.send('success')

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

