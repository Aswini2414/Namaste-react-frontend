// class based components
import React from "react";
import axios from "axios";
class UserClass extends React.Component{
    constructor(props) {
        //super method refers to constructor of parent component
        super(props);
        this.state = {
          userInfo: {
            name: "Dummy",
            location:"Default"
          }
      };
      console.log(this.props.name + "constructor");
    }
  async componentDidMount() {
    const data = await axios.get("https://api.github.com/users/octocat");
    this.setState({
      userInfo: data.data
    });
    console.log(this.props.name +"componentDidMount");
  };
  componentDidUpdate() {
    console.log("component did update");
  }
  componentWillUnmount() {
    console.log("component will unmount");
  }
  render() {
    console.log(this.props.name+ "render");
        return (
          <div className="details">
            <h2>name:{this.state.userInfo.name}</h2>
            <h2>location:{this.state.userInfo.location}</h2>
          </div>
        );
    }
}

export default UserClass;
