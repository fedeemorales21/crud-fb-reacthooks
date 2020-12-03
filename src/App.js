import ListBooks from './components/ListBooks'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <main className="container p-4">
    <ListBooks/>
    <ToastContainer/>
    </main>
  );
}

export default App;
