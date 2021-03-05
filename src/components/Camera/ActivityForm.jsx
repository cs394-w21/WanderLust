import React from "react";
import { useField } from "formik";
import Typography from "@material-ui/core/Typography";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import HotelIcon from "@material-ui/icons/Hotel";
import Flex from "../../components/Flex";

const ActivityIcon = (props) => {
  const { IconComponent, name } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, _, helpers] = useField(name);
  // field.value => true or false
  const onClick = React.useCallback(() => {
    helpers.setValue(!field.value);
  }, [field.value, helpers]);
  return (
    <Flex paddingRight="10px">
      <IconComponent
        fontSize="large"
        onClick={onClick}
        color={field.value ? "inherit" : "disabled"}
      />
    </Flex>
  );
  // onClick, change the color and set the field in the form to true
};

const ActivitySelect = ({ name }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Typography>Select Activity Type</Typography>
      <Flex justifyContent="center">
        <ActivityIcon
          IconComponent={RestaurantIcon}
          name="restaurant"
          label="Restaraunt"
        />
        <ActivityIcon IconComponent={LocalBarIcon} name="bar" label="Bar" />
        <ActivityIcon
          IconComponent={DirectionsWalkIcon}
          name="activity"
          label="Activity"
        />
        <ActivityIcon IconComponent={LocalMallIcon} name="shop" label="Shop" />
        <ActivityIcon
          IconComponent={HotelIcon}
          name="lodging"
          label="Lodging"
        />
      </Flex>
    </Flex>
  );
};

export default ActivitySelect;
