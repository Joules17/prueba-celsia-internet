package routes

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/Joules17/backend/db"
	"github.com/Joules17/backend/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// GetClientById
func GetClientById(id string) (*models.Cliente, error) {
	var client models.Cliente
	result := db.DB.Preload("Servicios").Where("identificacion = ?", id).First(&client)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}

	return &client, nil
}

// InsertClient into BD
func InsertClient(client *models.Cliente) error {
	// save Client
	if err := db.DB.Create(client).Error; err != nil {
		return err
	}

	return nil
}

// UpdateClient in BD
func UpdateClient(existingClient *models.Cliente, newClientData *models.Cliente) error {
	// update fields directly
	existingClient.Nombres = newClientData.Nombres
	existingClient.Apellidos = newClientData.Apellidos
	existingClient.NumeroCelular = newClientData.NumeroCelular
	existingClient.CorreoElectronico = newClientData.CorreoElectronico

	// Save Changes
	return db.DB.Save(existingClient).Error
}

// Handlers
func GetClientesHandler(w http.ResponseWriter, r *http.Request) {
	var clients []models.Cliente
	result := db.DB.Preload("Servicios").Find(&clients)

	if result.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(result.Error.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(clients)
}

func GetClienteHandler(w http.ResponseWriter, r *http.Request) {
	// extract idClient
	vars := mux.Vars(r)
	id := vars["id"]

	client, err := GetClientById(id)
	if err != nil {
		// client not found
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Client Not Found"})
	}

	// Sending Client
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Client result",
		"client":  client,
	})
}

func UpsertClienteHandler(w http.ResponseWriter, r *http.Request) {
	var client models.Cliente
	// Decoding body
	if err := json.NewDecoder(r.Body).Decode(&client); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Validate if client already exists
	existingClient, err := GetClientById(client.Identificacion)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		// Error while searching for client
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	if existingClient != nil {
		// client exists, then update it
		if updateErr := UpdateClient(existingClient, &client); updateErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": updateErr.Error()})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Client updated successfully",
			"client":  client,
		})
	} else {
		// client not exists, then create it
		if insertErr := InsertClient(&client); insertErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(insertErr.Error()))
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Client created successfully",
			"client":  client,
		})
	}
}

func DeleteClienteHandler(w http.ResponseWriter, r *http.Request) {
	// Extract ID client
	vars := mux.Vars(r)
	id := vars["id"]

	// Search Client in the BD
	var client models.Cliente
	result := db.DB.Where("identificacion = ?", id).First(&client)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			// Client Not Found
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "Client not found"})
		} else {
			// Otro error while searching
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": result.Error.Error()})
		}
		return
	}

	// Delete Client
	deleteResult := db.DB.Delete(&client)
	if deleteResult.Error != nil {
		// Error while deleting
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": deleteResult.Error.Error()})
		return
	}

	// Client deleted
	w.WriteHeader(http.StatusOK)
	response := map[string]string{"message": "Client deleted successfully"}
	json.NewEncoder(w).Encode(response)
}
