import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import DependencyExtractionWebpackPlugin from '@wordpress/dependency-extraction-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ブロックの自動検出
const blocksDir = path.resolve(__dirname, 'src');
const blockNames = fs.readdirSync(blocksDir).filter(name => fs.statSync(path.join(blocksDir, name)).isDirectory());

// メインのエントリーポイント
const entry = blockNames.reduce((acc, block) => {
  acc[`${block}/index`] = path.join(blocksDir, block, 'index.ts');
  return acc;
}, {});

// エディター用のエントリーポイント
const editorEntry = blockNames.reduce((acc, block) => {
  const editorScriptPath = path.join(blocksDir, block, 'script.ts');
  const stylePath = path.join(blocksDir, block, 'style.scss');
  const editorStylePath = path.join(blocksDir, block, 'editor.scss');
  
  try {
    if (fs.existsSync(editorScriptPath)) {
      acc[`${block}/script`] = editorScriptPath;
    }
  } catch (e) {
    // script.ts が存在しない場合は無視
  }

  try {
    if (fs.existsSync(stylePath)) {
      acc[`${block}/style`] = stylePath;
    }
  } catch (e) {
    // editor.scss が存在しない場合は無視
  }
  
  try {
    if (fs.existsSync(editorStylePath)) {
      acc[`${block}/editor`] = editorStylePath;
    }
  } catch (e) {
    // editor.scss が存在しない場合は無視
  }
  
  return acc;
}, {});

export default {
  entry: {
    ...entry,
    ...editorEntry,
    editor: './src/editor.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: {
      type: 'global',
      name: '[name]'
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
          {
            use: [
              {
                loader: 'svgo-loader',
                options: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new DependencyExtractionWebpackPlugin({
      injectPolyfill: true,
      combineAssets: true,
    }),
    new CopyWebpackPlugin({
      patterns: blockNames.reduce((acc, block) => {
        // block.json をコピー
        const blockJsonPath = path.join(blocksDir, block, 'block.json');
        if (fs.existsSync(blockJsonPath)) {
          acc.push({
            from: blockJsonPath,
            to: path.join(block, 'block.json'),
          });
        }

        // render.php が存在すればコピー
        const renderPhpPath = path.join(blocksDir, block, 'render.php');
        if (fs.existsSync(renderPhpPath)) {
          acc.push({
            from: renderPhpPath,
            to: path.join(block, 'render.php'),
          });
        }

        return acc;
      }, []),
    }),
  ],
};
