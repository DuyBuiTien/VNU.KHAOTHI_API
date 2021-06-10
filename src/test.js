process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();
let token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjkwNjU4NDgsImlhdCI6MTYyMzA2NTkwOCwic3ViIjoiYWRtaW4iLCJjb250ZXh0Ijp7IlVzZXIiOnsiVXNlcm5hbWUiOiJhZG1pbiIsIk5hbWUiOiJUYW4gZGFuIn19fQ.nAFG0dxTHiMbz53BLt9bW4rhBRu0eVhtoyCUWJgU_Iw';

chai.use(chaiHttp);
describe('kythi', () => {
  beforeEach((done) => {
    done();
  });

  describe('/GET kythi', () => {
    it('it should GET all the news', (done) => {
      chai
        .request(server)
        .get('/v1/kythi')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

describe('kythi detail', () => {
  it('it should GET a pet by the given id', (done) => {
    // TODO add a model to db then get that *id* to take this test
    let id = 1;
    chai.request(server)
      .get('/v1/kythi/' + id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id').eql(id);
        res.body.should.have.property('MaKythi');
        res.body.should.have.property('TenKythi');
        res.body.should.have.property('Mota');
        res.body.should.have.property('Tungay');
        res.body.should.have.property('Toingay');
        res.body.should.have.property('Socathi');
        res.body.should.have.property('Trangthai');
        res.body.should.have.property('Taocathi');
        done();
      });
  });
});

describe('kythi patch', () => {
  it('it should UPDATE a pet given the id', (done) => {
    // TODO add a model to db then get that id to take this test
    let id = 1;
    chai.request(server)
      .patch('/v1/kythi/' + id)
      .send({
        Socathi: 1
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id').eql(id);
        res.body.should.have.property('MaKythi');
        res.body.should.have.property('TenKythi');
        res.body.should.have.property('Mota');
        res.body.should.have.property('Tungay');
        res.body.should.have.property('Toingay');
        res.body.should.have.property('Socathi');
        res.body.should.have.property('Trangthai');
        res.body.should.have.property('Taocathi');
        done();
      });
  });
});