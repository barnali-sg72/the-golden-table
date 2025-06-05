import * as Icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Rating({ num }) {
  let grey = 5 - num;
  return (
    <>
      {[...Array(num)].map((e) => (
        <FontAwesomeIcon icon={Icons.faStar} color="orange" size="xl" />
      ))}
      {[...Array(grey)].map((e) => (
        <FontAwesomeIcon icon={Icons.faStar} color="grey" size="xl" />
      ))}
    </>
  );
}

export default Rating;
