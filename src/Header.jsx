import { useSelector, useDispatch } from "react-redux"
import "./general.css"
import { actionPage } from "./reducers"
import { useEffect, useState } from "react"

function Header() {
    const dispatch = useDispatch()
    const pageIndex = useSelector((state) => state.page.pageIndex)
    const [theme, setTheme] = useState("light")

    function handleNavClick(event) {
        if (event.target.classList[1] === "navItem") {
            dispatch(actionPage.switchPage(String(event.target.id).slice(-1)))
        }
    }

    function handleThemeChange(event) {
        if (event.target.attributes.themechange) {
            setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
    }

    useEffect(() => {
        const root = document.documentElement
        root.setAttribute("dataTheme", theme)

        document.addEventListener("click", handleNavClick)
        document.addEventListener("click", handleThemeChange)

        return () => {
            document.removeEventListener("click", handleNavClick)
            document.removeEventListener("click", handleThemeChange)
            root.removeAttribute("dataTheme")
        };
    }, [theme])

    return (
        <div className="header">
            <nav>
                <ul className="decLess nav">
                    <li id="nav0" className={pageIndex == 0 ? "inUP navItem" : "clear navItem"}>Home</li>
                    <li id="nav1" className={pageIndex == 1 ? "inUP navItem" : "clear navItem"}>Projects</li>
                    <li id="nav2" className={pageIndex == 2 ? "inUP navItem" : "clear navItem"}>Certificates</li>
                    <li id="nav3" className={pageIndex == 3 ? "inUP navItem" : "clear navItem"}>Comments</li>
                </ul>
            </nav>
            <div style={{ position: "absolute", cursor: "pointer", top: "0", right: "20px", fontSize: "2em" }} themechange="true">
                {theme == "light" ? "☀️" : "🌘"}
            </div>
        </div>
    )
}

export default Header