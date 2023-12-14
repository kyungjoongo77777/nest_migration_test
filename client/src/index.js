import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Moralis from "moralis";

Moralis.start({
    apiKey: 'Ij7DZmjJW7fTnSn3Co4XreZUQLxYJzfRZWtB6KdT3fxWpgBi20vLssWMp1M3CpiF',
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);

