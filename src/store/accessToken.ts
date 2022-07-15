import { computed, reactive } from "vue";
import Api from "../services/AuthService";

const state = reactive<{ token: string; isRefreshing: boolean }>({
    token: "",
    isRefreshing: false,
});

const getToken = computed(() => state.token);
const setToken = (t: string = "") => {
    state.token = t;
    if (state.isRefreshing === false && t !== "") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        refreshToken();
    }
};

const refreshToken = async () => {
    state.isRefreshing = true;
    try {
        const { token } = await Api.refresh();
        setToken(token);
        setTimeout(async () => {
            await refreshToken();
        }, 60 * 9 * 1000); // Refresh access token every 9 minutes
    } catch (error) {
        state.isRefreshing = false;
        setToken();
    }
};

const isRefreshing = computed(() => state.isRefreshing);

export default () => {
    return {
        token: getToken,
        setToken,
        refreshToken,
        isRefreshing,
    };
};
