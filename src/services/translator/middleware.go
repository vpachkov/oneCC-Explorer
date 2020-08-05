package translator

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func _handleTranslate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	var request handleTranslateRequest
	err = json.Unmarshal(b, &request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	response := handleTranslate(request)
	if response.Error == "" {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}
	resp, err := json.Marshal(response)

	w.Write([]byte(string(resp)))

}
