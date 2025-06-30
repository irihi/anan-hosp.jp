import React from 'react';
import { type BlockEditProps } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { LinkButtonAttributes as Props } from './props';

const Edit: React.FC<BlockEditProps<Props>> = ({
  attributes,
  setAttributes,
}) => {
  const { link } = attributes;
  const className = 'link-button-block';

  const blockProps = useBlockProps({
    className: className,
  });
  const { children, ...combinedBlockProps } = useInnerBlocksProps(blockProps, {
  });

  return (
    <span
      {...combinedBlockProps}
    >
      { children }
    </span>
  )
};

export default Edit;