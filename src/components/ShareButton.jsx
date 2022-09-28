import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton() {
  const [linkCopied, setLinkCopied] = useState('');
  const [timeoutId, setTimeoutId] = useState(0);

  const copyRecipeLink = () => {
    copy(window.location.href);
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
          <img src={ shareIcon } alt="Icone de compartilhamento" />
        </figure>
      </button>
      {
        linkCopied
      }
    </div>
  );
}
