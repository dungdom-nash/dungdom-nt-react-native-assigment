import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ProductDetailScreen } from './product-detail-screen';

describe('ProductDetailScreen', () => {
  function setup(product?: any) {
    const navigation = { goBack: jest.fn() };
    const route = { params: product ? { product } : {} };
    const screen = render(
      <ProductDetailScreen navigation={navigation} route={route} />,
    );
    return { screen, navigation };
  }

  it('shows empty state when product is missing', () => {
    const { screen, navigation } = setup();

    expect(screen.getByText('Product not found.')).toBeTruthy();
    fireEvent.press(screen.getByText('‹'));
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('renders product details without reviews section', () => {
    const { screen } = setup({
      name: 'Quantum Pro Smartwatch',
      description: 'Premium smartwatch with health tracking.',
      image: 'https://example.com/watch.png',
      price: 299,
      priceUnit: 'dollar',
    });

    expect(screen.getByText('Product Details')).toBeTruthy();
    expect(screen.getByText('Quantum Pro Smartwatch')).toBeTruthy();
    expect(screen.getByText('Premium smartwatch with health tracking.')).toBeTruthy();
    expect(screen.getByText('$299.00')).toBeTruthy();
    expect(screen.getByText('Key Features')).toBeTruthy();
    expect(screen.getByText('Product Description')).toBeTruthy();
    expect(screen.getByText('Add to Cart')).toBeTruthy();
    expect(screen.getByText('Buy Now')).toBeTruthy();
    expect(screen.queryByText('User Reviews')).toBeNull();
  });

  it('formats non-dollar currencies', () => {
    const { screen } = setup({
      name: 'Euro Lamp',
      description: 'Desk lamp',
      image: 'https://example.com/lamp.png',
      price: 49,
      priceUnit: 'euro',
    });

    expect(screen.getByText('EUR 49.00')).toBeTruthy();
  });
});

