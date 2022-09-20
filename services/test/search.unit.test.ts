import request  from 'supertest';
const baseURL = "https://u4voyflyp0.execute-api.us-east-1.amazonaws.com"
describe("search is work correctly", () => {
    it("should return 201", async () => {
      const response = await request(baseURL).get("/search?searchTerm=coffe");
      expect(response.statusCode).toBe(201);
    });
 
});
