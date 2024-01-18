import { useState, useRef } from "react";
import PropTypes from 'prop-types';

import { useOutsideClick } from "../../hooks";

const Combobox = ({ placeholder = '', data = [] }) => {
  const ref = useRef(null);

  const [ isOpened, setIsOpened ] = useState(false);
  const [ currentValue, setCurrentValue ] = useState('');
  const [ searchRequest, setSearchRequest ] = useState('');

  const onInputChange = ({ target }) => {
    setCurrentValue('');
    setSearchRequest(target.value);
  };

  const toggleList = () => {
    setIsOpened(!isOpened);
  };

  const openList = () => {
    setIsOpened(true);
  };

  const closeList = () => {
    setIsOpened(false);
  };

  const onItemClick = ({ target }) => {
    setSearchRequest('');
    setCurrentValue(target.dataset.value);
  };

  useOutsideClick(ref, closeList);

  return (
    <div ref={ref}>
      <div>
        <input
          value={searchRequest || currentValue}
          onChange={onInputChange}
          placeholder={placeholder}
          onFocus={openList}
        />
        <button onClick={toggleList}>-</button>
      </div>
      {isOpened && (
        <div>
          {data.filter((item) => item.includes(searchRequest)).map((item, index) => (
            <div
              key={index}
              onClick={onItemClick}
              data-value={item}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Combobox.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
};

export default Combobox;
