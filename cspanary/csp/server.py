#!/usr/bin/python
from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header("Content-Security-Policy", "default-src 'self'; report-uri http://localhost:8000/ ")
        #self.send_header("Content-Security-Policy-Report-Only", "default-src 'self'; report-uri /")
        self.end_headers()



        with open('index.html', 'rb') as fh:
            html = fh.read()
            #html = bytes(html, 'utf8')
            self.wfile.write(html)

        #self.wfile.write(b"Hello, World!\n")

        #self.wfile.write('Hello, world!')
        #self.wfile.write('')
        #self.wfile.write(b'<script src="http://badsite.com/so.js" />')

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length).decode("UTF-8")
        #cookie = self.headers['Cookie'] #.decode("UTF-8")
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        print("body: " + body)
        print("\n")
        #print("Cookie: " + cookie)
        self.wfile.write(response.getvalue())
        f = open("logs.txt", "w")
        try:
            f.write(body)
        finally:
            f.close()

httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
print ("Serving on http://localhost:8000")
httpd.serve_forever()


