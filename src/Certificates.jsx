import { useSelector, useDispatch } from "react-redux";
import "./Certificates.css"
import CSSimg from "/CSScert.png"
import HTMLimg from "/HTMLcert.png"
import JSimg from "/JScert.png"
import FELimg from "/FELcert.png"
import DVimg from "/DVcert.png"

function Certificates() {

    const arrObjCards = [{
        link: "https://coursera.org/verify/Y9JEMP9XD6DB",
        source: HTMLimg,
        altText: "a Image of my HTML certification",
        caption: "My HTML certification"
    }, {
        link: "https://coursera.org/verify/JX0WK3CS54M6",
        source: CSSimg,
        altText: "a Image of my CSS certification",
        caption: "My CSS certification"
    }, {
        link: "https://www.freecodecamp.org/certification/fccdcac8782-0069-4258-9e7a-765911922d49/javascript-algorithms-and-data-structures-v8",
        source: JSimg,
        altText: "a Image of my JS certification",
        caption: "My JS certification"
    }, {
        link: "https://www.freecodecamp.org/certification/fccdcac8782-0069-4258-9e7a-765911922d49/front-end-development-libraries",
        source: FELimg,
        altText: "a Image of my Front end libraries certification",
        caption: "My Front end libraries certification"
    }, {
        link: "https://www.freecodecamp.org/certification/fccdcac8782-0069-4258-9e7a-765911922d49/data-visualization",
        source: DVimg,
        altText: "a Image of my Data Visualization certification",
        caption: "My data visualization certification"
    }]

    const cardElements = arrObjCards.map((card, index) => (
        <a key={index} href={card.link} target="_blank">
            <div className="img-container">
                <img src={card.source} alt={card.altText} />
            </div>
            {card.caption}
        </a>
    ))

    return (
        <>
            <div class="container">

                <div class="cards">
                    {cardElements}
                </div>
            </div>
        </>
    )
}

export default Certificates