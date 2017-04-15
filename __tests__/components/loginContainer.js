jest.dontMock('../../app/js/components/login/container');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LoginContainerComponent from '../../app/js/components/login/container';

describe('Login Container component', () => {
  const DOM = TestUtils.renderIntoDocument(
    <LoginContainerComponent />
  );
  it ('ShoppingCart component its defined correctly', () => {
    expect(DOM.refs.loginContainer).toBeDefined();
  });
});
