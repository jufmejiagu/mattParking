jest.dontMock('../../app/js/components/bookCard');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import BookCardComponent from '../../app/js/components/bookCard';

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
    <BookCardComponent
    key = {`book-card-${1}`}
    editable = {true}
    book={testBook}/>
  );
  it ('ShoppingCart component its defined correctly', () => {
    expect(DOM.refs.bookCard).toBeDefined();
  });
  it ('ShoppingCart component render the correct book', () => {
    expect(DOM.refs.bookCard.textContent).toContain(testBook.name);
  });
});
