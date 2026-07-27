import { useAppData } from '../context/AppDataContext';

export default function Footer() {
  const { settings } = useAppData();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p>
          <span className="font-semibold text-brand-500">{settings.siteName}</span> &middot; &copy;{' '}
          {new Date().getFullYear()} {settings.siteName} Bangladesh. Empowering civic voices for a better
          tomorrow.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-800">About Us</a>
          <a href="#" className="hover:text-slate-800">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800">Contact Support</a>
          <a href="#" className="hover:text-slate-800">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
