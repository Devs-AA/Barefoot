import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../index';
import db from '../../models'

chai.use(chaiHttp);
let request;

const { expect } = chai;


describe('EMAIL ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
    await db.logouts.sync({ force: true });
  });

  afterEach(() => sinon.restore());

  after(async () => {
    await db.logouts.destroy({ where: {} });
  });

  describe('Test for getting undefined routes', () => {
    it('should return 404 for the default route', async () => {
      const response = await request.post('/');

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('That route is not a known route');
    });
  });
});
