import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { addUserProfile, SetEditUserDetails, updateUserProfile } from "../Redux/userProfilesReducer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ROUTES } from "../Common/constants";
import { dropdownItemsTypes, userDetailsTypes } from "../types";

interface inputProps extends TextInputProps {
    label: string
}

const CommonTextInput: React.FC<inputProps> = ({ label, ...rest }) => {
    return (
        <View style={{ paddingBottom: 10 }}>
            <Text>{label}</Text>
            <TextInput
                style={{ borderWidth: 1, borderRadius: 8, borderColor: "grey" }}
                {...rest}
            />
        </View>
    )
}

const CreateProfile: React.FC = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { editUserDetails } = useSelector(store => store.userProfiles)

    const [userDetails, setuserDetails] = useState<userDetailsTypes>({
        id: editUserDetails ? editUserDetails?.id : Date.now(),
        first_name: editUserDetails ? editUserDetails?.first_name : "",
        last_name: editUserDetails ? editUserDetails?.last_name : "",
        father_name: editUserDetails ? editUserDetails?.father_name : "",
        mobileNo: editUserDetails ? editUserDetails?.mobileNo : "",
        gender: editUserDetails ? editUserDetails?.gender : 0
    });

    const [openDd, setOpenDd] = useState<boolean>(false)
    const dropDownItems: dropdownItemsTypes[] = [
        {
            label: "Male",
            value: 1
        },
        {
            label: "Female",
            value: 2
        },
    ]
    const onChangeInput = (type: string, value: string | number | undefined) => {
        setuserDetails({
            ...userDetails,
            [type]: value
        })
    }

    const onSubmit = () => {
        if (editUserDetails) {
            dispatch(updateUserProfile(userDetails));
            dispatch(SetEditUserDetails(null));
            navigation.replace(ROUTES.App.HOME);
        } else {
            dispatch(addUserProfile(userDetails))
            dispatch(SetEditUserDetails(null));
            navigation.replace(ROUTES.App.HOME)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.backContainer}>
                <Text onPress={() => { dispatch(SetEditUserDetails(null)); navigation.replace(ROUTES.App.HOME) }}>Back</Text>
                <Text style={styles.header}>Create Profile</Text>
            </View>
            <CommonTextInput
                label="First name"
                value={userDetails.first_name}
                onChangeText={(text) => onChangeInput("first_name", text)}
                placeholder="Enter first name"
            />
            <CommonTextInput
                label="father name"
                value={userDetails.father_name}
                onChangeText={(text) => onChangeInput("father_name", text)}
                placeholder="Enter father name"
            />
            <CommonTextInput
                label="Last name"
                value={userDetails.last_name}
                onChangeText={(text) => onChangeInput("last_name", text)}
                placeholder="Enter last name"
            />
            <CommonTextInput
                label="Mobile number"
                value={userDetails.mobileNo}
                onChangeText={(text) => onChangeInput("mobileNo", text)}
                placeholder="Enter mobile"
                keyboardType="numeric"
                maxLength={10}
            />
            <Text>Gender</Text>
            <DropDownPicker
                style={{
                    borderColor: 'grey',
                    backgroundColor: '#grey',
                    borderWidth: 1,
                    borderRadius: 8,
                }}
                open={openDd}
                setOpen={setOpenDd}
                onSelectItem={item => onChangeInput('gender', item.value)}
                value={userDetails.gender}
                items={dropDownItems}
                showArrowIcon={true}
                placeholder="Select gender"
            />
            <View style={{ paddingTop: 10 }}>
                <Button title="Submit" onPress={onSubmit} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginVertical: 24,
        marginHorizontal: 16
    },
    backContainer: {
        paddingBottom: 18,
        flexDirection: "row"
    },
    header: {
        paddingLeft: 10,
        fontWeight: "bold",
        fontSize: 20
    }
})
export default CreateProfile;