import { useNavigate, useLocation } from 'react-router-dom';

export default function ReturnButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.key === 'default';

  return (
    <button onClick={() => navigate(-1)} disabled={canGoBack}>
      go back
    </button>
  );
}
