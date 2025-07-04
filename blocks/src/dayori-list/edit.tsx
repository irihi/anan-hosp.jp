import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit: React.FC = () => {
	return (
		<div { ...useBlockProps() }>
			<p>{ __( '病院だよりの項目を表示します。', 'anan-hosp' ) }</p>
		</div>
	);
};

export default Edit;
