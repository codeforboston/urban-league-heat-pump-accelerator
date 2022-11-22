import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { itemApi } from "../../../redux/services";

export const ItemList = () => {
    const { data: items } = itemApi.useGetAllQuery();
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    {items.map(({ id, name }) => (
                        <Typography key={id}>{name}</Typography>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};
