// node_modules
import React from 'react';

// wordpress
import { type BlockEditProps } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { ToggleButtonAttributes as Props } from './props';

const Edit: React.FC<BlockEditProps<Props>> = ({
  attributes,
  setAttributes,
}) => {
  const className = 'toggle-button';

  const blockProps = useBlockProps({
    className: className,
  });

  return (
    <div { ...blockProps }>
      <button
        className={ `${className}__button` }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9.289" viewBox="0 0 14 9.289">
          <g transform="translate(-327.898 -35.355)">
            <path d="M-16773.1-20524.145h14" transform="translate(17101 20560)" fill="none" stroke="#258d89" stroke-width="1"/>
            <path d="M-16773.1-20524.145h14" transform="translate(17101 20564.145)" fill="none" stroke="#258d89" stroke-width="1"/>
            <path d="M-16773.1-20524.145h14" transform="translate(17101 20568.289)" fill="none" stroke="#258d89" stroke-width="1"/>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Edit;