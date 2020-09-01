import React from 'react'
import Job from './Job'

import QueryTextInput from './TextFieldQuery';
import DropDownInput from './TextFieldSkills';


export default function Jobs({jobs}){
    
    return (
        <div className = "jobs">
            {
                jobs.map(
                    job => <Job job = {job}/>
                )
            }
        </div>
    )
}