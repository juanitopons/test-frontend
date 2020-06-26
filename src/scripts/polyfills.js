import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

const polyfills = [];
if (!window.fetch) {
  polyfills.push(
    import(/* webpackChunkName: "polyfill-fetch" */ 'whatwg-fetch'),
  );
}

export default polyfills;
