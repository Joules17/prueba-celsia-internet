import { Person2Rounded } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

export default function ClientForm({ handlerClose, handlerCreateClient }) {
  const tipoId = [
    { value: "CC", label: "CC" },
    { value: "TI", label: "TI" },
    { value: "CE", label: "CE" },
    { value: "RC", label: "RC" },
  ];

  const [formData, setFormData] = useState({
    TipoIdentificacion: "",
    Identificacion: "",
    Nombres: "",
    Apellidos: "",
    NumeroCelular: "",
    CorreoElectronico: "",
    FechaNacimiento: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      TipoIdentificacion: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log(formData);
    handlerCreateClient(formData);
    handlerClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography
        component="h2"
        id="modal-title"
        level="h4"
        textColor="inherit"
        sx={{ fontWeight: "lg", mb: 1 }}
      >
        Crear Cliente
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ gridColumn: "span 3" }}>
          <FormControl>
            <FormLabel>Tipo Id</FormLabel>
            <Select
              name="TipoIdentificacion"
              value={formData.TipoIdentificacion}
              onChange={handleSelectChange}
              placeholder="Tipo de Identificación"
              required
            >
              {tipoId.map((tipo) => (
                <Option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 9" }}>
          <FormControl>
            <FormLabel>Identificacion</FormLabel>
            <Input
              name="Identificacion"
              value={formData.Identificacion}
              onChange={handleChange}
              placeholder="Ej. 123456789"
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Nombres</FormLabel>
            <Input
              name="Nombres"
              value={formData.Nombres}
              onChange={handleChange}
              placeholder="Ej. Juan Andres"
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Apellidos</FormLabel>
            <Input
              name="Apellidos"
              value={formData.Apellidos}
              onChange={handleChange}
              placeholder="Ej. Perez Quiñonez"
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Numero Celular</FormLabel>
            <Input
              name="NumeroCelular"
              type="tel"
              pattern="[0-9]*"
              value={formData.NumeroCelular}
              onChange={handleChange}
              placeholder="Número Celular"
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              name="CorreoElectronico"
              type="email"
              value={formData.CorreoElectronico}
              onChange={handleChange}
              placeholder="Ej. correo@ejemplo.com"
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 12" }}>
          <FormControl>
            <FormLabel>Fecha de Nacimiento</FormLabel>
            <Input
              name="FechaNacimiento"
              type="date"
              value={formData.FechaNacimiento}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 12" }}>
          <Button
            type="submit"
            startDecorator={<Person2Rounded />}
            size="sm"
            sx={{ width: "100%" }}
          >
            Agregar Cliente
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
