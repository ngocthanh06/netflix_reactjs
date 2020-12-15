import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else handleShow(false);
        });

        return () => {
            window.removeEventListener("scroll");
        }
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img 
                className="nav__logo"
                src="http://pngimg.com/uploads/netflix/netflix_PNG11.png"
                alt="Netflix Logo"
            />

            <img 
                className="nav__avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQbdqZcVyjfQzCo7qL0v_ost7c0MICgiTWg&usqp=CAU"
                alt="Netflix Log0"
            />
        </div>
    )
}

export default Nav;
