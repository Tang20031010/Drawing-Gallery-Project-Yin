// Import necessary modules and hooks
import axios from 'axios';
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Update = () => {
    // State variables to store the drawing data and image file
    const [drawing, setDrawing] = useState({
        title: "",
        description: "",
    });
    const [file, setFile] = useState("")
    const [error, setError] = useState(false)

    // Hook to handle navigation and get the current location
    const navigate = useNavigate()
    const location = useLocation()
    // Extract the drawing ID from the current URL path
    const drawingId = location.pathname.split("/")[2];
    // Event handler to update the drawing state on input change
    const handleChange = (e) =>{
        setDrawing((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    // Event handler to update the file state when an image is selected
    const handleImage = (e)=>{
        setFile(e.target.files[0])
    }
    // Event handler to submit the form and update the drawing
    const handleClick = async (e) =>{
        e.preventDefault()
        // Create a new FormData object and append form data and the selected image to it
        const formData = new FormData()
        formData.append("title", drawing.title)
        formData.append("description", drawing.description)
        formData.append("pic", file)

        // Set the request headers for file upload
        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        try{
            // Send a PUT request to the backend to update the drawing data and image
            await axios.put("http://localhost:666/drawings/" + drawingId, formData, config)
            // Navigate back to the home page after successful update
            navigate("/")
        }catch(err){
            console.log(err);
            setError(true)
        }
    }
    
    // Render the update drawing form
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <h1>Update this drawing</h1>
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

                <Button variant = "btn btn-outline-primary" type = "submit" onClick={handleClick}>Upload</Button>
                {error && "Wrong, Please fill the details"}
                <Link to="/">See all drawings</Link>
            </Form>
        </div>
    )
}

export default Update;
