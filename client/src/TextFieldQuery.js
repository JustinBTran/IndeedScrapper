import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable'
import './TextFieldQuery.css';



const options = [
  { value: 'junior developer', label: 'Junior Developer' },
  { value: 'software internship', label: 'Software Internship' },
  { value: 'senior developer', label: 'Senior Developer'},
  { value: 'frontend engineer', label: 'Frontend Engineer'},
  { value: 'fullstack engineer', label: 'Fullstack Engineer'},
  { value: 'backend engineer', label: 'Backend Engineer'},
  { value: 'summer analyst', label: 'Summer Analyst'},
  { value: 'data science', label: 'Data Science'},
  { value: 'data science internship', label: 'Data Science Internship'}
 
]


export default class QueryTextInput extends Component {

  
  render() {

    var changeOption = this.props.changeOption;
    return (
      <div className="field">
          <CreatableSelect options={options} 
            formatCreateLabel={(inputText) => `Custom Search "${inputText}"`}
            placeholder = "Job Type"
            maxMenuHeight={240}
            onChange = {changeOption}
            />
      </div>
    )
  }
}