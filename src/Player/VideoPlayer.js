import React from "react";
import "./style.css";

// video created person details function
const Details = (details)=>{
    let { showDetails, data } = details;
    return (
        <div className="details">
            <div className={`info ${showDetails ? 'animAdd' : 'animRemove'}`}>
                <h3 className="title">Details</h3>
                <ul>
                    <li>{data.channel?.title}</li>
                    <li className="info_by">by</li>
                    <li className="infor_userName">{data.channel?.user.name}</li>
                </ul>
            </div>
        </div>
    )
}

// Video player function
const VideoPlayer = (props) => {
    let {data = {}, handleMouseEvents, showDetails, swipeDirection} = props;

    // Getting device width
    let MobileView = window.innerWidth <= 768 ? true: false;
    let animation = swipeDirection === 'up' ? 'videoTag1' : 'videoTag';

    return (
        <div className="main">
            { 
            // For desktop devices
            MobileView ? "" :<div className="display desktop">
                <video
                    className={animation}
                    autoPlay = {true}
                    src={data.video?.originalUrl}
                    poster={data.video?.coverImageUrl}
                    onMouseDown = {(e)=>handleMouseEvents(e,"down")}
                    onMouseUp ={(e)=>handleMouseEvents(e,"up")}
                    id="videoTag"
                >
                </video>
                <Details data = {data} showDetails = {showDetails} ></Details>
            </div>}
            
            {
            //For mobile devices
            MobileView ? <div className="display mobileView">
                <video
                    className={animation}
                    controls={true}
                    autoPlay = {true}
                    src={data.video?.originalUrl}
                    poster={data.video?.coverImageUrl}
                    onTouchStart = {(e)=>handleMouseEvents(e.changedTouches[0],"down")}
                    onTouchEnd ={(e)=>handleMouseEvents(e.changedTouches[0],"up")}
                >
                </video>
                <Details data = {data} showDetails = {showDetails} ></Details>
            </div>:""}
        </div>
    );
}

export default VideoPlayer;