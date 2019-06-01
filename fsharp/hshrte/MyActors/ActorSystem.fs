module MyActors.actorSystem

open System

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
                        <! sprintf "value (%A) processed by computer (%s:%i)" msg computer mailbox.Context.Self.Path.Uid
                    return! loop ()
                }
                loop ()
            <| [Akka.Routing.ConsistentHashingPool (3
               , fun (o:obj) -> o)
               :> Akka.Routing.RouterConfig
               |> SpawnOption.Router ]
    actor

open Newtonsoft.Json
open Newtonsoft.Json.Serialization
open Akka.Configuration

let private hocon = System.IO.File.ReadAllText "./conf/client.hocon"
printfn "%s" hocon 
let private hoconConfig = ConfigurationFactory.ParseString hocon

let private system = hoconConfig |> System.create "sample-system"
let actor' = system |> spawnAutoReply


