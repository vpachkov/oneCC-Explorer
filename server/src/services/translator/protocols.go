package translator

type handleTranslateRequest struct {
	Platform   string `json:"platform"`
	SourceCode string `json:"sourceCode"`
}

type handleTranslateResponse struct {
	TranslatedCode string `json:"translatedCode"`
	Error          string `json:"error"`
}
