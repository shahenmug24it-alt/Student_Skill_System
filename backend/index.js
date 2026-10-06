const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/StudentSkill")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log( error));

app.use(express.json());
app.use(cors());


const userSchema = new mongoose.Schema({
    studentid: {type:Number, required: true,unique:true},
    studentname: {type:String, required: true},
    password: {type:String, required:true}
});
const User = mongoose.model("User", userSchema);

const skillSchema = new mongoose.Schema({
    skillid: {type: Number,required: true,unique: true},
    skillname: {type: String,required: true},
    studentid: {type: Number, required: true}
});
const Skill = mongoose.model("Skill", skillSchema);

const progressSchema = new mongoose.Schema({
    progressid: {type: Number,required: true,unique: true},
    studentid: {type: Number,required: true},
    progress: {type: Number,required: true}
});

const Progress = mongoose.model("Progress", progressSchema);

const mentorSchema = new mongoose.Schema({
    mentorid: {type: Number,required: true,unique: true},
    mentorname: {type: String,required: true},
    password: {type: String,required: true}
});
const Mentor = mongoose.model("Mentor", mentorSchema);

//mentor details
app.post("/mentors", (req, res) => {

    const { mentorid, mentorname, password } = req.body;
    const newMentor = new Mentor({
        mentorid: mentorid,
        mentorname: mentorname,
        password: password
    });
    newMentor.save()
        .then(() => {
            res.send({
                success: true,
                message: "Mentor Created"})})
        .catch((error) => res.send(error));
});

//mentor login
app.post("/mentor-login", async (req, res) => {
    const { mentorid, password } = req.body;
    const mentor = await Mentor.findOne({
        mentorid: mentorid,
        password: password});
    if (mentor) {
        res.send({success: true,message: "Mentor Login Successful"});
    } else {
        res.send({
            success: false,message: "Invalid"});
    }
});

//Mentor Signout
app.post("/mentor-signout", (req, res) => {
    res.send({
        success: true,
        message: "Mentor Signout Successful"
    });
});

//progress Details
app.post("/progress", (req, res) => {

    const { progressid, studentid, progress } = req.body;

    const newProgress = new Progress({
        progressid: progressid,
        studentid: studentid,
        progress: progress
    });
    newProgress.save()
        .then(() => {
            res.send({success: true,
                message: "Progress Created"})})
        .catch((error) => res.send(error));

});
app.get("/progress", (req, res) => {
    Progress.find()
        .then((users)=>res.send(users))
        .catch((error)=>res.send(error));
});

app.put("/progress", (req, res) => {
    const { progressid, progress } = req.body;
    Progress.updateOne(
        { progressid: progressid },
        {
            $set: {
                progress: progress
            }
        }
    )
    .then(() => res.send({ success: true, message: "Updated" }))
    .catch((error) => res.send(error));
});
app.delete("/progress", (req, res) => {
     const { progressid } = req.body;
    Progress.deleteOne({ progressid: progressid })
        .then(() => res.send({ success: true, message: "Deleted" }))
        .catch((error) => res.send(error));
});


//Skill Details
app.post("/skills",(req,res)=>{
    const{skillid,skillname,studentid} = req.body;
    const newSkill = new Skill({
        skillid: skillid,
        skillname: skillname,
        studentid: studentid
    });
    newSkill.save()
        .then(() => {res.send({success: true,
                message: "Skill Created"})})
            .catch((error) => res.send(error));
});
app.get("/skills", (req, res) => {
    Skill.find()
        .then((users)=>res.send(users))
        .catch((error)=>res.send(error));
});
app.put("/skills", (req, res) => {
    const { skillid, skillname } = req.body;
    Skill.updateOne(
        { skillid: skillid },
        {
            $set: {
                skillname: skillname
            }
        }
    )
    .then(() => res.send({ success: true, message: "Updated" }))
    .catch((error) => res.send(error));
});

app.delete("/skills", (req, res) => {
     const { skillid } = req.body;
    Skill.deleteOne({ skillid: skillid })
        .then(() => res.send({ success: true, message: "Deleted" }))
        .catch((error) => res.send(error));
});
//student Login
app.post("/student-login", async (req, res) => {
    const { studentid, password } = req.body;
    const student = await User.findOne({
        studentid: studentid,
        password: password
    });
    if (student) {
        res.send({
            success: true,
            message: "Student Login Successful"
        });
    } else {
        res.send({
            success: false,
            message: "Invalid Student ID or Password"
        });
    }
});

//Student Signout
app.post("/student-signout", (req, res) => {
    res.send({
        success: true,
        message: "Student Signout Successful"
    });
});

//students details
app.post("/users",async (req,res)=>{
    const { studentid, studentname, password } = req.body;
    const newStudent = new User({
        studentid: studentid,
        studentname: studentname,
        password: password
    });
    newStudent.save()
        .then(() => {res.send({success: true,
                message: "Student Created"})})
            .catch((error) => res.send(error));
});

app.get("/users", (req, res) => {
    User.find()
        .then((users)=>res.send(users))
        .catch((error)=>res.send(error));
});

app.put("/users", (req, res) => {
    const { studentid, studentname } = req.body;
    User.updateOne(
        { studentid: studentid },
        {
            $set: {
                studentname: studentname
            }
        }
    )
    .then(() => res.send({ success: true, message: "Updated" }))
    .catch((error) => res.send(error));
});

app.delete("/users", (req, res) => {
     const { studentid } = req.body;
    User.deleteOne({ studentid: studentid })
        .then(() => res.send({ success: true, message: "Deleted" }))
        .catch((error) => res.send(error));
});

app.listen(8000, (error) => {
    if (error) throw error;
    console.log("Server started")
});