import Axios from 'axios';
import config from './config';
import { Mod, styledString } from '../view/xterm/Colors';
import Xterm from '../view/xterm/Xterm';
import processLog from '../view/xterm/logstream/LogProcessor';

const axios = Axios.create({
  baseURL: config.backend.endpoint
});

const colors = {
  streamOpened: 'rgb(63, 62, 77)',
  streamClosed: 'rgb(63, 62, 77)',
  streamingError: 'rgb(189, 69, 65)',
  bg: undefined,
};

class Backend {

  public async getLogs(criteria: string): Promise<Page<Log>> {
    return axios.get(`/v1/logs?criteria=${criteria}`)
      .then((rep) => {
        return rep.data;
      });
  }

  public streaming(term: Xterm): EventSource {
    const streamConnection = new EventSource(
      `${config.backend.endpoint}/v1/logs/streaming?channel=streaming`
    );

    streamConnection.onopen = () => {
      console.log('streaming started');
      term.writeln(
        styledString(
          '> streaming started',
          colors.streamOpened,
          colors.bg,
          Mod.Bold
        )
      );
    };
    streamConnection.onmessage = (evt) => {
      console.warn('received unexpected event', evt);
    };
    streamConnection.addEventListener('streaming', (evt) => {
      const { data } = evt as any;
      processLog(data, (s: any) => {
        term.write(s);
      }, false);
    });
    streamConnection.onerror = () => {
      console.log('error occured, session terminated');
      term.writeln(
        styledString(
          '> error occured, session terminated',
          colors.streamingError,
          colors.bg,
          Mod.Bold | Mod.Italic,
        )
      );
    };

    return streamConnection;
  }
}

let instance: Backend;

export default function getBackend() {
  if (!instance) {
    instance = new Backend();
  }
  return instance;
}