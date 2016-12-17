jest.dontMock('../../app/js/components/suggestedBookCard');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SuggestedBookCardComponent from '../../app/js/components/suggestedBookCard';

describe('bookCard component', () => {
  const testBook = {
    name: 'Yo antes de ti',
    price: 340.00,
    deliverPrice: 44,
    autor: 'Joyo Moyes',
    format: 'Tapa blanda',
    photoUrl: 'assets/images/yo_antes_de_ti.jpg',
    deliverDate: 'nov 4 - nov 6',
    quantity: 1,
    language: 'Español',
    id: 'book1',
  };
  const DOM = TestUtils.renderIntoDocument(
    <SuggestedBookCardComponent
    key = {`suggested-book-${1}`}
    editable = {true}
    book={testBook}/>
  );
  it ('SuggestedBookCard component its defined correctly', () => {
    expect(DOM.refs.suggestedBookCard).toBeDefined();
  });
  it ('SuggestedBookCard component render the correct book', () => {
    expect(DOM.refs.suggestedBookCard.textContent).toContain(testBook.price);
  });
});
