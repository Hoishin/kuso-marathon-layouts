import ReactDOM from 'react-dom';

export const render = (element: JSX.Element): void => {
	ReactDOM.render(element, document.querySelector('#root'));
};
