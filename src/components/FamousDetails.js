import React, { useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

export default function FamousDetails(props) {
  const Context = useContext(AppContext);
  const FamousState = Context.famous.state;
  const FamousDispatch = Context.famous.dispatch;

  let isEditing = FamousState.editingStatus;

  const person = FamousState.famousList.filter(person => {
    return person._id === FamousState.currentFamousId;
  })[0];

  const handleBack = () => {
    props.prevStep();

    FamousDispatch({
      type: 'CHANGE_EDITING_STATUS',
      data: false
    });
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      id: person._id,
      firstname: person.firstname,
      lastname: person.lastname,
      dob: person.dob,
      biography: person.biography
    },
    onSubmit: values => {
      axios
        .post('http://localhost:5000/update-famous', values)
        .then(response => {
          alert('Updated Successfully!');
          FamousDispatch({
            type: 'UPDATE_CURRENT_FAMOUS',
            data: response.data
          });
          FamousDispatch({
            type: 'CHANGE_EDITING_STATUS',
            data: false
          });
        })
        .catch(error => alert('An Error Occured!'));
    }
  });

  return (
    <div className="famous-details">
      <div className="famous-details__header">
        <div onClick={handleBack} className="famous-details__back">
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp; &nbsp;
          <span>Back</span>
        </div>
        <div className="famous-details__btn-group">
          {isEditing ? (
            <>
              <div
                onClick={() => {
                  FamousDispatch({
                    type: 'CHANGE_EDITING_STATUS',
                    data: false
                  });
                  formik.resetForm();
                }}
                className="famous-details__btn"
              >
                Cancel
              </div>
              <div
                onClick={formik.handleSubmit}
                className="famous-details__btn famous-details__btn--action"
              >
                Save
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                FamousDispatch({ type: 'CHANGE_EDITING_STATUS', data: true });
              }}
              className="famous-details__btn famous-details__btn--action"
            >
              Edit
            </div>
          )}
        </div>
      </div>
      <div className="famous-details__content">
        <div className="famous-details__content-item">
          <div className="famous-details__content-label">Name:</div>
          {isEditing ? (
            <>
              <input
                id="firstname"
                name="firstname"
                type="firstname"
                placeholder="Firstname"
                className="famous-details__content-input"
                onChange={formik.handleChange}
                value={formik.values.firstname}
              />
              <input
                id="lastname"
                name="lastname"
                type="lastname"
                placeholder="Lastname"
                className="famous-details__content-input"
                onChange={formik.handleChange}
                value={formik.values.lastname}
              />
            </>
          ) : (
            <>
              {person.firstname} {person.lastname}
            </>
          )}
        </div>
        <div className="famous-details__content-item">
          <div className="famous-details__content-label">Date of Birth: </div>
          {isEditing ? (
            <input
              id="dob"
              name="dob"
              type="dob"
              placeholder="Date of Birth"
              className="famous-details__content-input"
              onChange={formik.handleChange}
              value={formik.values.dob}
            />
          ) : (
            person.dob
          )}
        </div>
        <div className="famous-details__content-item">
          <div className="famous-details__content-label">Biography: </div>
          <p>
            {isEditing ? (
              <textarea
                id="biography"
                name="biography"
                type="biography"
                placeholder="Biography"
                className="famous-details__content-textarea"
                onChange={formik.handleChange}
                value={formik.values.biography}
              />
            ) : (
              person.biography
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
