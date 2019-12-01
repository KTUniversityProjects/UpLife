import React from "react";
import DisplayImage from "../common/DisplayImage.js";
import equal from "fast-deep-equal";

class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
    this.state = {
      index: 0,
      imgList: this.props.imgPaths
    };
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.imgPaths, prevProps.imgPaths)) {
      this.setState({
        index: 0,
        imgList: this.props.imgPaths
      });
    }
  }

  onImageClick() {
    if (this.state.index === this.state.imgList.length - 1) {
      this.setState({
        index: 0
      });
    } else {
      this.setState({
        index: this.state.index + 1
      });
    }
  }

  render() {
    return (
      <div>
        <DisplayImage
          src={this.state.imgList[this.state.index]}
          onClick={this.onImageClick}
        />
        <center>
          <p>
            <i>{this.props.info}</i>
          </p>
        </center>
      </div>
    );
  }
}

export default Picture;
