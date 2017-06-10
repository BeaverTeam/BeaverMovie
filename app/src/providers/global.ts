export class Global {
  serverUrl: string;
  fileServerUrl: string;

  constructor() {
    this.serverUrl = 'http://60.205.216.158:9582/rest';
    this.fileServerUrl = 'http://60.205.216.158:9582/static';
  }
}
