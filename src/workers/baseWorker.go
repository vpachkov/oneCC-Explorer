package workers

import "time"

type BaseWorker struct {
	timeout time.Duration
}

func (bw *BaseWorker) createInterval(f func()) {
	ticker := time.NewTicker(bw.timeout * time.Second)
	quit := make(chan struct{})

	go func() {
		for {
			select {
			case <- ticker.C:
				f()
			case <- quit:
				ticker.Stop()
				return
			}
		}
	}()
}