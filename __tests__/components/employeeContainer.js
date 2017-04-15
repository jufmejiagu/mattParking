jest.dontMock('../../app/js/components/employee/employeeContainer');
jest.dontMock('react-router');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import EmployeContainerComponent from '../../app/js/components/employee/employeeContainer';

describe('Login Container component', () => {
  const DOM = TestUtils.renderIntoDocument(
    <EmployeContainerComponent />
  );
  it ('Employee container component its defined correctly', () => {
    // Expect undefined cos the transition
    expect(DOM.refs.EmployeContainerComponent).toEqual(undefined);
  });
});
