import React from 'react';
import { type BlockEditProps } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { SearchAttributes as Props } from './props';

const Edit: React.FC<BlockEditProps<Props>> = () => {
  const className = 'blk-Search';

  const blockProps = useBlockProps({
    className: className,
  });

  return (
    <div { ...blockProps }>
      <button
        className={ `${className}__button` }
      >
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="13.854" height="13.854" viewBox="0 0 13.854 13.854">
          <path d="M11.96,8.62a4.757,4.757,0,1,1,0-6.727,4.756,4.756,0,0,1,0,6.727" fill="none" stroke="#258d89" stroke-width="1"/>
          <path d="M11.96,8.62a4.757,4.757,0,1,1,0-6.727A4.756,4.756,0,0,1,11.96,8.62Z" fill="none" stroke="#258d89" strokeMiterlimit="10" strokeWidth="1"/>
          <line y1="4.83" x2="4.83" transform="translate(0.354 8.67)" fill="#fff" stroke="#258d89" strokeWidth="1"/>
          <line y1="4.83" x2="4.83" transform="translate(0.354 8.67)" fill="none" stroke="#258d89" strokeMiterlimit="10" strokeWidth="1"/>
        </svg>
      </button>
      <div className={ `${className}__form` }>
        <input
          className={ `${className}__input` }
          type='text'
          name='s'
          value=''
        />
        <button
          className={ `${className}__submit` }
          type="submit"
        >検索</button>
      </div>
    </div>
  );
}

export default Edit;