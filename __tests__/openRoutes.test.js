const axios = require("axios");
const btoa = require("btoa");

const timeString = new Date().getTime();

const BASE_URL = "http://localhost:1337";
const user = {
  name: `Shiv${timeString}`,
  email: `shiv123${timeString}@gmail.com`,
  pass: "Shiv_123",
  adminName: "Shiv",
  adminPass: "12345",
};
const apiAxios = (email, token) =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      authorization: `Basic ${btoa(email + ":" + token)}`,
    },
  });

describe("Integration Tests", () => {
  it("Should be able to register new user", async () => {
    const resp = await axios.post(BASE_URL + "/signup", {
      uname: user.name,
      uemail: user.email,
      upassword: user.pass,
    });
    expect(resp.status).toBe(200);
    expect(resp.data.email).toBe(user.email);
    expect(resp.data.hasApiAccess).toBe(false);
  });

  it("Should be able to get weather report for given location", async () => {
    const resp = await axios.get(BASE_URL + "/weather?location=pune");
    expect(resp.status).toBe(200);
    expect(resp.data.location).toBe("pune");
    expect(resp.data.data.length).toBe(resp.data.count);
  });

  it("Should be able to get weather report for Kolkata", async () => {
    const resp = await axios.get(BASE_URL + "/weather");
    expect(resp.status).toBe(200);
    expect(resp.data.location).toBe("kolkata");
  });

  it("Should be able to upgrade to API PLAN", async () => {
    const resp = await apiAxios(user.adminName, user.adminPass).post(
      `/apiAccess`,
      {
        email: user.email,
      }
    );
    expect(resp.status).toBe(200);
    expect(resp.data.hasApiAccess).toBe(true);
  });

  it("Should be able to create an ACCESS TOKEN", async () => {
    const resp = await apiAxios(user.email, user.pass).post(`/accessTokens`, {
      name: "First Access Token" + timeString,
      description: "Access Token Created",
    });
    expect(resp.status).toBe(200);
    expect(resp.data.data.token).not.toBe(null);
    expect(resp.data.success).toBe(true);
    user.accessToken = resp.data.data.token;
  });

  it("Should be able to get news data", async () => {
    const resp = await apiAxios(user.email, user.accessToken).get(`/news`);
    expect(resp.status).toBe(200);
  });
});
