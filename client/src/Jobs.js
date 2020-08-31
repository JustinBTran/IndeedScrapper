import React from 'react'
import Job from './Job'

import QueryTextInput from './TextFieldQuery';
import DropDownInput from './TextFieldSkills';

export default function Jobs({jobs}){
    return (
        <div className = "jobs">
            <div className = "header-content">
                <h1 className = "Title">Job Aggregator</h1>
                <p className = "header-description">We search Indeed, ZipRecruiter, and StackoverflowJobs to find
                the best job postings for you. Simply enter a search inquiry
                as well as your marketable skills and we'll
                match you with job postings who are looking for those exact skills.
                </p>
                <QueryTextInput />
                <DropDownInput />
                <button> Submit</button>
            </div>
            {
                jobs.map(
                    job => <Job job = {job}/>
                )
            }
        </div>
    )
}