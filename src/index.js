import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_details";
const API_KEY = "AIzaSyAmvA_sACIFT9v6T1iWnsK6IXyb6XSN4Eo";

// Create a new component. This component should produce
// some HTML
// "Fat Arrow" aka => replaces function
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.videoSearch("crypto");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({ videos: videos, selectedVideo: videos[0] });
      // this.setState({videos: videos}); ES6 replacement
    });
  }
  render() {
    const videoSearch = _.debounce((term) => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
