import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { formatDate, formatMoney } from "../utility/format";
import ServiceForm from "./ServiceForm";
export default function ResultList({ clients, handlerCreateService }) {
  const [formOpen, setFormOpen] = useState(false);
  const [personSelected, setPersonSelected] = useState({});
  const handlerOpen = (person) => {
    setPersonSelected(person);
    setFormOpen(true);
  };

  const handlerClose = () => {
    setFormOpen(false);
  };

  if (clients === undefined) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (clients.length === 0) {
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Typography>Parece que aun no hay clientes registrados</Typography>
    </Box>;
  }

  return (
    <List
      sx={{
        display: "grid",
        px: 30,
        py: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
      }}
    >
      {clients.map((person, index) => (
        <Sheet
          key={index}
          component="li"
          variant="outlined"
          sx={{ borderRadius: "sm", p: 2, listStyle: "none" }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              variant="outlined"
              src={person.avatar2x}
              srcSet={`${person.avatar2x} 2x`}
              sx={{ borderRadius: "50%" }}
            />
            <div>
              <Typography level="title-md">
                {person.Nombres} {person.Apellidos}
              </Typography>
              <Typography level="body-xs">
                {person.TipoIdentificacion} {person.Identificacion}
              </Typography>
            </div>
          </Box>
          <Divider component="div" sx={{ my: 2 }} />
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={formOpen}
            onClose={handlerClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <ServiceForm
                person={personSelected}
                handlerClose={handlerClose}
                handlerCreateService={handlerCreateService}
              />
            </Sheet>
          </Modal>
          <List sx={{ "--ListItemDecorator-size": "40px", gap: 2 }}>
            {person.Servicios.map((service, serviceIndex) => (
              <ListItem key={serviceIndex} sx={{ alignItems: "flex-start" }}>
                <ListItemDecorator
                  sx={{
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      height: "100%",
                      width: "1px",
                      bgcolor: "divider",
                      left: "calc(var(--ListItem-paddingLeft) + 12px)",
                      top: "50%",
                    },
                  }}
                >
                  <Avatar src={service.logo} sx={{ "--Avatar-size": "24px" }} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="title-sm">{service.Servicio}</Typography>
                  <Typography level="body-xs">
                    Inicio: {formatDate(service.FechaInicio)}
                  </Typography>
                </ListItemContent>
                <Typography level="body-xs">
                  {formatMoney(service.UltimoPago)}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Button
            size="sm"
            variant="plain"
            sx={{ px: 1, mt: 1 }}
            onClick={() => {
              handlerOpen(person);
            }}
          >
            Agregar servicio
          </Button>
        </Sheet>
      ))}
    </List>
  );
}
