import bcrypt from 'bcryptjs';

export default class Hash {
  static async hash(password) {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static compareWithHash(password, hash) {
    const same = bcrypt.compareSync(password, hash);
    return same;
  }
}
