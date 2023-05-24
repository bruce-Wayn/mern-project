import {useState, useEffect} from "react";
import {TextField, styled, Button} from '@mui/material';


const TextF = styled(TextField)`
    color: #000000;
    background: #ffffff;
    border-radius: 4px;
`;

const BlueButton = styled(Button)`
    background: #112255;
    color: #ffffff;
    margin: 5px;
    &hover {background:#000044}

`

// const ReqSend = () => {
//     axios.post("/");
// }

const Comp1 = () => {
    const [speed, setSpeed] = useState(20);

    function handleClick() {
        setSpeed(speed + 5);
        console.log(speed);
    }

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log("count increased by +1 to:", counter);
    }, [counter]);


    useEffect(() => {
        console.log('speedometer component is mounted');
        return() => {
            console.log('component is un-mounted');//cleanup function basically executed for old values
        };
    },[]);

    useEffect(() => {
        console.log('speed or counter function changed');
    },[speed, counter]);

    return(
        <div>
            <h1>Speedometer</h1>
            <TextF type="text" placeholder="Your Name"></TextF>
            <h1> Speed you wanna travel at: {speed}</h1>
            <BlueButton onClick={handleClick}>Ram the Peddle</BlueButton>
            
            <hr />
            <BlueButton onClick={() => setCounter(counter + 1)}>count: {counter}</BlueButton>


        </div>
    )
}


export default Comp1;