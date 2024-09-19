# Etapa de construcción
FROM golang:1.22 AS build

WORKDIR /api

COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app .

FROM alpine:latest

WORKDIR /app

COPY --from=build /api/app /app/app

RUN chmod +x /app/app

EXPOSE 8080

ENTRYPOINT ["/app/app"]