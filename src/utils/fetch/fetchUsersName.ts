import {supabase} from "../../supabase/supabase";

export async function fetchUsersName() {
    const { data: userData, error } = await supabase
        .from('users')
        .select('id, email, name')

    if (error) {
        console.error("Error in getProductNames:", error);
        return [];
    }
    return userData
}
