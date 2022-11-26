package main

import (
	"log"
	"net/http"
	"os"
	"text/template"
)

type IndexHtmlData struct {
	SseServerUrl      string
	PicoBloggerApiUrl string
}

// set default port number if env var $PORT isn't set
func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func main() {
	port := getEnv("PORT", "8080")
	sseServerUrl := getEnv("SSESERVER", "https://emojisse-4uotx33u2a-uc.a.run.app/events")
	picobloggerApiUrl := getEnv("PICOBLOGGER-API", "https://picoblogger-4uotx33u2a-uc.a.run.app/blogposts")

	tmpl := template.Must(template.ParseFiles("templates/indexTemplate.html"))

	//fs := http.FileServer(http.Dir("./static"))
	//http.Handle("/", fs)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := IndexHtmlData{
			SseServerUrl:      sseServerUrl,
			PicoBloggerApiUrl: picobloggerApiUrl,
		}
		tmpl.Execute(w, data)
	})

	// handle javascript content serving
	//fs := http.FileServer(http.Dir("./scripts"))
	//http.Handle("/scripts/", fs)
	http.Handle("/scripts/", http.StripPrefix("/scripts/", http.FileServer(http.Dir("./scripts"))))

	log.Printf("Listening on :%s...", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal(err)
	}

}
