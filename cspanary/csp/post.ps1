

$body = @"
  { sample: "text" }
"@

$headers = @{
  Cookie= "Cookies ya"
}

Invoke-WebRequest `
  -Method Post `
  -Body $body `
  -Headers $headers `
  Uri "http://localhost:8000"




