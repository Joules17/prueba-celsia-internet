package main

import (
	"log"
	"net/http"

	"github.com/Joules17/backend/db"
	"github.com/Joules17/backend/models"
	"github.com/Joules17/backend/routes"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	db.DBConnection()
	log.Println("Database connected")

	db.DB.AutoMigrate(&models.Cliente{}, &models.Servicio{})
	log.Println("Tables migrated")

	r := mux.NewRouter()

	r.HandleFunc("/", routes.HomeHandler)
	// clients
	r.HandleFunc("/clientes", routes.GetClientesHandler).Methods("GET")
	r.HandleFunc("/clientes/{id}", routes.GetClienteHandler).Methods("GET")
	r.HandleFunc("/clientes", routes.UpsertClienteHandler).Methods("POST")
	r.HandleFunc("/clientes/{id}", routes.DeleteClienteHandler).Methods("DELETE")
	// services
	r.HandleFunc("/servicios", routes.GetServiciosHandler).Methods("GET")
	r.HandleFunc("/servicios/{id}/{servicio}", routes.GetServicioHandler).Methods("GET")
	r.HandleFunc("/servicios", routes.UpsertServicioHandler).Methods("POST")
	r.HandleFunc("/servicios/{id}/{servicio}", routes.DeleteServicioHandler).Methods("DELETE")

	// CORS
	// Aquí añades CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Permite tu frontend
		AllowedMethods:   []string{"GET", "POST", "DELETE"}, // Permite métodos específicos
		AllowedHeaders:   []string{"Content-Type"},          // Permite headers
		AllowCredentials: true,                              // Si necesitas enviar credenciales
	})

	// Envuelve el router con CORS
	handler := c.Handler(r)

	log.Println("Server running on port 8080")
	http.ListenAndServe(":8080", handler)
}
