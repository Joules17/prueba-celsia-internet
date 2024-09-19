import { Box, Button, Stack } from "@mui/joy";
import React from "react";
export default function Header() {
  return (
    <Box
      sx={{
        py: 2,
        px: 30,
        gap: 2,
        bgcolor: "primary.solidBg",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gridColumn: "1/ -1",
        borderBottom: "1px solid solidBorder",
        boderColor: "solidBorder",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Button
          color="neutral"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Clientes
        </Button>
      </Stack>
    </Box>
  );
}
