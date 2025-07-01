import { useEffect, useState } from "react";
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




  return (
    <div className="page">
      <Header />
      <div className="midPage">
        <br />
        {pageCode}
        <br />
      </div>
      <Footer />
    </div>
  )
}

export default App
