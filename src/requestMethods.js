import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTNmOTQxODIyODFhMWNlOWMwMzNlNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDk2NjMzNCwiZXhwIjoxNjQxMjI1NTM0fQ.fGpOOscEwfxEt9oRkGq1YkYr5dQrbyB6q8tVvlPJkbE"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});