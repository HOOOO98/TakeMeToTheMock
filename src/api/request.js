export const api = {
  testMockServer: () => {
    return fetch("/main", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};
