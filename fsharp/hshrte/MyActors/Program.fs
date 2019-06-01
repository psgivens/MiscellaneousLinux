
open System
open Suave
open MyActors.webSystem


[<EntryPoint>]
let main argv =
    printfn "Hello World from F#! %s" <| System.IO.Directory.GetCurrentDirectory()
    let config = { defaultConfig with  bindings = [ HttpBinding.createSimple HTTP "0.0.0.0" 2080 ]}

    // System.Threading.Thread.Sleep (60 * 60 * 1000)
    startWebServer config app
    0
