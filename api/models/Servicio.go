package models

type Servicio struct {
	Identificacion    string `gorm:"type:varchar(20);not null;primaryKey"`
	Servicio          string `gorm:"type:varchar(80);not null;primaryKey"`
	FechaInicio       string `gorm:"type:date;not null"`
	UltimaFacturacion string `gorm:"type:date;not null"`
	UltimoPago        int    `gorm:"not null;default:0"`
}
