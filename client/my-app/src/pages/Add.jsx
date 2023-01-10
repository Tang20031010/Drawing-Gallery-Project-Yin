import axios from "axios"
import React from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Add = () => {
    const [drawing, setDrawing] = useState({
        title:"",
        description:""
    });

    const [file, setFile] = useState("")

    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setDrawing((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleImage = (e)=>{
        setFile(e.target.files[0])
    }

    const handleClick = async (e) =>{
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", drawing.title)
        formData.append("description", drawing.description)
        formData.append("pic", file)

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        try{
            const res = await axios.post("http://localhost:666/drawings", formData, config)
            if(res.data.status === 201){
                navigate("/")
            }else{
                console.log("error")
            }
        }catch(err){
            console.log(err)
            setError(true)
        }
    }
    
    
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Upload new drawing</h1>
            <Form>
                <Form.Group className = "mb-3" controlId="">
                    <Form.Label>Title for the Drawing</Form.Label>
                    <Form.Control type = "text" placeholder="title" onChange = {handleChange} name = "title" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description for the Drawing</Form.Label>
                    <Form.Control type = "text" placeholder="description" onChange = {handleChange} name = "description" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Select your Drawing</Form.Label>
                    <Form.Control type = "file" accept = "image/*"  placeholder="pic" onChange = {handleImage} name = "pic" />
                </Form.Group>

                <Button variant = "primary" type = "submit" onClick={handleClick}>Upload</Button>
                {error && "Wrong, please fill the details"}
                <Link to="/">See all drawings</Link>
            </Form>
        </div>
    )
}

export default Add
