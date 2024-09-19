package routes

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/Joules17/backend/db"
	"github.com/Joules17/backend/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

// GetServicioById
func GetServiceById(id, service string) (*models.Servicio, error) {
	var servicio models.Servicio
	result := db.DB.Where("identificacion = ? AND servicio = ?", id, service).First(&servicio)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}

	return &servicio, nil
}

// InsertServicio into BD
func InsertService(service *models.Servicio) error {
	// Validate if client exists
	cliente, err := GetClientById(service.Identificacion)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Client not found, cannot create service
			return fmt.Errorf("cannot insert service: cliente with identificacion '%s' does not exist", service.Identificacion)
		}
		// Otro error al buscar el cliente
		return fmt.Errorf("error fetching cliente: %v", err)
	}

	if cliente == nil {
		return fmt.Errorf("cannot insert servicio: cliente with identificacion '%s' not found", service.Identificacion)
	}

	// Save Service
	if err := db.DB.Create(service).Error; err != nil {
		return fmt.Errorf("could not insert servicio: %v", err)
	}

	return nil
}

// UpdateServicio into BD
func UpdateService(existingService *models.Servicio, newServiceData *models.Servicio) error {
	// update fields directly
	existingService.FechaInicio = newServiceData.FechaInicio
	existingService.UltimaFacturacion = newServiceData.UltimaFacturacion
	existingService.UltimoPago = newServiceData.UltimoPago

	// Save Changes
	return db.DB.Save(existingService).Error
}

// Handlers
func GetServiciosHandler(w http.ResponseWriter, r *http.Request) {
	var servicios []models.Servicio
	result := db.DB.Find(&servicios)

	if result.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(result.Error.Error()))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(servicios)
}

func GetServicioHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	servicio := vars["servicio"]

	service, err := GetServiceById(id, servicio)
	if err != nil {
		// service not found
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Service Not Found"})
	}

	// Sending Service
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Service Result",
		"service": service,
	})
}

func UpsertServicioHandler(w http.ResponseWriter, r *http.Request) {
	var service models.Servicio

	// Decoding Body
	if err := json.NewDecoder(r.Body).Decode(&service); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// Validate if service already exists
	existingService, err := GetServiceById(service.Identificacion, service.Servicio)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		// error while searching for service
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	if existingService != nil {
		// service exists, then update it
		if updateErr := UpdateService(existingService, &service); updateErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": updateErr.Error()})
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":  "Service updated successfully",
			"servicio": service,
		})
	} else {
		// service does not exist, then create it
		if insertErr := InsertService(&service); insertErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(insertErr.Error()))
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":  "Service created successfully",
			"servicio": service,
		})
	}
}

func DeleteServicioHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	identificacion := vars["id"]
	servicio := vars["servicio"]

	var service models.Servicio
	result := db.DB.Where("identificacion = ? AND servicio = ?", identificacion, servicio).First(&service)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"error": "Service not found"})
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": result.Error.Error()})
		}
		return
	}

	deleteResult := db.DB.Delete(&service)
	if deleteResult.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": deleteResult.Error.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	response := map[string]string{"message": "Service deleted successfully"}
	json.NewEncoder(w).Encode(response)
}
