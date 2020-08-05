package config

import (
	"os"
	"sync"
	"time"
)

type Config struct {
	GC                 GarbageCollectorConfig
	OneCCPath          string // contains an absolute path to the compiler binary
	RequestsFolderPath string // contains an absolute path to the folder with client's sources
}

type GarbageCollectorConfig struct {
	RequestsCollectionTtl int           // sources, exceeded ttl will be deleted
	Timeout               time.Duration // runs gc every Timeout seconds
}

var instance *Config
var once sync.Once

func GetConfig() *Config {
	once.Do(func() {
		instance = &Config{
			OneCCPath:          os.Getenv("GOPATH") + "/oneCC/oneCC",
			RequestsFolderPath: os.Getenv("GOPATH") + "/requests",
			GC:                 GarbageCollectorConfig{Timeout: time.Duration(2), RequestsCollectionTtl: 2 * 60},
		}
	})
	return instance
}
