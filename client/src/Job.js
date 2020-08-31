import React from 'react'

export default function Job({job}){
    return (
        <div className = {'job'}>
            <a href = {job.link} target = "_blank">
            <p>{job.title}<br/>{job.company}</p>
            </a>
            <p>Looking for: {job.keyWords.map((kw) => <li>{kw + ", "}</li>) }</p>
            <p>{job.location}</p>
        </div>
    )
}