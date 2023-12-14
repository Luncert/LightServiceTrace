
import { Route, Router, Routes } from '@solidjs/router';
import { ThemeProvider, createPalette, createTheme } from '@suid/material';
import Home from './Home';
import { StoreObject, createData, createStoreObject, useCtx } from '../mgrui/lib/components/utils';
import { createContext, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';

type PaletteMode = "light" | "dark";

export interface AppContextDef {
  theme: UpdateAndGetFunc<PaletteMode>;
  loggingFormatScript: UpdateAndGetFunc<string>;
  import(config: string): void;
  export(): string;
}

const AppContext = createContext<AppContextDef>();

export function useApp() {
  return useCtx<AppContextDef>(AppContext as any);
}

export default function App() {
  const themeMode = createData<PaletteMode>("light", {
    localStorageName: 'config.theme',
  });
  const loggingFormatScript = createData('', {
    localStorageName: 'config.loggingFormatScript'
  });
  const palette = createMemo(() => {
    return createPalette({ mode: themeMode() });
  });
  const theme = createTheme({ palette: palette });
  return (
    <AppContext.Provider value={{
      theme: themeMode,
      loggingFormatScript,
      import: (raw: string) => {
        try {
          const config = JSON.parse(raw);
          themeMode(config.theme);
          loggingFormatScript(config.loggingFormatScript);
        } catch (e) {
          console.log(e)
        }
      },
      export: () => {
        const config = {
          theme: themeMode(),
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

function createLoggingFormatStore(): [Object, StoreObject<LoggingFormat[]>] {
  const [v, setV] = createStore([
    {
      host: "xx.com",
      type: 'script',
      value: "asd"
    }
  ]);
  return [v, createStoreObject(v, setV, "config.loggingFormats") as any];
}

const importLoggingFormats = (obj: any, store: any) => {
  for (let key of Object.keys(obj)) {
    const v = obj[key];
    if (typeof(v) === 'object') {
      importLoggingFormats(v, store[key]);
    } else {
      store[key](v);
    }
  }
}

interface LoggingFormat {
  host: UpdateAndGetFunc<string>;
  type: UpdateAndGetFunc<'format' | 'script'>;
  value: UpdateAndGetFunc<string>;
}