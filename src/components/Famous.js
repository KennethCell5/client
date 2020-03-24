import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import FamousList from './FamousList';
import FamousDetails from './FamousDetails';

export default function Famous() {
  const Context = useContext(AppContext);
  const FamousState = Context.famous.state;
  const FamousDispatch = Context.famous.dispatch;

  const nextStep = () => {
    FamousDispatch({ type: 'CHANGE_STEP', data: FamousState.currentStep + 1 });
  };

  const prevStep = () => {
    FamousDispatch({ type: 'CHANGE_STEP', data: FamousState.currentStep - 1 });
  };

  let currentComponent;

  switch (FamousState.currentStep) {
    case 1:
      currentComponent = <FamousList nextStep={nextStep} />;
      break;
    case 2:
      currentComponent = <FamousDetails prevStep={prevStep} />;
      break;
    default:
      break;
  }

  return (
    <div className="famous">
      <div className="famous__wrapper">{currentComponent}</div>
    </div>
  );
}
