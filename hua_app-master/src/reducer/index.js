const initialState = {
  parentDetails:{},
  students:[],
  schedules:[]
}
export default reduser = (state=initialState,action) => {
    switch (action.type) {
        case 'UPDATE_PARENT_DETAILS':
            return{...state,
                parentDetails:action.payload.parentDetialsList,
            }
            break;
        case 'UPDATE_STUDENT_DETAILS':
            return{...state,
                students:action.payload.studentsList,
            }
            break;
        case 'UPDATE_SCHEDULES':
            return{...state,
                schedules:action.payload.scheduleList,
            }
            break;
    }
    return state;
}    