import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { logout } from "@api/user";

function SidebarMorePopup({ anchorEl, handleClosePopup }) {
  const open = Boolean(anchorEl);

  const handleChoose = (event) => {
    switch (event.currentTarget.id) {
      case "opt_logout":
        logout();
        break;

      default:
        break;
    }
    handleClosePopup();
  };
  return (
    <Menu
      id="option_menu"
      aria-labelledby="options menu"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopup}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      <MenuItem id="opt_logout" onClick={handleChoose}>
        Log out
      </MenuItem>
    </Menu>
  );
}

export default SidebarMorePopup;
