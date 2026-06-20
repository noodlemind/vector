import { ThemeProvider } from "./theme/ThemeProvider";
import { AppShell } from "./components/shell/AppShell";
import { Home } from "./components/home/Home";

export default function App() {
  return (
    <ThemeProvider>
      <AppShell>
        <Home />
      </AppShell>
    </ThemeProvider>
  );
}
