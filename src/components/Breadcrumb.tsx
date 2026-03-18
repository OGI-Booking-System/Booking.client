import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" style={{ marginBottom: 16 }}>
      <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {index > 0 && <span style={{ color: '#9ca3af' }}>/</span>}
            {item.href ? (
              <Link to={item.href} style={{ color: '#6366f1', textDecoration: 'none', fontSize: 14 }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: '#6b7280', fontSize: 14 }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
