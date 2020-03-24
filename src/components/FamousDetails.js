import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

export default function FamousDetails(props) {
  const Context = useContext(AppContext);
  const FamousState = Context.famous.state;

  const person = FamousState.famousList.filter(person => {
    return person._id === FamousState.currentFamousId;
  })[0];

  const showList = () => {
    props.prevStep();
  };

  return (
    <div className="famous-details">
      <div className="famous-details__header">
        <div onClick={showList} className="famous-details__back">
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp; &nbsp;
          <span>Back</span>
        </div>
      </div>
      <div className="famous-details__content">
        <div className="famous-details__content-item">
          <div className="famous-details__content-label">Name:</div>
          {person.firstname} &nbsp;
          {person.lastname}
        </div>
        <div className="famous-details__content-item">
          <div className="famous-details__content-label">Date of Birth: </div>
          {person.dob}
        </div>
        <div className="famous-details__content-item">
          <div className="famous-details__content-label">Biography: </div>
          <p>{person.biography}</p>
        </div>
      </div>
    </div>
  );
}
