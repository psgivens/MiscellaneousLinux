module Tests

open System
open Xunit
open FsUnit.Xunit

type RpsValues =
  | Rock
  | Paper
  | Scissors

let rockPaperScissors (values:string) =

  let convert = 
    function
    | 'R' -> Some Rock
    | 'P' -> Some Paper
    | 'S' -> Some Scissors
    | _ -> failwith "Unsupported character"

  let rec reduce values =
    let rec rps = 
      function
      | Rock,  Paper    -> Some Paper
      | Rock,  Scissors -> Some Rock
      | Paper, Scissors -> Some Scissors
      | a, b -> rps (b, a)

    let compare = 
      function
      | None, b' -> b'
      | a', None -> a'
      | Some a', Some b' -> rps (a', b')  
  
    let rec processList = 
      function
      | [] -> []
      | [a] -> [a]
      | a :: b :: tail -> compare (a, b) :: processList tail
  
    match values with
    | []  -> [None]
    | [_] -> values
    | _ :: _ :: tail -> processList values |> reduce

  
  values.ToCharArray ()
  |> Seq.map convert
  |> List.ofSeq
  |> reduce
  |> List.head
  

[<Fact>]
let ``Single value`` () =
  let result = rockPaperScissors "R"
  Assert.Equal (Rock, result.Value)
  3 |> should equal 3

  "R"
  |> rockPaperScissors
  |> should equal Rock

[<Fact>]
let ``Two values`` () =
  let result = rockPaperScissors "RP" 
  Assert.Equal (Paper, result.Value)

[<Fact>]
let ``Three values`` () =
  let result = rockPaperScissors "RSP"
  Assert.Equal (Paper, result.Value)

[<Fact>]
let ``Four values`` () =
  let result = rockPaperScissors "RSPR"
  Assert.Equal (Paper, result.Value)

[<Fact>]
let ``Four values; one set is a duplicate`` () =
  let result = rockPaperScissors "SSPR"
  Assert.Equal (Paper, result.Value)







