
import { Route, Router, Routes } from '@solidjs/router';
import { ThemeProvider, createPalette, createTheme } from '@suid/material';
import Home from './Home';
import { bucket, useCtx } from '../mgrui/lib/components/utils';
import { createContext, createMemo } from 'solid-js';

type PaletteMode = "light" | "dark";

export interface AppContextDef {
  theme: Bucket<PaletteMode>;
  enableCustomLoggingFormatter: Bucket<boolean>;
  enableCustomFilter: Bucket<boolean>;
  loggingColorSchema: Bucket<string>;
  loggingFormatScript: Bucket<string>;
  import(config: string): void;
  export(): string;
}

const AppContext = createContext<AppContextDef>();

export function useApp() {
  return useCtx<AppContextDef>(AppContext as any);
}

export default function App() {
  const themeMode = bucket<PaletteMode>("light", {
    localStorageName: 'config.theme',
  });
  const enableCustomLoggingFormatter = bucket(false, {
    localStorageName: 'config.enableCustomLoggingFormatter'
  });
  const enableCustomFilter = bucket(false, {
    localStorageName: 'config.enableCustomFilter'
  });
  const loggingColorSchema = bucket("", {
    localStorageName: "config.loggingColorSchema"
  });
  const loggingFormatScript = bucket("", {
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
      loggingColorSchema,
      loggingFormatScript,
      import: (raw: string) => {
        try {
          const config = JSON.parse(raw);
          themeMode(config.theme);
          enableCustomLoggingFormatter(config.enableCustomLoggingFormatter);
          enableCustomFilter(config.enableCustomFilter);
          loggingColorSchema(config.loggingColorSchema);
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
          loggingColorSchema: loggingColorSchema(),
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
