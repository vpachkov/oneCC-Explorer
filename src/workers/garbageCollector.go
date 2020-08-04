package workers

import (
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
				if int64(i1 + 5 * 60) < time.Now().Unix()  {
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
	gc := GarbageCollector{ baseWorker: BaseWorker{ timeout: 2 } }
	gc.start()
}
