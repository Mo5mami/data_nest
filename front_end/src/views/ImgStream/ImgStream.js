import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Stream from 'components/Stream/Stream';

import img from "assets/img/sidebar-3.jpg"


function ImgStream() 
{
  const [state, setstate] = useState({ })
  
  useEffect(() => {
    Axios
      .get("https://robwu.nl/cors-anywhere.html" ,
      {
        responseType: "blob"
      })
			.then(res => {
        //console.log(res.data)
        setstate(
          {
            ...state , 
            data:res.data
          })
          console.log("data : ",res.data)
        
			})
      
  }, [])
  

  const features=["1","2","0"] //baddal lenna
  const rowPrice=200 //baddal lenna
  const datasetPrice=22200 //baddal lenna

  

  return (
    <React.Fragment>

    
      <Stream features={features} rowPrice={rowPrice} datasetPrice={datasetPrice}>
        <img src={img} className="img-fluid" alt={img}/>
      </Stream>
    
    
    </React.Fragment>
  );
}
export default ImgStream;