import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Recommendations from '../Recommendations';

function renderComponent(props) {
  const defaultProps = {
    selectedBudget: '1250',
    customBudget: '',
    mealCount: 1,
    recommendations: [],
    setRecommendations: () => {}
  };
  return render(<Recommendations {...defaultProps} {...props} />);
}

describe('Recommendations', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('renders sets when given data', () => {
    const recommendations = [
      {
        mealIndex: 1,
        data: [
          { total_price: 500, combination: [{ name: 'A', price: 500 }] },
          { total_price: 600, combination: [{ name: 'B', price: 600 }] }
        ]
      },
      {
        mealIndex: 2,
        data: [
          { total_price: 700, combination: [{ name: 'C', price: 700 }] },
          { total_price: 800, combination: [{ name: 'D', price: 800 }] }
        ]
      }
    ];
    renderComponent({ recommendations });
    expect(screen.getByText('1セット')).toBeInTheDocument();
    expect(screen.getByText('2セット')).toBeInTheDocument();
  });

  test('shows loading state during fetch', async () => {
    let resolveFetch;
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = () =>
            resolve({ json: () => Promise.resolve([]) });
        })
    );
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: '提案を見る' }));
    expect(await screen.findByText('読み込み中...')).toBeInTheDocument();
    resolveFetch();
  });
});
