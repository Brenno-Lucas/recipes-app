import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ type, id, index }) {
  const [linkCopied, setLinkCopied] = useState('');
  const [timeoutId, setTimeoutId] = useState(0);

  const copyRecipeLink = () => {
    copy(`http://${window.location.hostname}:3000/${type}/${id}`);
    setLinkCopied('Link copied!');

    const timeoutTimer = 2000;
    const timeoutUniqueId = setTimeout(() => {
      setLinkCopied('');
    }, timeoutTimer);

    setTimeoutId(timeoutUniqueId);
  };

  useEffect(() => {
    if (!linkCopied) {
      clearTimeout(timeoutId);
    }
    return () => clearTimeout(timeoutId);
  }, [linkCopied, timeoutId]);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyRecipeLink }
      >
        <figure>
          <img
            src={ shareIcon }
            alt="Ícone de compartilhamento"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </figure>
      </button>
      {
        linkCopied
      }
    </div>
  );
}

ShareButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
