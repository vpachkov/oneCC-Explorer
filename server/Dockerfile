FROM ubuntu:latest as oneCC-builder
COPY ./depends/oneCC /app
WORKDIR /app
RUN apt-get update -y && apt-get install -y g++-10  make && make


FROM golang:latest as golang_builder
COPY ./src /server/src
WORKDIR /server
ENV GOPATH=/server
RUN go build src/main.go


FROM ubuntu:latest
COPY --from=golang_builder /server/main /server/
COPY --from=oneCC-builder app/oneCC /server/depends/oneCC/oneCC
WORKDIR /server
ENV GOPATH=/server
CMD ["./main"]
