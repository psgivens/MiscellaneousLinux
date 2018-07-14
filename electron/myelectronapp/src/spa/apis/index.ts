

// Simulate a flaky API around otherwise an otherwise synchronous `f()`.
const flakify = <T>(f: () => T): Promise<T> =>
  new Promise((resolve, reject) =>
    // We'll always take 200 * (1d10 + 1) ms to respond
    window.setTimeout(() => {
      try {

        // // And ~20% of the time we'll fail
        // if (Math.random() < 0.2) {
        //   throw new Error('Failed arbitrarily')
        // }

        resolve(f())
      }
      catch (e) {
        return reject(e)
      }
    }, 2000)
  )

// export default class Api {
//     public fetchUser = (id: number) : Promise<Response> => {
//         return fetch('http://example.com/movies.json')
//         // return new Promise<null>(() => {})
//     }
// }


export type Api = {
    fetchUser: (id: number) => Promise<null>
  }
  
export const api: Api = {
    fetchUser: (id: number): Promise<null> => flakify(() => {
      return null
    }),
}
