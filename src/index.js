import { StrictMode } from 'react';
import ReactDom from 'react-dom';
import App from './app';
import './index.scss';

ReactDom.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
