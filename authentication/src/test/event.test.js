const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const eventModel = require("../model/eventModel");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Event Management API", () => {
  it("should return all events", (done) => {
    chai
      .request(server)
      .get("/events")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should create a new event", (done) => {
    chai
      .request(server)
      .post("/events")
      .send({ name: "New Event", description: "Event description", date: "2024-12-01", capacity: 100 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        done();
      });
  });


});
