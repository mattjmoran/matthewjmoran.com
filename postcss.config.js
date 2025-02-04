import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssExtendRule from 'postcss-extend-rule';

const config = {
	plugins: [postcssPresetEnv(), postcssExtendRule(), autoprefixer(), cssnano()]
};

export default config;
