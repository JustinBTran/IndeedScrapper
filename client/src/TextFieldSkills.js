import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable'
import './TextFieldSkills.css'

const options = [
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'C++', label: 'C++' },
  { value: 'C#', label: 'C#' },
  { value: 'Objective C', label: 'Objective C' },
  { value: 'Angular', label: 'Angular.js' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'React', label: 'React.js' },
  { value: 'Angular', label: 'Angular.js' },
  { value: 'Git', label: 'Git' },
  { value: 'Typescript', label: 'Typescript' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Angular', label: 'Angular.js' },
  { value: 'Swift', label: 'Swift' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Excel', label: 'Excel' }
]

export default class DropdownInput extends Component {

    render() {
      var changeSkills = this.props.changeSkills
        return (
         <div className="dropdown">
            <CreatableSelect options={options} 
            formatCreateLabel={(inputText) => `"${inputText}"`}
            isMulti
            placeholder = "Skills (Minimum 1)"
            maxMenuHeight={240}
            onChange = {changeSkills}
            
            />
      </div>
    )
  }
}