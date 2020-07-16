import React, { Component } from "react";
import "./style.css";
import { data } from "../Data.js";
import VideoPlayer from "./VideoPlayer.js";

class Player extends Component {
	state = {
		videoData: {},
		videoIndex: 0,
		showDetails: false,
		swipeDirection: "up"
	}

	componentDidMount() {

		// Initial video data to play
		this.setState({
			videoData: data && data[this.state.videoIndex]
		});
	}

	// Handling swipe directions
	handleChange = (val) => {
		let videolist = data;

		if (videolist && videolist.length) {

			// Changing video accoding to swipe up and down
			if(val === "up" || val === "down"){
				let currentVideoIndex = this.state.videoIndex,
				changedVideoIndex,
				newData;

				if (val === "up")
					changedVideoIndex = currentVideoIndex + 1;
				else if( val === "down")
					changedVideoIndex = currentVideoIndex - 1;

				changedVideoIndex  = (changedVideoIndex < 0 || changedVideoIndex > videolist.length) ? 0 :changedVideoIndex;

				newData = videolist[changedVideoIndex];
				this.setState({
					videoData: newData,
					videoIndex: changedVideoIndex,
					swipeDirection : val
				});

			}else if(val === "left" || val === "right"){

				// Handling swipe left and right to show details
				let _details = (val === "left") ? true :false;
				this.setState({
					showDetails: _details
				});
			}
		} else {
			alert("No Video")
		}
	}

	// Handling mouse events for swiping
	handleMouseEvents = (e,type) => {
		let thresholdValue = 80,
			restraintValue = 60,
			swipeDirection = "";
		if(type === "down"){
			this.downPageX = e.pageX;
			this.downPageY = e.pageY;
		}
		if(type === "up"){

			this.upPageX = e.pageX;
			this.upPageY = e.pageY;
			let distX = this.downPageX - this.upPageX;
			let distY = this.upPageY - this.downPageY;

			if( Math.abs(distX) >= thresholdValue && Math.abs(distY) <= restraintValue ){
				swipeDirection = distX < 0 ? "right" : "left";
			}else if( Math.abs(distY) >= thresholdValue && Math.abs(distX) <= restraintValue ){
				swipeDirection = distY  < 0 ? "up" : "down";
			}
			
			// Handling swipe directions
			this.handleChange(swipeDirection);
		}
	}
  
	render() {
		return (
			<div className="container">
				<VideoPlayer 
					data = {this.state.videoData} 
					handleChange = { this.handleChange}
					handleMouseEvents = {this.handleMouseEvents}
					showDetails = {this.state.showDetails}
					swipeDirection = {this.state.swipeDirection}
				/>
			</div>
		);
	}
}
export default Player;