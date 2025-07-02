// node_modules
import { registerBlockStyle } from '@wordpress/blocks';

// カスタムブロックスタイルの登録
registerBlockStyle(
  'core/button',
  {
    label: '矢印なし',
    name: 'noarrow',
  }
);

registerBlockStyle(
  'core/button',
  {
    label: '縦幅大',
    name: 'info',
  }
);

registerBlockStyle(
  'core/button',
  {
    label: '背景紫',
    name: 'deep-purple',
  }
);

registerBlockStyle(
  'core/button',
  {
    label: '枠線グレー',
    name: 'gray',
  }
);