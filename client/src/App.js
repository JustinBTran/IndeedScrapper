import React from 'react';
import './App.css';


import Jobs from './Jobs.js';

const mockJobs = [
  {
    title: 'Junior Developer', company: 'Google',
    location: 'Toronto, On', 
    keyWords: ['C++','MySQL','HTML5','CSS','Javascript']
  },
  {
    title: 'SDE 1', company: 'Amazon',
    location: 'Toronto, On', 
    keyWords: ['Python','C++','MongoDB','Git','Javascript']
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
