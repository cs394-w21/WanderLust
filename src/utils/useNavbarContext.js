import React from "react";
import ExploreIcon from "@material-ui/icons/Explore";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CardTravelIcon from "@material-ui/icons/CardTravel";

const NavbarContext = React.createContext(null);

const useNavbar = () => {
  const ctx = React.useContext(NavbarContext);
  if (ctx === undefined) {
    throw new Error("You must use useNavbar inside of its provider.");
  }
  return ctx;
};

const useNavbarConfig = (config) => {
  const { onClickTrips } = config;
  return React.useMemo(() => {
    return [
      {
        label: "Explore",
        icon: <ExploreIcon />,
      },
      {
        label: "Trips",
        icon: <CardTravelIcon />,
        onClick: onClickTrips,
      },
      {
        label: "Camera",
        icon: <AddAPhotoIcon />,
      },
    ];
  }, [onClickTrips]);
}

const useBottomTabs = () => {
  const [tripsOpen, setTripsOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const openTrips = React.useCallback(() => {
    setTripsOpen(true);
  }, []);
  const NavbarConfig = useNavbarConfig({ onClickTrips: openTrips });
  const closeTrips = React.useCallback(() => {
    setTripsOpen(false);
    setTabValue(NavbarConfig.findIndex((el) => el.label === "Explore"));
  }, [NavbarConfig]);
  const handleTabChange = React.useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue]
  );
  return {
    tripsOpen,
    openTrips,
    closeTrips,
    handleTabChange,
    tabValue,
    setTabValue,
    NavbarConfig,
  };
};

export const NavbarProvider = (props) => {
  const { children } = props;
  const bottomTabs = useBottomTabs();
  return (
    <NavbarContext.Provider value={bottomTabs}>
      {children}
    </NavbarContext.Provider>
  );
};

export default useNavbar;
