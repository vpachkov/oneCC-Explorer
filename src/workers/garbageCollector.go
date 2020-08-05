package workers

import (
	"config"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"time"
)

type GarbageCollector struct {
	baseWorker BaseWorker
}

func (bw *GarbageCollector) start() {
	bw.baseWorker.createInterval(func() {
		fileInfo, err := ioutil.ReadDir("requests")
		if err != nil {
			log.Fatal(err)
			return
		}
		for _, file := range fileInfo {
			i1, err := strconv.Atoi(file.Name())
			if err == nil {
				if int64(i1+config.GetConfig().GC.RequestsCollectionTtl) < time.Now().Unix() {
					err := os.Remove("requests/" + file.Name())
					if err != nil {
						log.Panic(err)
					}
					log.Println(file.Name())
				}
			}
		}
	})
}

func RunGarbageCollector() {
	gc := GarbageCollector{baseWorker: BaseWorker{timeout: config.GetConfig().GC.Timeout}}
	gc.start()
}
