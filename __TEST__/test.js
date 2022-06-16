import request from "supertest";
import app from "../src/index";
import db from "./config/database";

const agent = request.agent(app);

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("Create GateWay", () => {
  describe("POST /create-gateway", () => {
    test("Create a gateway device", async () => {
      let mockDevice = { name: "Infinix3", ipv4Address: "192.168.1.3" };
      const res = await agent.post("/api/create-gateway").send(mockDevice);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeTruthy();
      expect(res.body.data.name).toEqual("Infinix3");
      expect(res.body.data.ipv4Address).toEqual("192.168.1.3");
      expect(res.body.data.ipv4Address).toMatch(/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/);
    });
  });

  describe("GET /gateway/all", () => {
    test("Retrieve all gateway devices", async () => {

      let mockDevice1 = { name: "Infinix3", ipv4Address: "192.168.1.3" };
      let mockDevice2 = { name: "Android", ipv4Address: "192.0.2.146" };

      await agent.post("/api/create-gateway").send(mockDevice1);
      await agent.post("/api/create-gateway").send(mockDevice2);

      const gateway = await agent.get("/api/gateway/all");

      expect(gateway.statusCode).toEqual(200);
      expect(gateway.body).toBeTruthy();
      expect(gateway.body.data.length).toEqual(2);
    });
  });

  describe("GET /api/gateway/:id", () => {
    test("Retrieve a gateway device by Id", async () => {
      let newGatewayDevice = { name: "Android", ipv4Address: "192.0.2.146" };
      const gatewayDevice = await agent
        .post("/api/create-gateway")
        .send(newGatewayDevice);

      const insertedUser = await agent.get(
        `/api/gateway/${gatewayDevice.body.data._id}`
      );

      expect(insertedUser.statusCode).toEqual(200);
      expect(insertedUser.body.data.name).toEqual("Android");
    });
  });

  describe("POST /create-gateway", () => {
    test("Test for invalid ipv4, to return ipv4Address must follow this pattern 192.168.1.255", async () => {
      let newGatewayDevice = { name: "Android", ipv4Address: "192.0. 2.146" };
      const gatewayDevice = await agent
        .post("/api/create-gateway")
        .send(newGatewayDevice);

      expect(gatewayDevice.statusCode).toEqual(422);
      expect(gatewayDevice.body.message).toEqual(
        "ipv4Address must follow this pattern 192.168.1.255"
      );
    });
  });

  describe("PATCH api/gateway/addDevice/:id", () => {
    test("Add device to Gateway", async () => {
      let newGatewayDevice = { name: "Android", ipv4Address: "192.168.1.255" };
      const gatewayDevice = await agent
        .post("/api/create-gateway")
        .send(newGatewayDevice);

      let device = { vendor: "Iphone 11", status: "offline" };
      const updateGateway = await agent
        .patch(`/api/gateway/addDevice/${gatewayDevice.body.data._id}`)
        .send(device);

      expect(updateGateway.statusCode).toEqual(200);
      expect(updateGateway.body.data.devices.length).toBeGreaterThan(0);
    });
  });

  describe("PATCH api/gateway/remove-device/:id/:device", () => {
    test("Remove device from Gateway", async () => {
      let newGatewayDevice = { name: "Android", ipv4Address: "192.168.1.255" };
      const gatewayDevice = await agent
        .post("/api/create-gateway")
        .send(newGatewayDevice);

      let device1 = { vendor: "Iphone 11", status: "offline" };
      let device2 = { vendor: "Iphone 12", status: "online" };

      await agent
        .patch(`/api/gateway/addDevice/${gatewayDevice.body.data._id}`)
        .send(device1);

      await agent
        .patch(`/api/gateway/addDevice/${gatewayDevice.body.data._id}`)
        .send(device2);

      const updateGateway = await agent.patch(
        `/api/gateway/remove-device/${gatewayDevice.body.data._id}/${1}`
      );

      expect(updateGateway.statusCode).toEqual(200);
      expect(updateGateway.body.data.modifiedCount).toEqual(1);
      expect(updateGateway.body.message).toEqual("Device removed");
    });
  });
});
