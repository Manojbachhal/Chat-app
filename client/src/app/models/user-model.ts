export class User {
  constructor(
    public email: string,
    public id: string,
    public _token: string,
    private _tokenExpiry: Date
  ) {}

  getToken() {
    if (!this._tokenExpiry || this._tokenExpiry > new Date()) {
      return null;
    }
    return this._token;
  }
}
