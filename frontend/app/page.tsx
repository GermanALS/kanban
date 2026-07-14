'use client';

import React, { useState } from 'react';
import { INITIAL_COLUMNS } from './initialData';
import Board from './components/Board';
import { Column } from './types';

export default function Home() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);

  const handleRenameColumn = (columnId: string, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, title: newTitle } : col))
    );
  };

  const handleAddCard = (columnId: string, title: string, details: string) => {
    const newCard = {
      id: `card-${Date.now()}`,
      title,
      details,
    };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  };

  const handleMoveCard = (cardId: string, sourceColumnId: string, targetColumnId: string) => {
    if (sourceColumnId === targetColumnId) return;

    setColumns((prev) => {
      // Locate the moving card from the source column
      const sourceCol = prev.find((col) => col.id === sourceColumnId);
      if (!sourceCol) return prev;
      const card = sourceCol.cards.find((c) => c.id === cardId);
      if (!card) return prev;

      // Map columns, adding to target and removing from source
      return prev.map((col) => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            cards: [...col.cards, card],
          };
        }
        return col;
      });
    });
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="app-title-container">
          <h1 className="app-title" data-testid="app-title">Kanban Project Manager</h1>
          <p className="app-subtitle">Slick, simple, and high-performance project organization</p>
        </div>
      </header>

      <Board
        columns={columns}
        onRenameColumn={handleRenameColumn}
        onAddCard={handleAddCard}
        onDeleteCard={handleDeleteCard}
        onMoveCard={handleMoveCard}
      />
    </main>
  );
}
