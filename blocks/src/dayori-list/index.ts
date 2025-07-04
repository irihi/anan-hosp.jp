import { registerBlockType } from '@wordpress/blocks';
import { listView as icon } from '@wordpress/icons';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import './style.scss';
import './editor.scss';

const { name, ...settings } = metadata;

registerBlockType( name, {
	...settings,
	icon,
	edit: Edit,
	save,
} );
