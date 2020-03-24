import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

export default function FamousList(props) {
  const Context = useContext(AppContext);
  const FamousState = Context.famous.state;
  const FamousDispatch = Context.famous.dispatch;

  const filterSortArray = (array, value, field) => {
    let filteredArray = [];

    if (value !== '') {
      field.forEach(element => {
        // TEMP ARRAY FOR ELEMENTS TO SORT
        let arraytoSort = [];

        // PUSH FILTERED ELEMENT TO TEMP ARRAY
        array.map(person => {
          if (person[element].toLowerCase().indexOf(value.toLowerCase()) !== -1)
            if (!arraytoSort.includes(person)) arraytoSort.push(person);
        });

        // SORT TEMP ARRAY
        arraytoSort.sort((a, b) => (a[element] > b[element] ? 1 : -1));

        // PUSH SORTED ARRAY TO FILTERED ARRAY
        arraytoSort.map(item => {
          if (!filteredArray.includes(item)) filteredArray.push(item);
        });

        // CLEAR TEMP ARRAY
        arraytoSort = [];
      });

      return filteredArray;
    } else {
      return array;
    }
  };

  const handleFamousItemClick = famousId => {
    props.nextStep();
    FamousDispatch({ type: 'SET_CURRENT_FAMOUS_ID', data: famousId });
  };

  const handleSearch = e => {
    FamousDispatch({ type: 'SET_SEARCH_VALUE', data: e.target.value });
  };

  const renderFamousPerson = () => {
    let filteredFamousList = filterSortArray(
      FamousState.famousList,
      FamousState.searchValue,
      ['lastname', 'firstname']
    );

    return filteredFamousList ? (
      filteredFamousList.map(person => {
        return (
          <div
            key={person._id}
            onClick={() => {
              handleFamousItemClick(person._id);
            }}
            className="famous-list__list-item"
          >
            <div className="famous-list__name">
              {person.firstname}
              &nbsp;
              {person.lastname}
            </div>
          </div>
        );
      })
    ) : (
      <></>
    );
  };

  return (
    <div className="famous-list">
      <div className="famous-list__header">
        <div className="famous-list__search">
          <input
            type="text"
            placeholder="Search Famous"
            className="famous-list__search-input"
            onChange={handleSearch}
          ></input>
          <div className="famous-list__search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>
      <div className="famous-list__list">{renderFamousPerson()}</div>
    </div>
  );
}
