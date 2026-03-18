import { getInitials } from '../lib/helpers';

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
  avatarUrl?: string;
}

export default function Avatar({ firstName, lastName, size = 40, avatarUrl }: AvatarProps) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#6366f1',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {getInitials(firstName, lastName)}
    </div>
  );
}
