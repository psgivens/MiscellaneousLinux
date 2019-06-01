// Learn more about F# at http://fsharp.org

open System

open Suave
open Suave.Filters
open Suave.Operators


(*
// Use this on the client. 
    let hocon = System.IO.File.ReadAllText "./conf/client.hocon"
    printfn "%s" hocon 
    let hoconConfig = ConfigurationFactory.ParseString hocon

    let system = hoconConfig |> System.create "sample-system"
    let actor' = system |> spawnAutoReply 
    let remoteActor = system.ActorSelection "akka.tcp://sample-system@localhost:7102/user/echoActor"
    let response = 
      remoteActor.Ask <| "Hi, I'm the client."
      |> Async.AwaitTask
      |> Async.RunSynchronously

    printfn "Response: %A" response
*)





open Akka.Actor
open Akka.FSharp

let spawnAutoReply sys =
    let echoActor = 
        spawnOpt sys ("echoActorPool") 
            <| fun (mailbox:Actor<obj>) ->                
                let rec loop () = actor {
                    let! msg = mailbox.Receive ()
                    let computer = System.Net.Dns.GetHostName ()
                    let message = 
                      sprintf "value (%A) processed by computer (%s:%i)" msg computer mailbox.Context.Self.Path.Uid
                    printfn "%s" message
                    mailbox.Sender () <! message
                    return! loop ()
                }
                loop ()
            <| [Akka.Routing.ConsistentHashingPool (3
               , fun (o:obj) -> o)
               :> Akka.Routing.RouterConfig
               |> SpawnOption.Router ]
    

    let groupActor = 
        spawnOpt sys ("echoActor") 
            <| fun (mailbox:Actor<obj>) ->                
                let rec loop () = actor {
                    let! msg = mailbox.Receive ()
                    printfn "echoActor: %A" mailbox.Context.Self.Path.Address
                    let response = 
                      echoActor.Ask msg
                      |> Async.AwaitTask
                      |> Async.RunSynchronously

                    mailbox.Sender () <! response
                    return! loop ()
                }
                loop ()
            <| [Akka.Routing.ConsistentHashingGroup ([]
               , fun (o:obj) -> o)
               :> Akka.Routing.RouterConfig
               |> SpawnOption.Router ]

    actor

 
open Suave.Successful
open Suave.RequestErrors
open Suave.Utils.Collections

let returnFqdn = 
    System.Net.Dns.GetHostName ()
    |> sprintf "Hello from %s"
    |> OK 

type Foo =
  { foo : string }

open Newtonsoft.Json
open Newtonsoft.Json.Serialization
open Akka.Configuration


let fromJson<'a> json =
  JsonConvert.DeserializeObject(json, typeof<'a>) :?> 'a

let getResourceFromReq<'a> (req : HttpRequest) =
  let getString (rawForm:byte []) =
    System.Text.Encoding.UTF8.GetString rawForm
  req.rawForm |> getString |> fromJson<'a>

let hocon = System.IO.File.ReadAllText "./conf/server.hocon"
printfn "%s" hocon 
let hoconConfig = ConfigurationFactory.ParseString hocon

let system = hoconConfig |> System.create "sample-system"
let actor' = system |> spawnAutoReply 


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


[<EntryPoint>]
let main argv =
    printfn "Hello World from F#! %s" <| System.IO.Directory.GetCurrentDirectory()

    let config = { defaultConfig with  bindings = [ HttpBinding.createSimple HTTP "0.0.0.0" 7080 ]}

    // System.Threading.Thread.Sleep (60 * 60 * 1000)
    startWebServer config app
    0
