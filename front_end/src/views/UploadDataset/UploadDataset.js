import React,{useState} from 'react'
import axios from 'axios'
function UploadDataset() {
   const [state, setstate] = useState({name:"",length:"",type:"",points:"",description:"",files:[]})
    const [total, setTotal] = useState(0)
    const onSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData()
        console.log(state.files)
        formData.set('type',state.type)
        formData.set('name',state.name)
        formData.set('description',state.description)
        formData.set('points',state.points)
        formData.set('length',state.length)

        //hedha pour le moment khalito statique
        formData.set('labels','1') // riguelhom baad kif tzid win bech yhot l labels taa dataset li possible
        
        Array.from(state.files).forEach(file=>{
            formData.append('files',file)
        })
        console.log(state)
        //appel au backend 
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            //upload files to bakend , create new dataset 
            axios({
            method: 'post',
            url: 'http://localhost:5000/api/datasets/upload',
            config: { headers: { 'Content-Type': 'multipart/form_data' } },
            data:formData
            })
            .then((res) => {
                if (res.data.success) {
            
                console.log("data : ", res.data)
                }
                else {
                console.log("data error : ", res.data)
                }
            })
            .catch(e => {
                console.log("erreur : ", e)
            })

    }
    //fct w7adha khater chnaccedi l target.files et non pas target.value
    const onChangeFile = (e)=>{
        setstate({
            ...state,
            files:e.target.files
        })
        setTotal(e.target.files.length)
    }

    const onChange=(e)=>{
        console.log(e.target)
        const {id,value} = e.target
        console.log(id,value)
        setstate({
            ...state,
            [id]:value
        })

    }
    return (
        
      <form onSubmit={onSubmit}>

          <div className="form-group">
            <label htmlFor="Dataset Name">Dataset Name</label>
            <input type="text" onChange={onChange} className="form-control" id="name" aria-describedby="emailHelp"/>
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <input type="text" onChange={onChange} className="form-control" id="type" aria-describedby="emailHelp" />
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <input type="text" onChange={onChange} className="form-control" id="description" aria-describedby="emailHelp" />
          </div>

          <div className="form-group">
            <label htmlFor="length">length of dataset</label>
            <input type="text" onChange={onChange} className="form-control" id="length" aria-describedby="emailHelp" />
          </div>

          <div className="form-group">
            <label htmlFor="points">Points for each row</label>
            <input type="text" onChange={onChange} className="form-control" id="points" aria-describedby="emailHelp" />
          </div>

          <div className="custom-file">
            <label className="custom-file-label" htmlFor="customFile">{total}</label>
            <input type="file" onChange={onChangeFile} className="custom-file-input" id="customFile"  multiple/>
          </div>
        <input type="submit" value="upload" className="btn-btn-primary"/>
      </form>
        
    )
}

export default UploadDataset
