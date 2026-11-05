import React, { useState } from 'react';
import { Link } from 'react-router';

type ColumnId = 'todo' | 'doing' | 'done';

interface CardBoard {
  id: string;
  title: string;
  description: string;
  column: ColumnId;
}

 function CardBoard() {
  const columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'To do' },
    { id: 'doing', title: 'In progress' },
    { id: 'done', title: 'Done' },
  ];

  const storageKey = 'react-board-cards-v8';

  // State initialization with localStorage fallback
  const [cards, setCardsState] = useState<CardBoard[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed as CardBoard[];
      }
    } catch {}

    return [
      {
        id: crypto.randomUUID(),
        title: 'Plan project',
        description: 'Write down the main goals and outline the first steps.',
        column: 'todo',
      },
      {
        id: crypto.randomUUID(),
        title: 'Build interface',
        description: 'Create the initial layout and make the board easy to use.',
        column: 'doing',
      },
      {
        id: crypto.randomUUID(),
        title: 'Review work',
        description: 'Check the finished changes and confirm everything looks good.',
        column: 'done',
      },
    ];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<ColumnId>('todo');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Form validation touch state
  const [touched, setTouched] = useState({ title: false, description: false });

  // Persistence handler
  const setCards = (newCards: CardBoard[]) => {
    setCardsState(newCards);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newCards));
    } catch {}
  };

  const cardsFor = (column: ColumnId): CardBoard[] => {
    return cards.filter((card) => card.column === column);
  };

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setSelectedColumn('todo');
    setTouched({ title: false, description: false });
    setModalOpen(true);
  };

  const openEditModal = (card: CardBoard) => {
    setEditingId(card.id);
    setTitle(card.title);
    setDescription(card.description);
    setSelectedColumn(card.column);
    setTouched({ title: false, description: false });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Validation checks matching rules (title: letters & spaces only, description: min 10 chars)
  const isTitleValid = /^[A-Za-z ]+$/.test(title.trim());
  const isDescriptionValid = description.trim().length >= 10;
  const isFormValid = isTitleValid && isDescriptionValid;

  const saveCard = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, description: true });

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (!/^[A-Za-z ]+$/.test(trimmedTitle) || trimmedDesc.length < 10) return;

    if (editingId) {
      const card = cards.find((item) => item.id === editingId);
      if (!card) return;

      const withoutCard = cards.filter((item) => item.id !== editingId);
      const updated: CardBoard = {
        ...card,
        title: trimmedTitle,
        description: trimmedDesc,
        column: selectedColumn,
      };

      const next =
        card.column === selectedColumn
          ? cards.map((item) => (item.id === editingId ? updated : item))
          : [...withoutCard, updated];

      setCards(next);
    } else {
      setCards([
        ...cards,
        {
          id: crypto.randomUUID(),
          title: trimmedTitle,
          description: trimmedDesc,
          column: selectedColumn,
        },
      ]);
    }

    closeModal();
  };

  const deleteCard = () => {
    if (!editingId) return;
    setCards(cards.filter((card) => card.id !== editingId));
    closeModal();
  };

  // Drag and Drop Handlers
  const onDragStart = (event: React.DragEvent, cardId: string) => {
    setDraggedId(cardId);
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', cardId);
      event.dataTransfer.effectAllowed = 'move';
    }
  };

  const onDragEnd = () => {
    setDraggedId(null);
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent, targetColumn: ColumnId) => {
    event.preventDefault();

    const cardId = event.dataTransfer?.getData('text/plain') || draggedId;
    setDraggedId(null);

    if (!cardId) return;

    const card = cards.find((item) => item.id === cardId);
    if (!card || card.column === targetColumn) return;

    const moved = { ...card, column: targetColumn };
    setCards([...cards.filter((item) => item.id !== cardId), moved]);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Cardboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Drag cards between columns to update their status.
            </p>
          </div>
          <button
            onClick={openAddModal}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            + Add card
          </button>
        </header>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex flex-col h-full p-4 rounded-xl border border-[#e5e7eb] dark:border-slate-800 bg-[#eef1f6] dark:bg-slate-900/60 min-h-80"
              onDragOver={allowDrop}
              onDrop={(e) => onDrop(e, column.id)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-base text-slate-800 dark:text-slate-200">
                  {column.title}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  {cardsFor(column.id).length}
                </span>
              </div>

              <div className="flex flex-col gap-3 flex-1 min-h-60">
                {cardsFor(column.id).map((card) => (
                  <article
                    key={card.id}
                    className={`p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-grab transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      draggedId === card.id ? 'opacity-45' : 'opacity-100'
                    }`}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, card.id)}
                    onDragEnd={onDragEnd}
                    onClick={() => openEditModal(card)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') openEditModal(card);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Edit ${card.title}`}
                  >
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                      {card.description}
                    </p>
                  </article>
                ))}

                {cardsFor(column.id).length === 0 && (
                  <div className="flex-1 flex items-center justify-center border border-dashed border-[#c8ced8] dark:border-slate-700/60 rounded-xl p-6 text-[#77808f] dark:text-slate-500 text-[0.9rem] select-none">
                    Drop a card here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Dialog */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgb(20_26_36/55%)] backdrop-blur-xs overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeModal();
            }}
            tabIndex={-1}
          >
            <form onSubmit={saveCard}>
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white" id="card-modal-title">
                  {editingId ? 'Edit card' : 'Add card'}
                </h2>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg cursor-pointer"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Title Input */}
                <div>
                  <label htmlFor="cardTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Title
                  </label>
                  <input
                    id="cardTitle"
                    name="title"
                    type="text"
                    required
                    pattern="[A-Za-z ]+"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                    placeholder="Letters and spaces only"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white text-sm focus:outline-indigo-500"
                  />
                  {!isTitleValid && (touched.title || title.length > 0) && (
                    <p className="text-xs text-rose-500 mt-1">
                      Enter a title using letters and spaces only.
                    </p>
                  )}
                </div>

                {/* Description Textarea */}
                <div>
                  <label htmlFor="cardDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="cardDescription"
                    name="description"
                    rows={4}
                    required
                    minLength={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
                    placeholder="At least 10 characters"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white text-sm focus:outline-indigo-500"
                  ></textarea>
                  {!isDescriptionValid && (touched.description || description.length > 0) && (
                    <p className="text-xs text-rose-500 mt-1">
                      Description must be at least 10 characters.
                    </p>
                  )}
                </div>

                {/* Column Select */}
                <div>
                  <label htmlFor="cardColumn" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Column
                  </label>
                  <select
                    id="cardColumn"
                    name="column"
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value as ColumnId)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-indigo-500"
                  >
                    {columns.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                {editingId ? (
                  <button
                    type="button"
                    onClick={deleteCard}
                    className="px-4 py-2 rounded-xl border border-rose-500/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                ) : (
                  <span></span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    Save card
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 py-4 bg-white dark:bg-slate-900 text-center border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="text-decoration-none fw-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
} export default CardBoard;