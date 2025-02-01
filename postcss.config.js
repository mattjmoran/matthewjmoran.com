import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const config = {
	plugins: [postcssPresetEnv(), autoprefixer(), cssnano()]
};

export default config;
