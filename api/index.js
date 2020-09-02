const express = require('express')
const app = express()
const port = 9000

const bodyParser = require('body-parser');
const indeedScrapper = require('./indeedScrapper');

app.use(bodyParser.json())
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const mockJobs = {
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
  },
  {
  title: 'SWE 1', company: 'SnapChat',
    location: 'Paolo Alto, California', 
    keyWords: ['Javascript','MySQL','React','Node','Express'],
    link: "https://www.amazon.jobs/en/jobs/1033022/sde1",
  }]

}

app.get('/jobs', async (req, res) => {
  //res.send('Hello World!')s
  
  res.send(mockJobs)
})

app.post('/jobs', async (req,res) =>{
  console.log(req.body.option)
  console.log(req.body.location)
  console.log("scrapping indeed");
  const jobsData = await indeedScrapper.scrapeIndeed(req.body.option,req.body.location)
  console.log("indeed scrapping finished");
  console.log(jobsData);
  res.send('success')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

