import axios from "axios";
import { useState } from "react";
import "../App.css";
import Login from "./Login";
const Home = ({ studentid }) => {

    const [progress, setProgress] = useState([]);
    const [skills, setSkills] = useState([]);

    const [skillid, setSkillid] = useState("");
    const [skillname, setSkillname] = useState("");

    // VIEW PROGRESS
    const viewProgress = () => {

        axios.get("http://localhost:8000/progress")
            .then((result) => {

                const myProgress = result.data.filter(
                    (item) => item.studentid === studentid
                );

                setProgress(myProgress);

            });
    };

    // VIEW SKILLS
    const viewSkills = () => {

        axios.get("http://localhost:8000/skills")
            .then((result) => {

                setSkills(result.data);

            });
    };

    // ADD SKILL
    const addSkill = () => {

        axios.post("http://localhost:8000/skills", {

            skillid: Number(skillid),
            skillname: skillname

        })
        .then((result) => {

            alert(result.data.message);

            setSkillid("");
            setSkillname("");

            viewSkills();

        });
    };

    // UPDATE SKILL
    const updateSkill = () => {

        axios.put("http://localhost:8000/skills", {

            skillid: Number(skillid),
            skillname: skillname

        })
        .then((result) => {

            alert(result.data.message);

            setSkillid("");
            setSkillname("");

            viewSkills();

        });
    };

    // DELETE SKILL
    const deleteSkill = () => {

        axios.delete("http://localhost:8000/skills", {

            data: {
                skillid: Number(skillid)
            }

        })
        .then((result) => {

            alert(result.data.message);

            setSkillid("");
            setSkillname("");

            viewSkills();

        });
    };

    return (

        <div className="dashboard">

            <h1>Student Dashboard</h1>

            <div className="section">

                <h2>My Progress</h2>

                <button onClick={viewProgress}>
                    View My Progress
                </button>

                {progress.map((item) => (

                    <div className="card" key={item.progressid}>

                        <p>
                            <b>Progress:</b> {item.progress}%
                        </p>

                    </div>

                ))}

            </div>


            <div className="section">

                <h2>My Skills</h2>

                <button onClick={viewSkills}>
                    View My Skills
                </button>

                <h3>Add / Update / Delete Skill</h3>

                <input
                    type="number"
                    placeholder="Skill ID"
                    value={skillid}
                    onChange={(e) => setSkillid(e.target.value)}
                />

                <br />

                <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillname}
                    onChange={(e) => setSkillname(e.target.value)}
                />

                <br />

                <button onClick={addSkill}>
                    Add Skill
                </button>

                <button onClick={updateSkill}>
                    Update Skill
                </button>

                <button onClick={deleteSkill}>
                    Delete Skill
                </button>


                <h3>Skills List</h3>

                {skills.map((skill) => (

                    <div className="card" key={skill.skillid}>

                        <p>
                            <b>Skill ID:</b> {skill.skillid}
                        </p>

                        <p>
                            <b>Skill:</b> {skill.skillname}
                        </p>

                    </div>

                ))}

                

            </div>

        </div>

    );
};

export default Home;