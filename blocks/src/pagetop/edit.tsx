import React from 'react';
import { type BlockEditProps } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { PageTopProps as Props } from './props';

const Edit: React.FC<BlockEditProps<Props>> = () => {
  const className = 'blk-PageTop';
  const blockProps = useBlockProps({
    className,
  });

  return (
    <div { ...blockProps }>
      <button
        className={ `${className}__button` }
      >
        TOP
      </button>
    </div>
  );
};

export default Edit;