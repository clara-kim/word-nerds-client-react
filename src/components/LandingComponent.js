import React from "react";

/*
This is the landing component that acts as the home page.
It includes the word of the day and daily stats.
 */
const LandingComponent = () =>
    <div>
        {/* Word of the Day */}
        <div className="parallax" id="word-of-day">
            <h2 className="section-title">WORD OF THE DAY</h2>
            <div id="word-of-day-details">
                <h2 id="wod-word">inchoate</h2>
                <p id="wod-def">just begun and so not fully formed or developed; rudimentary.</p>
                <p id="wod-source">lexico.com</p>
            </div>
        </div>

        {/* Daily Stats */}
        <div className="parallax" id="word-stats">
            <h2 className="section-title">WORDLY HAPPENINGS</h2>
            <br/>
            <div className="row container-fluid">
                <div className="col-4">
                    <h3>Most Liked Words</h3>
                    <ol>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Dolor</li>
                        <li>Sit</li>
                        <li>Amet</li>
                    </ol>
                </div>
                <div className="col-4">
                    <h3>Rising Words</h3>
                    <ol>
                        <li>Consectetur</li>
                        <li>Adipiscing</li>
                        <li>Elit</li>
                        <li>Sed</li>
                        <li>Eiusmod</li>
                    </ol>
                </div>
                <div className="col-4">
                    <h3>Words To Explore</h3>
                    <ol>
                        <li>Consectetur</li>
                        <li>Adipiscing</li>
                        <li>Elit</li>
                        <li>Sed</li>
                        <li>Eiusmod</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

export default LandingComponent
