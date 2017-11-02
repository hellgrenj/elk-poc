package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/heatxsink/go-logstash" // its ok if your IDE/editor-with-fancy-plugins warns about this not being "in your GOPATH" .. it will be in the container
)

func handler(writer http.ResponseWriter, reader *http.Request) {
	name := reader.URL.Path[1:]
	if name == "favicon.ico" {
		return
	}
	l := logstash.New("elk", 9999, 5)
	_, err := l.Connect()
	if err != nil {
		fmt.Println(err)
	}
	err = l.Writeln("hello from Go")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(name)
	fmt.Fprintf(writer, "Hi there, I love %s!", name)
}

func main() {
	http.HandleFunc("/", handler)
	log.Print("now listening on port 1337")
	http.ListenAndServe(":1337", nil)
	
}