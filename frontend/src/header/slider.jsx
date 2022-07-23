import React from 'react'

export default function Slider() {
    return (
        <div className="slider">
            <div className="container">

                <div data-am-fadeshow="next-prev-navigation">

                    <input type="radio" name="css-fadeshow" id="slide-1" />
                    <input type="radio" name="css-fadeshow" id="slide-2" />
                    <input type="radio" name="css-fadeshow" id="slide-3" />

                    <div className="fs-slides">
                        <div className="fs-slide" style="background-image: url(https://images.unsplash.com/photo-1460500063983-994d4c27756c?crop=entropy&fit=crop&fm=jpg&h=1325&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=2550);">

                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-family: sans-serif; text-align: center; text-shadow: 0 0 20px rgba(0,0,0,0.5);">
                                <h1 style="margin-top: 0; margin-bottom: 0.8vw; font-size: 5vw; font-weight: bold;">CSS Fadeshow</h1>
                                <p style="font-size: 2vw; font-weight: 100; margin-top: 0;">Easy to implement and use on <strong>your</strong> site!</p>
                            </div>
                        </div>
                        <div className="fs-slide" style="background-image: url(https://images.unsplash.com/photo-1440557653082-e8e186733eeb?crop=entropy&fit=crop&fm=jpg&h=1325&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=2500);"></div>
                        <div className="fs-slide" style="background-image: url(https://images.unsplash.com/photo-1449057528837-7ca097b3520c?crop=entropy&fit=crop&fm=jpg&h=1325&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=2500);"></div>
                    </div>

                    <div className="fs-quick-nav">
                        <label className="fs-quick-btn" for="slide-1"></label>
                        <label className="fs-quick-btn" for="slide-2"></label>
                        <label className="fs-quick-btn" for="slide-3"></label>
                    </div>

                    <div className="fs-prev-nav">
                        <label className="fs-prev-btn" for="slide-1"></label>
                        <label className="fs-prev-btn" for="slide-2"></label>
                        <label className="fs-prev-btn" for="slide-3"></label>
                    </div>

                    <div className="fs-next-nav">
                        <label className="fs-next-btn" for="slide-1"></label>
                        <label className="fs-next-btn" for="slide-2"></label>
                        <label className="fs-next-btn" for="slide-3"></label>
                    </div>

                </div>

            </div>
        </div>
    );
}