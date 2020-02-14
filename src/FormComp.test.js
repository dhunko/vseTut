import React from 'react';
import { shallow, mount } from 'enzyme';
import FormComp from './FormComp';


describe('<FormComp />', () => {
  it('renders default without crashing', () => {
    shallow(<FormComp />);
  });

  it('renders with components without crashing', () => {
    const wrapper = mount(<FormComp label={'test label'} onChange={(e) => setControlledValue(e.target.value)} onClick={() => alert('onClick')} onKeyDown={() => alert('onKeyDown')}/>);
    
    expect(wrapper.exists('input')).toEqual(true);
  });

  it('recieves expected values', () => {
    const wrapper = mount(<FormComp value={'test label'} onChange={(e) => setControlledValue(e.target.value)} onClick={() => alert('onClick')} />);
    //console.log(wrapper.debug())
    let a = wrapper.find('input');
   // expect(a.contains('test label')).toEqual(true);
    expect(wrapper.find('input')).toHaveProperty('value');
  });

  it('simulates click events', () => {
    const onClick = jest.fn();
    const wrapper = mount(<FormComp onClick={onClick}/>);
    wrapper.find('div').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

});