const express = require('express')
const app = express()
const port = 9000

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/jobs', async (req, res) => {
  //res.send('Hello World!')s
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
    }]
  
  }
  res.send(mockJobs)
})

app.post('/jobs', async (req,res) =>{
  console.log(req.body)
  res.send('success')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})