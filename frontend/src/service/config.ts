
export default (import.meta.env.DEV ? {
  backend: {
    endpoint: "http://localhost:3001"
  }
} : {
  backend: {
    endpoint: ""
  }
});