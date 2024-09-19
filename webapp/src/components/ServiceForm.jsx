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

export default function ServiceForm({
  handlerClose,
  person,
  handlerCreateService,
}) {
  const servicioOpt = [
    { value: "Internet 200 MB", label: "Internet 200 MB" },
    { value: "Internet 400 MB", label: "Internet 400 MB" },
    { value: "Directv Go", label: "Directv Go" },
    { value: "Paramount+", label: "Paramount+" },
    { value: "Win+", label: "Win+" },
  ];

  const [formData, setFormData] = useState({
    Identificacion: person.Identificacion,
    Servicio: "",
    FechaInicio: "",
    UltimaFacturacion: "",
    UltimoPago: 0,
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
      Servicio: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    var parsedValue = parseInt(formData.UltimoPago);
    formData.UltimoPago = parsedValue;
    console.log(typeof formData.UltimoPago);
    handlerCreateService(formData);
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
        Crear Servicio
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
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Identificacion</FormLabel>
            <Input
              name="Identificacion"
              value={person.Identificacion}
              disabled
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Servicio</FormLabel>
            <Select
              name="Servicio"
              value={formData.Servicio}
              onChange={handleSelectChange}
              placeholder="Opcion de servicio"
              required
            >
              {servicioOpt.map((tipo) => (
                <Option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 12" }}>
          <FormControl>
            <FormLabel>Fecha Inicio</FormLabel>
            <Input
              name="FechaInicio"
              type="date"
              value={formData.FechaInicio}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Ultima Facturacion</FormLabel>
            <Input
              name="UltimaFacturacion"
              type="date"
              value={formData.UltimaFacturacion}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Box>
        <Box sx={{ gridColumn: "span 6" }}>
          <FormControl>
            <FormLabel>Ultimo Pago</FormLabel>
            <Input
              name="UltimoPago"
              type="number"
              value={formData.UltimoPago}
              onChange={handleChange}
              placeholder="UltimoPago"
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
            Agregar Servicio
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
