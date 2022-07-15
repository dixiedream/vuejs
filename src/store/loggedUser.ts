import { reactive, watch, computed } from "vue";
import Storage from "../shared/StorageManager";
import ROLES from "../shared/UserRoles";
import UserState from "../@types/UserState";

const STORAGE_KEY = "loggedUser";

// Initial state
const defaultState = {
    user: {
        email: "",
        role: 0,
    },
    isLoggedIn: false,
};

// Persist storage
const getDefaultState = () => {
    const savedState = Storage.get(STORAGE_KEY);
    if (savedState) {
        return savedState;
    }

    return defaultState;
};

const state = reactive(getDefaultState());

const getUser = computed(() => state.user);
function setUser({ email, role = 0 }: UserState) {
    state.user.email = email;
    state.user.role = role;
}

const getIsLoggedIn = computed(() => state.isLoggedIn);
function setLoggedIn(isLoggedIn = true) {
    state.isLoggedIn = isLoggedIn;
    if (isLoggedIn === false) {
        const { email } = state.user;
        state.user = { ...defaultState.user, email };
    }
}

const isAdmin = computed(() => state.user.role === ROLES.ADMIN);

// Sync storage with state
watch(
    () => state,
    () => {
        Storage.save(STORAGE_KEY, state);
    },
    { deep: true },
);

// Create storage structure if not exists
const savedState = Storage.get(STORAGE_KEY);
if (!savedState) {
    Storage.save(STORAGE_KEY, state);
}

export default () => {
    return {
        user: getUser,
        setUser,
        isLoggedIn: getIsLoggedIn,
        setLoggedIn,
        isAdmin,
    };
};
