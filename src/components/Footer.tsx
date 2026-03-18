export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} EventPass — Event Pass Booking &amp; QR Verification</p>
      </div>
    </footer>
  );
}
