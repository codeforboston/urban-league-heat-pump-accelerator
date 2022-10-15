import React, { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const DrawerComp = () => {
        const [openDrawer, setOpenDrawer] = useState(false)
    return  (
        <React.Fragment>
            <Drawer open={openDrawer}
            onClose={()=>setOpenDrawer(false)}
            >
                <List>
                    <ListItemButton onClick={()=> setOpenDrawer(false)} component={Link} to=''>
                            <ListItemIcon>
                                <ListItemText>HOME</ListItemText>
                            </ListItemIcon>
                    </ListItemButton> 
                    <ListItemButton onClick={()=> setOpenDrawer(false)} component={Link} to='about'>
                            <ListItemIcon>
                                <ListItemText>ABOUT</ListItemText>
                            </ListItemIcon>
                    </ListItemButton> 
                    <ListItemButton onClick={()=> setOpenDrawer(false)} component={Link} to='contact'>
                            <ListItemIcon>
                                <ListItemText>CONTACT</ListItemText>
                            </ListItemIcon>
                    </ListItemButton> 
                    <ListItemButton onClick={()=> setOpenDrawer(false)} component={Link} to='cta'>
                            <ListItemIcon>
                                <ListItemText>LEARN MORE</ListItemText>
                            </ListItemIcon>
                    </ListItemButton> 
                </List>
            </Drawer>
            <IconButton
            
            onClick={()=> setOpenDrawer(!openDrawer)}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2, marginLeft: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        </React.Fragment>
    );
};

export default DrawerComp;