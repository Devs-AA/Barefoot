import chai from 'chai';
import chaiHttp from 'chai-http';
import Hash from '../../utils/hash';

const { expect } = chai;
chai.use(chaiHttp);

const { hash, compareWithHash } = Hash;

describe('Hashing utils', () => {
  describe('Compare hash', async () => {
    const password = 'Somestring';
    const rightPasswordHash = await hash(password);
    const wrongPasswordHash = '12122123afvvrerbreer';

    it('should compare password with hash and return true', (done) => {
      expect(compareWithHash(password, rightPasswordHash)).to.be.equal(true);
      done();
    });

    it('should compare password with wrong hash and return false', (done) => {
      expect(compareWithHash(password, wrongPasswordHash)).to.be.equal(false);
      done();
    });
  });
});
