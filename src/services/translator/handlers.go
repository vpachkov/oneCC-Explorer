package translator

import (
	"config"
	"log"
	"os"
	"os/exec"
	"strconv"
	"time"
)

func handleTranslate(request handleTranslateRequest) handleTranslateResponse {
	response := handleTranslateResponse{}
	filePath := config.GetConfig().RequestsFolderPath + "/" + strconv.FormatInt(time.Now().Unix(), 10)

	f, err := os.OpenFile(filePath, os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		response.Error = "Unexpected error in " + Service
		log.Panic(err)
	}
	defer f.Close()

	_, err = f.Write([]byte(request.SourceCode))
	if err != nil {
		response.Error = "Unexpected error in " + Service
		log.Println(err)
	}

	cmd := exec.Command(config.GetConfig().OneCCPath, "-f", filePath, "-p", request.Platform)
	stdout, err := cmd.Output()

	if err != nil {
		response.Error = "Unexpected error in " + Service
		log.Println(err)
	}

	response.TranslatedCode = string(stdout)

	return response
}
