import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text, query) => {
  if (!query) {
    return [text];
  }

  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part === '') return null;
    const key = `${part}-${index}`;
    return index % 2 === 1 ? (
      <mark key={key}>{part}</mark>
    ) : (
      <span key={key}>{part}</span>
    );
  });
};

const ContentArea = () => {
  const { content, searchTerm } = useAppContext();

  const filteredParagraphs = useMemo(() => {
    if (!searchTerm) {
      return content.paragraphs;
    }
    return content.paragraphs.filter((para) =>
      para.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [content, searchTerm]);

  return (
    <section className="content-area" aria-live="polite">
      <h1>{content.title}</h1>
      <div className="paragraphs">
        {filteredParagraphs.length ? (
          filteredParagraphs.map((paragraph, index) => (
            <p key={`${content.title}-${index}`}>
              {highlightText(paragraph, searchTerm)}
            </p>
          ))
        ) : (
          <p className="empty-state">No paragraphs match your search.</p>
        )}
      </div>
    </section>
  );
};

export default ContentArea;
