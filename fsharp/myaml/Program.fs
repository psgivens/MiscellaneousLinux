// Learn more about F# at http://fsharp.org

open System
open Legivel.Serialization

type Endpoint = {
  ``type``: string
  typeVersion: string
  verb: string
  noun: string
}

type Resource = {
  ``type``: string
  typeVersion: string
  name: string
  endpoints: Endpoint list
}

[<EntryPoint>]
let main argv =
    let value = Deserialize<int> "1"
    printfn "%A" value

    let value' = Deserialize<Resource> """
  type: MicroService
  typeVersion: v1
  name: sam
  endpoints:
  - type: Uri
    typeVersion: v1
    verb: GET
    noun: /users 
"""
    printfn "%A" value'
    printfn "Hello World from F#!"
    0 // return an integer exit code
