Site for exploring oneCC (One C compiler) possibilities

## Development Section
### Requirements
* go
* nodejs
### Launching Project
#### Backend
* Go to the server source folder
```
cd server
```
* Set GOPATH, so go compiler can deal with packages (**set an absolute path**)
```
pwd
export GOPATH=/some/global/path/server
```
* Then, you are ready to run the server
```
go run src/main.go
```
#### Frontend
* Go to the frontend source folder
```
cd ui
```
* Install requirements
```
npm i
```
* Launch the server
```
npm start
```
