export interface userDetailsTypes {
    id: number,
    first_name: string,
    last_name: string,
    father_name: string,
    mobileNo: string,
    gender: number
}

export interface cardPropsTypes {
    item: userDetailsTypes
}

export interface dropdownItemsTypes {
    label: string,
    value: number
}

export interface userProfileState {
    userProfiles: userDetailsTypes[],
    editUserDetails: userDetailsTypes | null
}
