
import { Route, Router, Routes } from '@solidjs/router';
import { ThemeProvider, createPalette, createTheme } from '@suid/material';
import Home from './Home';
import { createData, useCtx } from '../mgrui/lib/components/utils';
import { createContext, createMemo } from 'solid-js';

type PaletteMode = "light" | "dark";

interface AppContextDef {
  theme: UpdateAndGetFunc<PaletteMode>;
}

const AppContext = createContext<AppContextDef>();

export function useApp() {
  return useCtx<AppContextDef>(AppContext as any);
}

export default function App() {
  const themeMode = createData<PaletteMode>("light");
  const palette = createMemo(() => {
    return createPalette({ mode: themeMode() });
  });
  const theme = createTheme({ palette: palette });
  return (
    <AppContext.Provider value={{
      theme: themeMode
    }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" component={Home} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}