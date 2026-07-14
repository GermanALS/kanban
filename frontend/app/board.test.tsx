import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';
import { expect, test, describe } from 'vitest';

describe('Kanban Board state modifications', () => {
  test('renders default columns and cards', () => {
    render(<Home />);
    
    // Check columns
    expect(screen.getByTestId('column-backlog')).toBeInTheDocument();
    expect(screen.getByTestId('column-todo')).toBeInTheDocument();
    expect(screen.getByTestId('column-in-progress')).toBeInTheDocument();
    expect(screen.getByTestId('column-review')).toBeInTheDocument();
    expect(screen.getByTestId('column-done')).toBeInTheDocument();

    // Check pre-seeded cards
    expect(screen.getByText('Research competitors')).toBeInTheDocument();
    expect(screen.getByText('Define style guide')).toBeInTheDocument();
  });

  test('adds a new card to a column', async () => {
    render(<Home />);
    const user = userEvent.setup();

    // Click "Add Card" on Backlog column
    const addButton = screen.getByTestId('btn-add-card-backlog');
    await user.click(addButton);

    // Verify modal is open
    expect(screen.getByText('Add Card to Backlog')).toBeInTheDocument();

    // Fill the inputs
    const titleInput = screen.getByTestId('card-title-input');
    const detailsInput = screen.getByTestId('card-details-input');
    const submitBtn = screen.getByTestId('btn-submit');

    await user.type(titleInput, 'New Test Card');
    await user.type(detailsInput, 'Test description details');
    await user.click(submitBtn);

    // Verify card is added
    expect(screen.getByText('New Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test description details')).toBeInTheDocument();

    // Verify column count is updated
    expect(screen.getByTestId('column-count-backlog')).toHaveTextContent('3');
  });

  test('deletes an existing card', async () => {
    render(<Home />);
    const user = userEvent.setup();

    // Verify card exists
    expect(screen.getByText('Research competitors')).toBeInTheDocument();

    // Click Delete on card-1
    const deleteBtn = screen.getByTestId('btn-delete-card-card-1');
    await user.click(deleteBtn);

    // Verify card is removed
    expect(screen.queryByText('Research competitors')).not.toBeInTheDocument();
    expect(screen.getByTestId('column-count-backlog')).toHaveTextContent('1'); // Down from 2
  });

  test('renames a column', async () => {
    render(<Home />);
    const user = userEvent.setup();

    const titleInput = screen.getByTestId('column-title-input-backlog');
    expect(titleInput).toHaveValue('Backlog');

    // Focus, change value, blur
    await user.clear(titleInput);
    await user.type(titleInput, 'New Backlog Title');
    fireEvent.blur(titleInput);

    // Check that title has updated
    expect(screen.getByTestId('column-title-input-backlog')).toHaveValue('New Backlog Title');
  });
});
