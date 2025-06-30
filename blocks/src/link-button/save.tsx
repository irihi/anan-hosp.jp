import React, { type ReactNode } from 'react';
import { type BlockSaveProps } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { LinkButtonAttributes as Props } from './props';

const Save: React.FC<BlockSaveProps<Props>> = ({
  attributes,
}) => {
  const { link } = attributes;
  const className = 'link-button-block';

  const blockProps = useBlockProps.save({
    className: className,
  });
  const { children, ...combinedBlockProps } = useInnerBlocksProps.save(blockProps);

  return (
    <a
      {...combinedBlockProps}
      href={ link }
    >
      { children as ReactNode }
    </a>
  );
};

export default Save;