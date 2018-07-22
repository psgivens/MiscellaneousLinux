

// // Simulate a flaky API around otherwise an otherwise synchronous `f()`.
// const flakify = <T>(f: () => T): Promise<T> =>
//   new Promise((resolve, reject) =>
//     // We'll always take 200 * (1d10 + 1) ms to respond
//     window.setTimeout(() => {
//       try {

//         // // And ~20% of the time we'll fail
//         // if (Math.random() < 0.2) {
//         //   throw new Error('Failed arbitrarily')
//         // }

//         resolve(f())
//       }
//       catch (e) {
//         return reject(e)
//       }
//     }, 2000)
//   )

// // export default class Api {
// //     public fetchUser = (id: number) : Promise<Response> => {
// //         return fetch('http://example.com/movies.json')
// //         // return new Promise<null>(() => {})
// //     }
// // }


// export type Api = {
//     fetchUser: (id: number) => Promise<null>
//   }
  
// export const api: Api = {
//     fetchUser: (id: number): Promise<null> => flakify(() => {
//       return null
//     }),
// }

// postData(`http://example.com/answer`, {answer: 42})
//   .then(data => console.log(data)) // JSON from `response.json()` call
//   .catch(error => console.error(error));

export type Api = {
    fetchUser: (id: number) => Promise<Response>
  }

export type GetIpResult = {
  ip: string
}

const fetchUser = (id: Number): Promise<Response> => {
    const url = "http://ip.jsontest.com/"
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        //body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
    .catch(error => {
      console.error("Error fetching " + url)
      console.error(`Fetch Error =\n`, error)      
    });
};

export const api: Api = {
  fetchUser
}
