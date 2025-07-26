import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import Footer from "./Footer";
import "./general.css"
import Header from "./Header";
import Home from "./Home";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Comments from "./Comments";

function App() {
  const pageIndex = useSelector((state) => state.page.pageIndex)
  const [pageCode, setPageCode] = useState(<Home />)
  const [pageScroll, setPageScroll] = useState(0)
  const [bMobile, setBMobile] = useState(false)
  const attrUpArrow = useRef()

  useEffect(() => {

    if (pageIndex == 0) {
      setPageCode(<Home />)
    } else if (pageIndex == 1) {
      setPageCode(<Projects />)
    } else if (pageIndex == 2) {
      setPageCode(<Certificates />)
    } else if (pageIndex == 3) {
      setPageCode(<Comments />)
    }

  }, [pageIndex])

  useEffect(() => {
    const handleScroll = () => {
      setPageScroll(window.scrollY);
    };

    function handleUpArrowClick(event) {
      let elem
      if (event.target.tagName == "path") {
        elem = event.target.parentElement
      } else {
        elem = event.target
      }

      if (elem.id == "upArrow") {
        window.scroll({
          top: 0,
          behavior: "smooth"
        })
      }
    }

    window.addEventListener("scroll", handleScroll);
    addEventListener("click", handleUpArrowClick)

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  useEffect(() => {
    if (window.scrollY > 200 && window.innerWidth < 1220) {
      setBMobile(true)
    } else {
      setBMobile(false)
    }
  }, [pageScroll])

  const upArrow = <svg ref={attrUpArrow} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" id="upArrow" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" /></svg>

  return (
    <div className="page">
      <Header />
      <div className="midPage">
        <br />
        {pageCode}
        <br />
      </div>
      <Footer />
      <div>
        {bMobile && upArrow}
      </div>
    </div>
  )
}

export default App
