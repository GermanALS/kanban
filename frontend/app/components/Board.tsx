'use client';

import React from 'react';
import { Column as ColumnType } from '../types';
import Column from './Column';

interface BoardProps {
  columns: ColumnType[];
  onRenameColumn: (columnId: string, newTitle: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onMoveCard: (cardId: string, sourceColumnId: string, targetColumnId: string) => void;
}

export default function Board({ columns, onRenameColumn, onAddCard, onDeleteCard, onMoveCard }: BoardProps) {
  return (
    <div className="board-container" data-testid="board-container">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onRename={onRenameColumn}
          onAddCard={onAddCard}
          onDeleteCard={onDeleteCard}
          onMoveCard={onMoveCard}
        />
      ))}
    </div>
  );
}
