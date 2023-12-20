
import { Route, Router, Routes } from '@solidjs/router';
import { ThemeProvider, createPalette, createTheme } from '@suid/material';
import Home from './Home';
import { createBucket, useCtx } from '../mgrui/lib/components/utils';
import { createContext, createMemo } from 'solid-js';

type PaletteMode = "light" | "dark";

export interface AppContextDef {
  theme: Bucket<PaletteMode>;
  enableCustomLoggingFormatter: Bucket<boolean>;
  enableCustomFilter: Bucket<boolean>;
  loggingFormatScript: Bucket<string>;
  import(config: string): void;
  export(): string;
}

const AppContext = createContext<AppContextDef>();

export function useApp() {
  return useCtx<AppContextDef>(AppContext as any);
}

export default function App() {
  const themeMode = createBucket<PaletteMode>("light", {
    localStorageName: 'config.theme',
  });
  const enableCustomLoggingFormatter = createBucket(false, {
    localStorageName: 'config.enableCustomLoggingFormatter'
  });
  const enableCustomFilter = createBucket(false, {
    localStorageName: 'config.enableCustomFilter'
  });
  const loggingFormatScript = createBucket('', {
    localStorageName: 'config.loggingFormatScript'
  });
  const palette = createMemo(() => {
    return createPalette({ mode: themeMode() });
  });
  const theme = createTheme({ palette: palette });
  return (
    <AppContext.Provider value={{
      theme: themeMode,
      enableCustomLoggingFormatter,
      enableCustomFilter,
      loggingFormatScript,
      import: (raw: string) => {
        try {
          const config = JSON.parse(raw);
          themeMode(config.theme);
          enableCustomLoggingFormatter(config.enableCustomLoggingFormatter);
          enableCustomFilter(config.enableCustomFilter);
          loggingFormatScript(config.loggingFormatScript);
        } catch (e) {
          console.log(e)
        }
      },
      export: () => {
        const config = {
          theme: themeMode(),
          enableCustomLoggingFormatter: enableCustomLoggingFormatter(),
          enableCustomFilter: enableCustomFilter(),
          loggingFormatScript: loggingFormatScript()
        }
        return JSON.stringify(config, undefined, 2);
      }
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
