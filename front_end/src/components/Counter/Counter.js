import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Tooltip from "@material-ui/core/Tooltip";
import { useCountUp } from "react-countup";
const useStyles = makeStyles(styles);

function Counter({ myPoints }) {
  const Styles = styled.div`

.wrapper{
    background-color:ghostwhite;

}
.counter-section{
    margin: 10% auto;
    color:#fff;

}

.icon-box{
    border:1px solid #0098a2;
    height:100px;
    width:100px;
    margin 20px auto;
    transform:rotate(45deg);
}
.icon-box  .fa {
    font-size: 40px;
    margin: 25px auto;
    color #0098a2;
    transform:rotate(-45deg);

}
h4{
  line-height:0.3em;
  font-weight: 400;
  margin: 10px 0 5px;

}
`;

  const classes = useStyles();

  const [points, setpoints] = useState(myPoints);

  const { countUp, update: hookUpdate } = useCountUp({
    end: points,
  });

  const HandleChange = (e) => {
    setpoints(e.target.value);
    hookUpdate(e.target.value);
  };

  return (
    <Styles>
      <input value={points} onChange={(e) => HandleChange(e)} type="text " />
      <Tooltip
        id="tooltip-top"
        title="My points"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <div className="row text-center ">
          <div className="col-md counter-box">
            <LoyaltyIcon
              className={classes.LoyaltyIcon}
              style={{ fontSize: 20 }}
            />{" "}
<<<<<<< HEAD
            <h4 className="counter">{countUp}</h4>
=======
            <h4 className="counter">
              <CountUp duration={5} delay={1} end={JSON.parse(localStorage.getItem('user')).points}></CountUp>
            </h4>
>>>>>>> 9ed88eaf484ab69daf0c90f4102c49e0b67f289c
          </div>
        </div>
      </Tooltip>
    </Styles>
  );
}

export default Counter;
