import React from 'react'





function Request() {
    const axios = require('axios').default;

    const resp=axios.get('/result', {
        params: {
          ID: 1
        }
      })
      .then(function (response) {
       // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    return (
        <div>
            {resp}
        </div>
    )
}

export default Request
