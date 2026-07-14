import { test, expect } from '@playwright/test';

test.describe('Kanban Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local server
    await page.goto('/');
  });

  test('should load the page with proper header and 5 columns', async ({ page }) => {
    const title = page.getByTestId('app-title');
    await expect(title).toHaveText('Kanban Project Manager');

    // Verify 5 columns are present
    const columns = ['backlog', 'todo', 'in-progress', 'review', 'done'];
    for (const col of columns) {
      await expect(page.getByTestId(`column-${col}`)).toBeVisible();
    }
  });

  test('should allow column renaming', async ({ page }) => {
    const input = page.getByTestId('column-title-input-backlog');
    await expect(input).toHaveValue('Backlog');

    // Rename
    await input.focus();
    await input.fill('Ideas');
    await input.press('Enter');

    // Verify rename persisted in UI
    await expect(input).toHaveValue('Ideas');
  });

  test('should allow adding a new card', async ({ page }) => {
    // Start with 2 cards in todo
    await expect(page.getByTestId('column-count-todo')).toHaveText('2');

    // Click add card
    await page.getByTestId('btn-add-card-todo').click();

    // Modal should be visible
    await expect(page.getByText('Add Card to To Do')).toBeVisible();

    // Fill form
    await page.getByTestId('card-title-input').fill('Finish homework');
    await page.getByTestId('card-details-input').fill('Math and science');
    await page.getByTestId('btn-submit').click();

    // Modal should close and card should be added
    await expect(page.getByText('Finish homework')).toBeVisible();
    await expect(page.getByText('Math and science')).toBeVisible();

    // Count should be 3 now
    await expect(page.getByTestId('column-count-todo')).toHaveText('3');
  });

  test('should allow deleting a card', async ({ page }) => {
    // Verify card exists
    await expect(page.getByText('Research competitors')).toBeVisible();
    await expect(page.getByTestId('column-count-backlog')).toHaveText('2');

    // Click delete
    await page.getByTestId('btn-delete-card-card-1').click();

    // Card should be deleted
    await expect(page.getByText('Research competitors')).not.toBeVisible();
    await expect(page.getByTestId('column-count-backlog')).toHaveText('1');
  });

  test('should allow moving a card with drag and drop', async ({ page }) => {
    // Card 5 is in 'in-progress'
    const card5 = page.getByTestId('card-card-5');
    await expect(card5).toBeVisible();
    await expect(page.getByTestId('column-count-in-progress')).toHaveText('1');
    await expect(page.getByTestId('column-count-review')).toHaveText('1');

    // Drag to review column
    const reviewColumn = page.getByTestId('column-review');
    await card5.dragTo(reviewColumn);

    // Verify card 5 is now in review and counts updated
    await expect(page.getByTestId('column-count-in-progress')).toHaveText('0');
    await expect(page.getByTestId('column-count-review')).toHaveText('2');
    
    // Check card is in correct list
    const reviewList = page.getByTestId('card-list-review');
    await expect(reviewList.getByTestId('card-card-5')).toBeVisible();
  });
});
