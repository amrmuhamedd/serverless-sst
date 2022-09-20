import request  from 'supertest';
const baseURL = "https://u4voyflyp0.execute-api.us-east-1.amazonaws.com"
describe("get search history", () => {
    it("should return 200", async () => {
      const response = await request(baseURL).get("/pervious-search");
      expect(response.statusCode).toBe(200);
    });
});
