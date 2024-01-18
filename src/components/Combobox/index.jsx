import { useState, useRef } from "react";
import PropTypes from 'prop-types';

import ToggleIcon from 'src/assets/chevron.png';

import { useOutsideClick } from "src/hooks";

import './styles.scss';

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
    setCurrentValue(target.dataset?.value);
    closeList();
  };

  useOutsideClick(ref, closeList);

  return (
    <div ref={ref} className={`combobox-container ${isOpened ? 'combobox-container__opened' : ''}`}>
      <div className="input-wrapper">
        <input
          value={searchRequest || currentValue}
          onChange={onInputChange}
          placeholder={placeholder}
          onFocus={openList}
        />
        <button onClick={toggleList}>
          <img src={ToggleIcon} alt="toggle_icon" />
        </button>
      </div>
      {isOpened && (
        <div className="list-wrapper">
          {data.filter((item) => item?.title.includes(searchRequest)).map((item) => (
            <div
              key={item.id}
              onClick={onItemClick}
              data-value={item?.title}
              className="list-wrapper__item"
            >
              <img src={item?.icon} alt={item?.title} />
              <span>{item?.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Combobox.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
  })),
};

export default Combobox;
