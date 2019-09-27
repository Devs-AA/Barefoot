import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Test for getting undefined routes', () => {
  it('should return 404 for the default route', () => {
    chai
      .request(app)
      .post('/')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('That route is not a known route');
      });
  });
});
