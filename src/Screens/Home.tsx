import { Route, useNavigation } from "@react-navigation/native";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ROUTES } from "../Common/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserProfile, SetEditUserDetails } from "../Redux/userProfilesReducer";
import { cardPropsTypes } from "../types";

const Card: React.FC<cardPropsTypes> = ({ item }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.cardContainer}>
            <View>
                <Text>First name</Text>
                <Text>{item.first_name} </Text>
                <Text>Father name</Text>
                <Text>{item.father_name} </Text>
                <Text>Last name</Text>
                <Text>{item.last_name} </Text>
                <Text>Mobile number</Text>
                <Text>{item.mobileNo} </Text>
                <Text>Gender</Text>
                <Text>{item.gender == 1 ? "Male" : "female"} </Text>
            </View>
            <View style={styles.editUpdateContainer}>
                <TouchableOpacity onPress={() => {
                    dispatch(SetEditUserDetails(item));
                    navigation.replace(ROUTES.App.CREATEPROFILE)
                }}>
                    <Text>
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(removeUserProfile(item.id))}>
                    <Text>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const Home: React.FC = () => {
    const navigation = useNavigation()
    const { userProfiles } = useSelector(store => store.userProfiles)
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={userProfiles}
                renderItem={({ item, index }) => {
                    return <Card item={item} key={index} />
                }}
            />
            <Button title="Create user"
                onPress={() => navigation.replace(ROUTES.App.CREATEPROFILE)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 10,
        padding: 10,
        flexWrap: "wrap",
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 1,
    },
    editUpdateContainer: {
        paddingTop: 10,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    mainContainer: {
        margin: 10
    }
})
export default Home;