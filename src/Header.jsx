import { useSelector, useDispatch } from "react-redux"
import "./general.css"
import { actionPage } from "./reducers"
import { useEffect } from "react"

function Header() {
    const dispatch = useDispatch()
    const pageIndex = useSelector((state) => state.page.pageIndex)

    useEffect(() => {
        addEventListener("click", (event) => {
            if (event.target.classList[1] == "navItem") {
                dispatch(actionPage.switchPage(String(event.target.id).slice(-1)))
            }
        })

        return () => {
            removeEventListener("click", (event) => {
                if (event.target.classList[1] == "navItem") {
                    dispatch(actionPage.switchPage(String(event.target.id).slice(-1)))
                }
            })
        }
    }, [])


    return (
        <>
            <nav>
                <ul className="decLess nav">
                    <li id="nav0" className={pageIndex == 0 ? "inUP navItem" : "clear navItem"}>Home</li>
                    <li id="nav1" className={pageIndex == 1 ? "inUP navItem" : "clear navItem"}>Projects</li>
                    <li id="nav2" className={pageIndex == 2 ? "inUP navItem" : "clear navItem"}>Certificates</li>
                    <li id="nav3" className={pageIndex == 3 ? "inUP navItem" : "clear navItem"}>Comments</li>
                </ul>
            </nav>
        </>
    )
}

export default Header