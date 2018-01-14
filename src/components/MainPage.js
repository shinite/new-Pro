import React from 'react';
import axios from 'axios';

export default class extends React.Component{
  state = {
    response : null
  }

  handleUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append('file', file);
    console.log(file,"FILLEEE");
    const that= this;
    axios.post('/fileUpload', formData)
      .then(function (response) {
        console.log(response);
        that.setState({response:  response.data})
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  render(){
    return (
      <div>
        <input type="file" onChange={this.handleUpload}/>
      <p>{this.state.response}</p>
      </div>
    )
  }
}
