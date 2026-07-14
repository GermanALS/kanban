import { Column } from './types';

export const INITIAL_COLUMNS: Column[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      { id: 'card-1', title: 'Research competitors', details: 'Analyze the top 3 competitors in the market and document their strengths and weaknesses.' },
      { id: 'card-2', title: 'Define style guide', details: 'Establish color palette, typography rules, and spacing guidelines.' },
    ],
  },
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: 'card-3', title: 'Draft landing page design', details: 'Create wireframes and mockups for the main landing page.' },
      { id: 'card-4', title: 'Set up development environment', details: 'Configure linters, testing frameworks, and folder structure.' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      { id: 'card-5', title: 'Implement core layout', details: 'Create header, sidebar, and grid layout for the dashboard.' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      { id: 'card-6', title: 'Integration tests setup', details: 'Verify that Playwright is working locally and running sample tests.' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'card-7', title: 'Project kick-off meeting', details: 'Align on project scope, timeline, and assign initial tasks.' },
    ],
  },
];
