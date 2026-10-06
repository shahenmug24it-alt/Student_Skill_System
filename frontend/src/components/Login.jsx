import { useState } from "react";
import axios from "axios";
import Home from "./Home";
import MentorDashboard from "./MentorDashboard";
import "../App.css";

const Login = () => {
    const [role, setRole] = useState("Student");
    const [id, setId] = useState("");
    const [password, setpassword] = useState("");
    const [page, setPage] = useState("login");

    const login = () => {

        if (role === "Student") {
            axios.post("http://localhost:8000/student-login", {
                studentid: Number(id),
                password: password
            })
            .then((result) => {
                alert(result.data.message);

                if (result.data.success) {
                    setPage("student");
                }
            });
        }

        if (role === "Mentor") {
            axios.post("http://localhost:8000/mentor-login", {
                mentorid: Number(id),
                password: password
            })
            .then((result) => {
                alert(result.data.message);

                if (result.data.success) {
                    setPage("mentor");
                }
            });
        }
    };

    if (page === "student") {
        return <Home studentid={Number(id)} />;
    }

    if (page === "mentor") {
        return <MentorDashboard />;
    }

    return (
        <div>
            <h1>Student Skill Progress System</h1>

            <h2>Login</h2>

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option>Student</option>
                <option>Mentor</option>
            </select>

            <br /><br />

            <input
                type="number"
                placeholder="Enter ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
            />

            <br /><br />

            <button onClick={login}>
                Login
            </button>
        </div>
    );
};

export default Login;