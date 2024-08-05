//Functional components

import { useState } from "react";

const UserFunction = (props) => {
    const [count, setCount] = useState(0);
    return (
        <div className="details">
            <h2>count:{count}</h2>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <h2>name:{props.name}</h2>
            <h2>email:abc@gmail.com</h2>
        </div>
    )
};

export default UserFunction;