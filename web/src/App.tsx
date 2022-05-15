import { Widget } from './components/Widget';
import { ThemeContextProvider } from './hooks/useTheme';

export function App() {
  return (
    <ThemeContextProvider>
      <Widget />   
    </ThemeContextProvider>
  )
}