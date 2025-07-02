/** node_modules */
import path from 'path';
import { fileURLToPath } from 'url';

/** webpack */
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import * as sass from 'sass-embedded';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env) => {
  const isProduction = env.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: './src/index.ts',
      editor: './src/editor.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: 'style.css',
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: sass,
                sourceMap: !isProduction,
              },
            },
          ],
        },
      ],
    },
  };
};