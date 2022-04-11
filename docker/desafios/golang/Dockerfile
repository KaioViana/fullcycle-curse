FROM golang:1.18.0-alpine3.15 AS builder

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build  -o /usr/local/bin/app


FROM scratch

WORKDIR /usr/src/app

COPY --from=builder /usr/local/bin/app /usr/local/bin/app

CMD [ "app" ]