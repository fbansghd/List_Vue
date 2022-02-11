import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 2,
        userData: [0],
        listData: [0],
        habitsNameData: [0],
        habitsValueData: [0],
        goalData: [0],
        editDate: ["2021-10-04"],
        listRegist: 1,
        userId: null,
        listEditNumber: [0],
        listEditText: '',
        listSortNumber:[0],
        listRegistSortNumber:[0],
        listDeadline: '',
        habitsUpdateId:[0],
        todays: [0],
        editDateCopy: [0],
        listDataCopy: [1],
        listComplete: true,
        habitsRegist: [1],
        habitsValueDataCopy: [0],
        habitsRegistOrEdit: [1],
        habitsDateCopy: [],
        habitsNameRegistArry: [],
        habitsDateCopyCopy: [],
        editDateCopyCopy: [],
        goalId: [0],
        goalRegist: true,
        goalName: ''
        }
});