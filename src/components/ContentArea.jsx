import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const createMarkup = (text, query) => {
  if (!query) return { __html: text };
  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, 'gi');
  return { __html: text.replace(regex, '<mark>$1</mark>') };
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
            <p
              key={`${content.title}-${index}`}
              dangerouslySetInnerHTML={createMarkup(paragraph, searchTerm)}
            />
          ))
        ) : (
          <p className="empty-state">No paragraphs match your search.</p>
        )}
      </div>
    </section>
  );
};

export default ContentArea;
