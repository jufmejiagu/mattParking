jest.dontMock('../../app/js/components/shoppingCart');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ShoppingCartComponent from '../../app/js/components/shoppingCart';

describe('shoppingCart component', () => {
  it ('ShoppingCart component its defined correctly', () => {
    const DOM = TestUtils.renderIntoDocument(
      <ShoppingCartComponent />
    );
    expect(DOM.refs.shoppingCart).toBeDefined();
  });
});
