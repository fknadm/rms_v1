import React, {useEffect} from "react";
import "../App.css"
import { Container, Row, Col } from "reactstrap";
import { useHistory} from 'react-router-dom';
import noti from "../assets/bell.mp3"
import useSound from "use-sound"


const Noti = () => {
  const [play] = useSound(noti);

  useEffect(() => {
    play();
  }, [play]);

  return <button onClick={play}>Boop!</button>;

};

export default Noti;
