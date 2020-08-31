import React from 'react';
import './App.css';


import Jobs from './Jobs.js';

const mockJobs = [
  {
    title: 'Junior Developer', company: 'Google',
    location: 'Toronto, On', 
    keyWords: ['C++','MySQL','HTML5','CSS','Javascript'],
    link: "https://careers.google.com/teams/engineering-technology/",
  },
  {
    title: 'SDE 1', company: 'Amazon',
    location: 'Toronto, On', 
    keyWords: ['Python','C++','MongoDB','Git','Javascript'],
    link: "https://www.amazon.jobs/en/jobs/1033022/sde1",
  }
]

function App() {
  return (
    <div className="App">
     
      <Jobs jobs = {mockJobs}/>
    </div>
  );
}

export default App;
