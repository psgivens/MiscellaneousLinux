module MyActors.webSystem
// Learn more about F# at http://fsharp.org

open System
open MyActors.actorSystem

open Newtonsoft.Json

open Akka.Actor
open Akka.FSharp

open Suave
open Suave.Filters
open Suave.Operators
open Suave.Successful
open Suave.RequestErrors
open Suave.Utils.Collections

// serialization
let fromJson<'a> json =
  JsonConvert.DeserializeObject(json, typeof<'a>) :?> 'a

let getResourceFromReq<'a> (req : HttpRequest) =
  let getString (rawForm:byte []) =
    System.Text.Encoding.UTF8.GetString rawForm
  req.rawForm |> getString |> fromJson<'a>


let private returnFqdn = 
    System.Net.Dns.GetHostName ()
    |> sprintf "Hello from %s"
    |> OK 


type Foo = { foo : string }
let askActor =
  let message m = 
    let computer = System.Net.Dns.GetHostName ()
    sprintf "%s, recieved on %s" m computer

  let apply =
      getResourceFromReq<Foo>
      >> fun f -> f.foo
      >> actor'.Ask
      >> Async.AwaitTask
      >> Async.RunSynchronously
      >> fun s -> s:?>string
      >> message
      >> OK

  request apply


let app =
  choose 
    [ GET >=> returnFqdn
      POST >=> askActor
      BAD_REQUEST "Only GET is supported at this"    
    ]

