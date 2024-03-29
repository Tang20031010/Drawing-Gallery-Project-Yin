// Import required modules and set up middleware
import express, { Router } from "express"
import mysql from "mysql"
import cors from "cors"
import multer from "multer"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("./uploads"))

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ChengFei@520",
    database:"test"
})

// Configure multer to handle image uploads
var imgConfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, "/Users/lvshulan/Desktop/DrawingWebsiteYin/client/my-app/public")
    },
    filename: function (req, file, callback) {
        callback(null,file.originalname)
    }
})


// Filter function to accept only image files
const imageFilter = (req, file, callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null, Error("Image upload only"))
    }
}

var upload = multer({
    storage: imgConfig,
    fileFilter: imageFilter
})



// If there is authentication problem
//DO:  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Tang000';

// Route for the root endpoint
app.get("/", (req, res)=>{
    res.json("Backend!")
})

// Route to get all drawings from the database
app.get("/drawings",(req,res)=>{
    try{     
        const q = "SELECT * FROM drawings"
        db.query(q, (err,result)=>{
            if(err){
                console.log("error")
            }else{
                console.log("Get image and data")
                return res.status(201).json({status: 201, data: result})
            }
        })
    } catch (error){
        console.log("Exception!")
        res.status(422).json({status: 422, error})
    }
})

// Route to add a new drawing to the database
app.post("/drawings",upload.single("pic"),(req, res)=>{
    console.log("test")
    const q = "INSERT INTO drawings (`title`, `description`, `pic`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.description,
        req.file.filename
    ]

    if(!req.body.title||!req.body.description||!req.file){
        res.status(422).json({status: 422, message:"fill the details"})
    }
    try{
        db.query(q, [values],(err, data)=>{
            if(err) {
                res.send(err)
            }else{
                console.log("Image uploaded")
                return res.status(201).json({status: 201, data: req.body})
            }
        })
    }catch(error){
        res.status(422).json({status: 422, error})
    }
})

// Route to delete a drawing from the database
app.delete("/drawings/:id", (req, res)=>{
    const drawingId = req.params.id;
    const q = "DELETE FROM drawings WHERE id = ?"
    try{
    db.query(q, [drawingId], (err, result)=>{
        if (err) {
            console.log("error")
        }else{
            console.log("Image Deleted")
            return res.json({status: 201, data:result})
        }
    })
    } catch(error){
        res.status(422).json({status: 201, error})
    }
})

// Route to update a drawing in the database
app.put("/drawings/:id",upload.single("pic"),(req, res)=>{
    const drawingId = req.params.id;
    const q = "UPDATE drawings SET `title` = ?, `description` = ?, `pic` = ? WHERE id = ?";

    if(!req.body.title||!req.body.description||!req.file){
        res.status(422).json({status: 422, message:"fill the details"})
    }

    const values = [
        req.body.title,
        req.body.description,
        req.file.filename
    ]

    db.query(q, [...values, drawingId], (err, result)=>{
        if(err) {
            return res.json(err);
        }else{
            console.log ("data updated")
            res.status(201).json({status: 201, data: req.body})
        }
    });
})

// Start the server on port 666
app.listen(666, ()=>{
    console.log ("Connect to backend")
})