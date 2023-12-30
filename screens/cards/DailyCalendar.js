import React from "react";
import { ToolBar } from "../../components/Toolbar";
import { SolidBars } from "../../assets/icons/SolidBars";
import { CalendarWeek } from "../../assets/icons/CalendarWeek";
import { PlusCircle } from "../../assets/icons/PlusCircle";
import { View, StyleSheet } from 'react-native';

export const Frame = () => {
  return (
    <View>
        <ToolBar
        calendarButtonsIcon={<CalendarWeek color="#229FD0" />}
        //calendarButtonsClass="tool-bar-3"
        //className={styles.toolBarInstance}
        mobile={true}
        override={<PlusCircle color="white" />}
        property1="week"
        searchIconColor="white"
        //searchPropertyDefaultClassName="tool-bar-2"
        sidebarToggleButtonIcon={<SolidBars color="#229FD0" />}
        //typographyClassName="design-component-instance-node"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  toolBarInstance: {
    borderColor: '#aad6e7',
    width: 'unset',
  },
  iconFontAwesome3: {
    height: 16,
    position: 'relative',
    width: 16,
  },
  designComponentInstanceNode: {
    color: '#229fd0',
  },
  toolBar2: {
    backgroundColor: '#aad6e7',
  },
  toolBar3: {
    backgroundColor: '#229fd0',
  },
});
