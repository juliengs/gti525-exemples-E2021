#!/usr/bin/python3
# Serveur python 

import http.server
import socketserver
import random
import json
from time import sleep

PORT = 8090	# Numéro de port à écouter

images = ["one.jpg", "two.jpg", "three.jpg", "four.jpg", "five.jpg"]
imgCount = 50

class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
	def do_GET(self):
		if self.path == '/ajax':
			# Si requête "AJAX", envoyer la réponse

			self.send_response(200)

			self.send_header('Content-type','application/json')
			self.end_headers()

			count = random.randint(1, 30)
			obj = {}
			for i in range(0, count):
					key = random.randint(0, 29)
					value = images[random.randint(0,len(images)-1)]
					obj[key] = "images/" + value
			print(obj)
			jsonObj = json.dumps(obj)

			self.wfile.write(bytes(jsonObj, 'utf-8'))
			return

		else:
			# It's a request for a file - return the file
			return http.server.SimpleHTTPRequestHandler.do_GET(self)

Handler = MyRequestHandler
server = socketserver.TCPServer(('0.0.0.0', PORT), Handler)
print( "Démarrage du serveur sur le port: ", PORT)
server.serve_forever()
