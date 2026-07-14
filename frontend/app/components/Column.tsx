'use client';

import React, { useState } from 'react';
import { Column as ColumnType } from '../types';
import Card from './Card';
import NewCardModal from './NewCardModal';

interface ColumnProps {
  column: ColumnType;
  onRename: (columnId: string, newTitle: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onMoveCard: (cardId: string, sourceColumnId: string, targetColumnId: string) => void;
}

export default function Column({ column, onRename, onAddCard, onDeleteCard, onMoveCard }: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState(column.title);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;
      const { cardId, sourceColumnId } = JSON.parse(dataStr);
      
      if (cardId && sourceColumnId) {
        onMoveCard(cardId, sourceColumnId, column.id);
      }
    } catch (err) {
      console.error('Failed to parse drag data:', err);
    }
  };

  const handleTitleBlur = () => {
    if (titleInput.trim() && titleInput !== column.title) {
      onRename(column.id, titleInput.trim());
    } else {
      setTitleInput(column.title);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-testid={`column-${column.id}`}
    >
      <div className="column-header">
        <input
          type="text"
          className="column-title-input"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          aria-label={`Rename ${column.title} column`}
          data-testid={`column-title-input-${column.id}`}
        />
        <span className="column-card-count" data-testid={`column-count-${column.id}`}>
          {column.cards.length}
        </span>
      </div>

      <div className="card-list" data-testid={`card-list-${column.id}`}>
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            columnId={column.id}
            onDelete={(cardId) => onDeleteCard(column.id, cardId)}
          />
        ))}
      </div>

      <button
        className="btn-add-card"
        onClick={() => setIsModalOpen(true)}
        data-testid={`btn-add-card-${column.id}`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Card
      </button>

      <NewCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        columnTitle={column.title}
        onSubmit={(title, details) => onAddCard(column.id, title, details)}
      />
    </div>
  );
}
