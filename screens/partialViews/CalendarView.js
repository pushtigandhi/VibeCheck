import { View, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { DailyCalendar } from './DailyCalendar';
import { WeeklyCalendar } from './WeeklyCalendar';
import { MonthlyCalendar } from './MonthlyCalendar';

export const CalendarView = ({state, refreshing, onRefresh }) => {
    console.log(state);
    return(
        <View
            refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
            }
        >
            {state === 'day' && (
                <DailyCalendar />
            )}
            {state === 'week' && (
                <WeeklyCalendar />
            )}
            {state === 'month' && (
                <MonthlyCalendar month={0} startDay={0}/>
            )}
        </View>
    );
};

