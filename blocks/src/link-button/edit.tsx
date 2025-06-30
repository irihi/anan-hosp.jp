import React from 'react';
import { type BlockEditProps } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { LinkButtonAttributes as Props } from './props';

import icon from "./icon.svg?raw";

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
    <>
      <InspectorControls>
        <Panel header={ 'ブロック設定' }>
          <PanelBody
            title={ 'リンク設定' }
          >
            <TextControl
              value={ link }
              onChange={ link => setAttributes({ link }) }
              placeholder={ 'URLを入力'　}
              __next40pxDefaultSize={ false }
            />
          </PanelBody>
        </Panel>
      </InspectorControls>
      <span
        {...combinedBlockProps}
      >
        { children }
      </span>
    </>
  )
};

export default Edit;