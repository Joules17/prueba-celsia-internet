package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host=postgres user=user password=user dbname=user port=5432"
var DB *gorm.DB

func DBConnection() {
	var err error
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Database connected")
	}
}
