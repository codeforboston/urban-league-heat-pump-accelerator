import React, { useState, useCallback, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { itemApi } from "../../../redux/services";
import { MiniModal } from "./MiniModal";

export const ItemAdder = () => {
    const [newItem, setNewItem] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [updateItem, { error, isError }] = itemApi.useUpdateItemsMutation();

    const handleAddNewItem = useCallback(
        (itemToAdd) => {
            if (itemToAdd.trim().length === 0) {
                const msg = "Must enter item name!";
                setNewItem("");
                setErrorMsg(msg);
                throw Error(msg);
            }

            if (!isNaN(Number(itemToAdd.trim()))) {
                const msg = "Cannot add numbers as item names!";
                setNewItem("");
                setErrorMsg(msg);
                throw Error(msg);
            }

            // we only care about the name, the rest is req bc of database
            const payload = {
                name: itemToAdd,
                color: "various",
                qty: 100,
            };

            updateItem(payload);
            setNewItem("");
        },
        [updateItem]
    );

    useEffect(() => {
        if (isError) {
            setErrorMsg(error?.data?.details);
        }
    }, [isError, error]);

    return (
        <Box>
            <TextField
                id="filled-basic"
                label="New Item Name"
                variant="filled"
                size="small"
                onChange={(e) => setNewItem(e.target.value)}
                value={newItem}
            />
            <br />
            <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: 1 }}
                onClick={() => handleAddNewItem(newItem.trim())}
            >
                Add New Item
            </Button>

            <MiniModal
                open={!!errorMsg}
                onClose={() => setErrorMsg("")}
                dialog={errorMsg}
            />
        </Box>
    );
};
