jest.dontMock('../../app/js/components/bookCard');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CheckOutPayComponent from '../../app/js/components/checkOutPay';

describe('bookCard component', () => {
  const DOM = TestUtils.renderIntoDocument(
    <CheckOutPayComponent />
  );
  it ('CheckOutPayComponent component its defined correctly', () => {
    expect(DOM.refs.checkOutPay).toBeDefined();
  });
});
