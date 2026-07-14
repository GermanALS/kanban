'use client';

import React, { useState } from 'react';

interface NewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnTitle: string;
  onSubmit: (title: string, details: string) => void;
}

export default function NewCardModal({ isOpen, onClose, columnTitle, onSubmit }: NewCardModalProps) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), details.trim());
    setTitle('');
    setDetails('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Add Card to {columnTitle}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="card-title-input">Title</label>
            <input
              id="card-title-input"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title..."
              required
              autoFocus
              data-testid="card-title-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="card-details-input">Details</label>
            <textarea
              id="card-details-input"
              className="form-textarea"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter card details..."
              data-testid="card-details-input"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose} data-testid="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" data-testid="btn-submit">
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
