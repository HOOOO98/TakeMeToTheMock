const URL =
  "https://efbc8546-fb36-48dd-9494-d086ccab61ab.mock.pstmn.io/practice/firstapi";

export const api = {
  testMockServer: () => {
    return fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};
