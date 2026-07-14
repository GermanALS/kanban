'use client';

import React, { useState } from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  columnId: string;
  onDelete: (cardId: string) => void;
}

export default function Card({ card, columnId, onDelete }: CardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ cardId: card.id, sourceColumnId: columnId }));
    e.dataTransfer.effectAllowed = 'move';
    // Delay setting isDragging to let the browser capture the original element style for drag preview
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-testid={`card-${card.id}`}
    >
      <div className="card-header-row">
        <h4 className="card-title">{card.title}</h4>
        <button
          className="btn-delete-card"
          onClick={() => onDelete(card.id)}
          title="Delete Card"
          aria-label="Delete Card"
          data-testid={`btn-delete-card-${card.id}`}
        >
          {/* Simple trash bin icon */}
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
            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
      {card.details && <p className="card-details">{card.details}</p>}
    </div>
  );
}
