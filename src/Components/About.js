import React from "react";
import UserFunction from "./UserFunction";
import UserClass from "./UserClass";

class About extends React.Component{
    constructor(props) {
        super(props)
        // console.log("Parent Constructor");
    }
    componentDidMount(){
        // console.log("Parent component did mount")
    }
    render() {
        // console.log("Parent render");
        return (
          <>
            <h1>About Page</h1>
            <UserClass name={"First class"} />
          </>
        );
    }
}

// const About = () => {
//     return (
//         <>
//             <h1>About Page</h1>
//             {/* <UserFunction name={"Ram function"} /> */}
//             <UserClass name={"Ram class"} />
//         </>
//     )
// };

export default About;