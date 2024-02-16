import {Business} from '@doing-business/core/dist/business';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {BusinessProvider} from './providers/Business.provider.tsx';

const business = new Business();

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <BusinessProvider business={business}>
      <App />
    </BusinessProvider>,
  );
