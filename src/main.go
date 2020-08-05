package main

import (
	"config"
	"log"
	"net/http"
	"os"
	"services/translator"
	"workers"
)

func initRequestsFolder() {
	requestsPath := config.GetConfig().RequestsFolderPath
	if _, err := os.Stat(requestsPath); os.IsNotExist(err) {
		os.Mkdir(requestsPath, os.ModePerm)
	}
}

func main() {
	initRequestsFolder()

	mux := http.NewServeMux()

	workers.RunGarbageCollector()

	translator.SetupRoutes(mux)

	log.Println("Starting...")
	log.Fatal(http.ListenAndServe(":8080", mux))

}
