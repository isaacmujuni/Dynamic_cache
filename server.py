#!/usr/bin/env python3
"""
Simple HTTP server for Dynamic Code Studio
Run this script to serve the application locally with proper CORS headers
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def run_server(port=8000):
    """Run the HTTP server on the specified port"""
    try:
        # Change to the directory containing this script
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        
        with socketserver.TCPServer(("", port), CORSHTTPRequestHandler) as httpd:
            print(f"🚀 Dynamic Code Studio server starting...")
            print(f"📍 Server running at: http://localhost:{port}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print(f"🌐 Open http://localhost:{port} in your browser")
            print(f"⏹️  Press Ctrl+C to stop the server")
            print("-" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python server.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Get port from command line argument or use default
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ Invalid port number. Using default port 8000.")
    
    run_server(port)
