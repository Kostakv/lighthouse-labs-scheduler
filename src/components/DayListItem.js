import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {

  const formatSpots = function (){
    var h3Text = props.spots+" spots remaining"
    if (props.spots === 0){
      h3Text = "no spots remaining";
    }
    else if (props.spots === 1){
      h3Text = "1 spot remaining"
    }
    return h3Text;
  }

  const DayListItem = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots 

  });

  return (
    <li className = {DayListItem} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}




