import React from 'react';
import { type BlockSaveProps } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { PageTopProps as Props } from './props';

const Save: React.FC<BlockSaveProps<Props>> = () => {
  const className = 'blk-PageTop';
  const blockProps = useBlockProps.save({
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

export default Save;