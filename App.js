import RootNavigator from './src/navigation/RootNavigator';
import { SavedProvider } from './src/context/SavedContext';

export default function App() {
  return (
    <SavedProvider>
      <RootNavigator />
    </SavedProvider>
  );
}