import React from 'react';
import { shallow, mount } from 'enzyme';
import { Adapter} from 'enzyme-adapter-react-15';

import Activity from '../Activity';

describe('Activity', () => {
    let wrapper; 
    Enzyme.configure({ adapter: new Adapter() })

    it('wraps content in a div with .activity class', () => {
        wrapper = shallow(<Activity />);
        expect(wrapper.find('.activity').length).toEqual(1);
    });
});

// testing assumptions
// under all circumstances, the activity component will render a <div> with class of "activity"
// under all circumstances, there will be a <ul> with 9 <li>'s
// if the user is not logged in, buttons will be hidden
// if the user is logged in to the current org, two <button>'s will be displayed