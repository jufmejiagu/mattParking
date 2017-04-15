jest.dontMock('../../app/js/components/administration/AdministrationContainer');
jest.dontMock('react-router');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AdministrationContainerComponent from '../../app/js/components/administration/AdministrationContainer';

describe('Login Container component', () => {
  const DOM = TestUtils.renderIntoDocument(
    <AdministrationContainerComponent />
  );
  it ('Admininstration container component its defined correctly', () => {
    // Expect undefined cos the transition
    expect(DOM.refs.administrationContainer).toEqual(undefined);
  });
});
