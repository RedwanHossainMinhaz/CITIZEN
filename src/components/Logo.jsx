import { useAppData } from '../context/AppDataContext';

export default function Logo({ size = 32, showName = true, className = '' }) {
  const { settings } = useAppData();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {settings.logo ? (
        <img
          src={settings.logo}
          alt={`${settings.siteName} logo`}
          style={{ width: size, height: size }}
          className="rounded-full object-cover"
        />
      ) : (
        <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#2563eb" />
          <circle cx="32" cy="32" r="21" fill="#ffffff" />
          <circle cx="32" cy="32" r="14" fill="#10b981" />
        </svg>
      )}
      {showName && (
        <span className="text-xl font-extrabold tracking-tight text-brand-500">{settings.siteName}</span>
      )}
    </div>
  );
}
