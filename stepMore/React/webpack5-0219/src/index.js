import React from 'react';
import ReactDOM from 'react-dom';

import nin from '@src/assets/image/nin.jpg';
import './index.less';

const App = () => (
  <div>
    <h1>Ninjee ....</h1>
    <img src={nin} />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
