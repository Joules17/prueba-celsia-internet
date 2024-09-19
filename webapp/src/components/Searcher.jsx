import { Person2Rounded, PersonSearch } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import ClientForm from "./ClientForm";
export default function Searcher({ handlerCreateClient }) {
  const [formOpen, setFormOpen] = useState(false);

  const handlerOpen = () => {
    setFormOpen(true);
  };

  const handlerClose = () => {
    setFormOpen(false);
  };

  return (
    <Box
      sx={{
        borderRight: "1px solid",
        borderColor: "solidBorder",
        py: 2,
        px: 30,
      }}
    >
      <Box
        sx={{
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography level="title-lg" textColor="text.secondary" component="h1">
          Clientes
        </Typography>
        <Button
          startDecorator={<Person2Rounded />}
          size="sm"
          onClick={handlerOpen}
        >
          Agregar Cliente
        </Button>
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
            sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <ClientForm
              handlerClose={handlerClose}
              handlerCreateClient={handlerCreateClient}
            />
          </Sheet>
        </Modal>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography level="title-md">Buscar clientes</Typography>
        <Button size="sm" variant="plain">
          Filtro
        </Button>
      </Box>
      <Box
        sx={{
          px: 2,
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          size="sm"
          variant="outlined"
          placeholder="Buscar cliente…"
          startDecorator={<PersonSearch color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: "background.level1" }}
            >
              <Typography level="title-sm" textColor="text.icon">
                Buscar
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: "center",
            width: "80%",
          }}
        />
      </Box>
    </Box>
  );
}
