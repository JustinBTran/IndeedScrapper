import React from 'react'

export default function Job({job}){
    return (
        <div className = {'job'}>
            <p>{job.title}<br/>{job.company}</p>
            <p>Looking for: {job.keyWords.map((kw) => <li>{kw + ", "}</li>) }</p>
            <p>{job.location}</p>
        </div>
    )
}