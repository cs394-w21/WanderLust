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

const useNavbarConfig = () => {
  return React.useMemo(() => {
    return [
      {
        label: "Explore",
        icon: <ExploreIcon />,
      },
      {
        label: "Trips",
        icon: <CardTravelIcon />,
      },
      {
        label: "Camera",
        icon: <AddAPhotoIcon />,
      },
    ];
  }, []);
}

const useBottomTabs = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const NavbarConfig = useNavbarConfig();
  const openTrips = React.useCallback(() => {
    setTabValue(NavbarConfig.findIndex((el) => el.label === 'Trips'))
  }, [NavbarConfig]);
  const closeTrips = React.useCallback(() => {
    setTabValue(NavbarConfig.findIndex((el) => el.label === "Explore"));
  }, [NavbarConfig]);
  const handleTabChange = React.useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue]
  );
  return {
    openTrips,
    closeTrips,
    handleTabChange,
    tabValue,
    setTabValue,
    currentTab: NavbarConfig[tabValue]?.label,
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
