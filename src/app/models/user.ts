export class User {
  static DEV = {id: null, email: null, name: 'Dev', type: 'dev'};

  id: string;
  email: string;
  name: string;
  type: string;
  department?: string;
}
