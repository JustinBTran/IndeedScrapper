const express = require('express')
const app = express()
const port = 9000

app.get('/jobs', async (req, res) => {

  //res.send('Hello World!')
  const mockJobs = [
    {
      title: 'Software Intern', company: 'Intel',
      location: 'Toronto, On', 
      keyWords: ['C++','MySQL','HTML5','CSS','Javascript'],
      link: "https://careers.google.com/teams/engineering-technology/",
    },
    {
      title: 'SDE 3', company: 'Facebook Inc',
      location: 'Toronto, On', 
      keyWords: ['Python','C++','MongoDB','Git','Javascript'],
      link: "https://www.amazon.jobs/en/jobs/1033022/sde1",
    }
  ]
  res.send(mockJobs)
})

app.get('/jobs', async (req, res) => {
  
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})