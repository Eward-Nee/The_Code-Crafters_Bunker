import { useDispatch } from "react-redux";
import myImg from "./assets/me.jpeg"
import "./home.css"
import { useEffect } from "react";
import { actionPage } from "./reducers";

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        addEventListener("click", (event) => {
            if (event.target.id == "toComments") {
                dispatch(actionPage.switchPage(3))
            }
        })

        return () => {
            removeEventListener("click", (event) => {
                if (event.target.id == "toComments") {
                    dispatch(actionPage.switchPage(3))
                }
            })
        }
    }, [])


    return (
        <div className="main">

            <aside>

                <h3>Why a total redo?:</h3>

                <p>
                    Well, I love to redo projects I made that is not perfect.
                    It helps me to improve my skills when I do a project over and over again.
                    I don't believe in a perfect project, thus I redo projects.
                    There will always be something wrong, therefore will there always be something to improve.
                    <br /><br />
                    I believe that a programmer is as much worth as his website, so I will always
                    do my best to try and make my website look as good as possible. You can expect many redos
                    of my website, because I'm am still in the process of learning to become a web-developer.
                    I will be adding new features as I learn them
                    <br /><br />
                    I guess what I am trying to say is that you must please stay tuned as I learn
                    new skills and put them to practise on my website.
                </p>

            </aside>

            <section>

                <h3>Short overview:</h3>

                <p>
                    Hi, I am Eward van Niekerk. <br />
                    I am the sole developer of this website. I am 19 years old and recently started learning
                    web-development. This Website is made because I love coding and I want to share that love
                    and passion with you, the viewer of this website.
                    <br />
                    <br />
                    Noticed the navigation bar? <br />
                    Noticed the tabs? <br />
                    I am going to explain what you can expect on each tab:
                    <br /><br />
                    <b>The Home tab:</b> <br />
                    This is the home tab. This tab will contain a short description of every other tab, including this tab.
                    <br /><br />
                    <b>The Projects tab:</b><br />
                    This tab will contain links to some of my project repos on my github account so that you can check them
                    out, that is if
                    you want to. Some of my projects is hosted on github via github pages.
                    <br /><br />
                    <b>The Certificates tab:</b><br />
                    This tab will contain all my certificates that I have.
                    <br /><br />
                    <b>The Comments tab:</b><br />
                    This tab will contain a comment section where you can leave comments and advice for me.
                    (Please note that this tab is not working at this moment)
                    <br /><br />
                    And that is it. I hope you have a good time viewing my website.

                </p>

            </section>

            <article id="art">

                <a href={myImg} target="_blank"><img src={myImg} alt="a image of Eward." /></a>

            </article>
        </div>
    )
}

export default Home