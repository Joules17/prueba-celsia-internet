package models

type Cliente struct {
	Identificacion     string     `gorm:"type:varchar(20);not null;primaryKey"`
	Nombres            string     `gorm:"type:varchar(80);not null"`
	Apellidos          string     `gorm:"type:varchar(80);not null"`
	TipoIdentificacion string     `gorm:"type:varchar(2);not null"`
	FechaNacimiento    string     `gorm:"type:date;not null"`
	NumeroCelular      string     `gorm:"type:varchar(20);not null"`
	CorreoElectronico  string     `gorm:"type:varchar(80);not null"`
	Servicios          []Servicio `gorm:"foreignKey:Identificacion;references:Identificacion;constraint:OnUpdate:CASCADE,OnDelete:NO ACTION"`
}
