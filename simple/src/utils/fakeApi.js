const fakeApi = {
  setPublicStatus: (_status) =>
    new Promise((resolve) => setTimeout(resolve, 300)),
  getPublishedDate: () =>
    new Promise((resolve) => setTimeout(() => resolve(new Date()), 100)),
};

export default fakeApi;
