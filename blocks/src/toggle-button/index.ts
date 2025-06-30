/**
 * Toggle button
 */

// node_modules
import { registerBlockType } from '@wordpress/blocks';

// internal
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

// @ts-ignore
registerBlockType(metadata, {
  edit: Edit,
  save: Save,
});