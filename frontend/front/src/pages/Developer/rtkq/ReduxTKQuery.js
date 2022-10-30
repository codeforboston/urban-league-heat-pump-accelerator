import React, { useState } from "react";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Typography,
} from "@mui/material";
import { ItemAdder } from "./ItemAdder";
import { ItemList } from "./ItemList";
import { MiniModal } from "./MiniModal";
import { itemApi } from "../../../redux/services";

export const ReduxTKQuery = () => {
    const [isListShown, setIsListShown] = useState(false);

    const { isLoading: isItemsLoading, isFetching } = itemApi.useGetAllQuery();

    return (
        <Container>
            <Box marginY={3}>
                <Typography marginY={3} variant="h3">
                    Redux ToolKit Query sample
                </Typography>
                <ItemAdder />

                <Divider sx={{ marginY: 3 }}>
                    <Chip label="Item List" color="primary" />
                </Divider>

                <Button
                    variant="contained"
                    color={isListShown ? "error" : "success"}
                    onClick={() => setIsListShown(!isListShown)}
                >
                    {isListShown ? "Hide" : "Show"} List
                </Button>
                {isListShown && <ItemList />}
            </Box>

            <MiniModal
                open={isItemsLoading || isFetching}
                dialog={
                    <Box>
                        Fetching items
                        <br />
                        <CircularProgress color="inherit" />
                    </Box>
                }
            />
        </Container>
    );
};
