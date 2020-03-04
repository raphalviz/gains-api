export class MockDocumentQuery {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  exec() {
    return this.data;
  }
}
