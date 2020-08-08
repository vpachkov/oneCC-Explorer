package translator

import "net/http"

const Service = "Translator"

func SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/"+Service+".translate", _handleTranslate)
}
