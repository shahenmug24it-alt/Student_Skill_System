import axios from "axios";
import { useState } from "react";
import "../App.css";

const MentorDashboard = () => {

    const [students, setStudents] = useState([]);
    const [progressList, setProgressList] = useState([]);

    const [studentid, setStudentid] = useState("");
    const [progressid, setProgressid] = useState("");
    const [progress, setProgress] = useState("");

    const viewStudents = () => {
        axios.get("http://localhost:8000/users")
            .then((result) => {
                setStudents(result.data);
            });
    };
    const viewProgress = () => {
        axios.get("http://localhost:8000/progress")
            .then((result) => {
                setProgressList(result.data);
            });
    };
    const addProgress = () => {
        axios.post("http://localhost:8000/progress", {
            progressid: progressList.length + 1,
            studentid: Number(studentid),
            progress: Number(progress)
        })
        .then((result) => {
            alert(result.data.message);
            setStudentid("");
            setProgress("");
            viewProgress();

        });
    };
    const updateProgress = () => {
        axios.put("http://localhost:8000/progress", {
            progressid: Number(progressid),
            progress: Number(progress)
        })
        .then((result) => {
            alert(result.data.message);
            setProgressid("");
            setProgress("");
            viewProgress();
        });
    };
    const deleteProgress = () => {
        axios.delete("http://localhost:8000/progress", {
            data: {
                progressid: Number(progressid)
            }
        })
        .then((result) => {
            alert(result.data.message);
            setProgressid("");
            viewProgress();
        });
    };
    return (
        <div className="dashboard">
            <h1>Mentor Dashboard</h1>
            <div className="section">
                <h2>Students</h2>
                <button onClick={viewStudents}>
                    View Students
                </button>

                {students.map((student) => (

                    <div className="card" key={student.studentid}>

                        <p>
                            <b>Student ID:</b> {student.studentid}
                        </p>

                        <p>
                            <b>Name:</b> {student.studentname}
                        </p>

                    </div>

                ))}

            </div>


            <div className="section">

                <h2>Add Progress</h2>

                <input
                    type="number"
                    placeholder="Student ID"
                    value={studentid}
                    onChange={(e) => setStudentid(e.target.value)}
                />

                <br />

                <input
                    type="number"
                    placeholder="Progress %"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                />

                <br />

                <button onClick={addProgress}>
                    Add Progress
                </button>

            </div>


            <div className="section">

                <h2>Update / Delete Progress</h2>

                <input
                    type="number"
                    placeholder="Progress ID"
                    value={progressid}
                    onChange={(e) => setProgressid(e.target.value)}
                />

                <br />

                <input
                    type="number"
                    placeholder="New Progress %"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                />

                <br />

                <button onClick={updateProgress}>
                    Update Progress
                </button>

                <button onClick={deleteProgress}>
                    Delete Progress
                </button>

            </div>


            <div className="section">

                <h2>All Progress</h2>

                <button onClick={viewProgress}>
                    View Progress
                </button>

                {progressList.map((item) => (

                    <div className="card" key={item.progressid}>

                        <p>
                            <b>Progress ID:</b> {item.progressid}
                        </p>

                        <p>
                            <b>Student ID:</b> {item.studentid}
                        </p>

                        <p>
                            <b>Progress:</b> {item.progress}%
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );
};

export default MentorDashboard;