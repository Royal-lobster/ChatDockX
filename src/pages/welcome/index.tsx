import { createRoot } from 'react-dom/client';
import './index.css';
import Welcome from '../../components/Welcome';

function init() {
  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Panel root element");
  const root = createRoot(rootContainer);
  root.render(<Welcome />);
}

init();
