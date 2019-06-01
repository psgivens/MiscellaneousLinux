// Learn more about F# at http://fsharp.org

open System


open Suave
open Suave.Filters
open Suave.Operators


open Akka.Actor
open Akka.FSharp

let spawnAutoReply sys =
    let actor = 
        spawnOpt sys ("spawnAutoReply") 
            <| fun (mailbox:Actor<obj>) ->
                let rec loop () = actor {
                    let! msg = mailbox.Receive ()
                    let computer = System.Net.Dns.GetHostName ()
                    mailbox.Sender () 
                        <! sprintf "value (%A) processed by computer (%s)" msg computer
                    return! loop ()
                }
                loop () 
            <| [Akka.Routing.ConsistentHashingGroup ([
               "myactors-0.myactors.default.svc.cluster.local"
               "myactors-1.myactors.default.svc.cluster.local"]
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


let fromJson<'a> json =
  JsonConvert.DeserializeObject(json, typeof<'a>) :?> 'a

let getResourceFromReq<'a> (req : HttpRequest) =
  let getString (rawForm:byte []) =
    System.Text.Encoding.UTF8.GetString rawForm
  req.rawForm |> getString |> fromJson<'a>

let system = Configuration.defaultConfig () |> System.create "sample-system"
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

  request
  <| apply



let app =
  choose 
    [ GET >=> returnFqdn
      POST >=> askActor
      BAD_REQUEST "Only GET is supported at this"    
    ]


[<EntryPoint>]
let main argv =
    printfn "Hello World from F#!"

    let config = { defaultConfig with  bindings = [ HttpBinding.createSimple HTTP "0.0.0.0" 2080 ]}

    // System.Threading.Thread.Sleep (60 * 60 * 1000)
    startWebServer config app
    0
