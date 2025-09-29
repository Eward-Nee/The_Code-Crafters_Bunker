import { useEffect, useState } from "react"
import "./general.css"
import "./Projects.css"
import HTML from "./projectTypes/projectHTML"
import CSS from "./projectTypes/projectCSS"
import JS from "./projectTypes/projectJS"
import FEL from "./projectTypes/projectFrontEndLibs"
import { useDispatch } from "react-redux"
import { actionPage } from "./reducers"
import DV from "./projectTypes/projectDataVisualization"
import RD from "./projectTypes/projectRelationalDatabases"

function Projects() {
    const [projectIndex, setProjectIndex] = useState(0)
    const dispatch = useDispatch()

    function handleProjectIndex(event) {
        if (event.target.id == "HTML") {
            setProjectIndex(1)
            dispatch(actionPage.switchPage(null))
        } else if (event.target.id == "CSS") {
            setProjectIndex(2)
            dispatch(actionPage.switchPage(null))
        } else if (event.target.id == "JS") {
            setProjectIndex(3)
            dispatch(actionPage.switchPage(null))
        } else if (event.target.id == "FEL") {
            setProjectIndex(4)
            dispatch(actionPage.switchPage(null))
        } else if (event.target.id == "DV") {
            setProjectIndex(5)
            dispatch(actionPage.switchPage(null))
        } else if (event.target.id == "RD") {
            setProjectIndex(6)
            dispatch(actionPage.switchPage(null))
        } else {
            setProjectIndex(0)
        }
    }

    useEffect(() => {
        addEventListener("click", (event) => {

            if (!event.target.parentElement.attributes.id && !event.target.parentElement.parentElement.attributes.id) {
                if (event.target.tagName == "A" || event.target.tagName == "LI") {
                    if (event.target.attributes.class.value != "decLess") {
                        handleProjectIndex(event)
                    }
                }
            } else {
                if (event.target.children[0]) {
                    event.target.children[0].click()
                }
            }

        })

        return () => {
            removeEventListener("click", (event) => {
                if (!event.target.parentElement.attributes.id && !event.target.parentElement.parentElement.attributes.id) {
                    if (event.target.tagName == "A" || event.target.tagName == "LI") {
                        if (event.target.attributes.class.value != "decLess") {
                            handleProjectIndex(event)
                        }
                    }
                } else {
                    event.target.children[0].click()
                }

            })
        }
    }, [])


    function defualt() {

        return (
            <div className="projectsContainer">
                <div id="funProjects">

                    <h2>Fun Projects:</h2>

                    <a href="https://eward-nee.github.io/Eward-calc1.github/" className="link" target="_blank">My first calculator app</a> <br />
                    <a href="https://eward-nee.github.io/Number-guess-1.io/" className="link" target="_blank">My first game (number guessing
                        game.)</a> <br />
                    <a href="https://eward-nee.github.io/Stopwatch/" className="link" target="_blank">My first Stopwatch</a> <br />
                    <a href="https://eward-nee.github.io/Calcu_v2/" className="link" target="_blank">My second calculator</a> <br />
                    <a href="https://eward-nee.github.io/Rock_paper_scissors/" className="link" target="_blank">My Rock, paper, scissors
                        game.</a> <br />




                </div>

                <div id="learningProjects">

                    <h2>Learning Projects:</h2>

                    <h3>Free code camp full stack (beta) projects:</h3>
                    <ul>
                        <li className="decLess"><a className="link" id="HTML">HTML</a></li>
                        <li className="decLess"><a className="link" id="CSS">CSS</a></li>
                    </ul>

                    <h3>General Free code camp projects:</h3>
                    <ul>
                        <li className="decLess"><a className="link" id="JS">JS</a></li>
                        <li className="decLess"><a className="link" id="FEL">Front end libraries</a></li>
                        <li className="decLess"><a className="link" id="DV">Data visualization</a></li>
                        <li className="decLess"><a className="link" id="RD">Relational databases</a></li>
                    </ul>
                </div>

                <div id="workProjects">

                    <h2>Work Projects:</h2>

                    <p>🚫Under construction🚫</p>
                    <p>Work in progress...</p>

                </div>
            </div>
        )
    }

    function show() {
        if (projectIndex == 0) {
            return defualt()
        } else if (projectIndex == 1) {
            return (
                <>
                    <HTML />
                </>
            )
        } else if (projectIndex == 2) {
            return (
                <>
                    <CSS />
                </>
            )
        } else if (projectIndex == 3) {
            return (
                <>
                    <JS />
                </>
            )
        } else if (projectIndex == 4) {
            return (
                <>
                    <FEL />
                </>
            )
        } else if (projectIndex == 5) {
            return (
                <>
                    <DV />
                </>
            )
        } else {
            return (
                <>
                    <RD />
                </>
            )
        }
    }

    return (
        show()
    )
}

export default Projects