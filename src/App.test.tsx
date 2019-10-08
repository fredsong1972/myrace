import React from 'react';
import App from './App';
import { shallow} from 'enzyme';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  });

  it('renders title', () => {
    const wrapper = shallow(<App />);
    const title = <h3 className="title-container__subtitle">www.beteasy.com</h3>;
    expect(wrapper.contains(title)).toEqual(true);
  });

  it('renders ag-grid div', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div[className="ag-theme-balham"]')).toHaveLength(1);
  });
});
