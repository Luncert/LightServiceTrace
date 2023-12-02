import Axios from 'axios';
import config from './config';

const axios = Axios.create({
  baseURL: config.backend.endpoint
});

class Backend {

  public async getLogs(criteria: string): Promise<Page<Log>> {
    return axios.get(`/v1/system/logs?criteria=${criteria}`)
      .then((rep) => {
        return rep.data;
      });
  }
}

let instance: Backend;

export default function getBackend() {
  if (!instance) {
    instance = new Backend();
  }
  return instance;
}