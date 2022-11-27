import {BLOG_SAVED,BLOG_UNSAVED,SAVE_BLOG_REQUEST,SAVE_BLOG_FAIL} from "../constants/SavedBlog"

export const SavedReducer = (
  state = { saving: "", savedblogs: [], error:"" },
  action
) => {
  switch (action.type) {
    case SAVE_BLOG_REQUEST:
      return { ...state, saving: action.payload };

    case BLOG_SAVED:
        
        console.log(action.payload)
        const item2=action.payload;
      return { ...state, savedblogs: [...state.savedblogs, item2] };

    case SAVE_BLOG_FAIL:
      return { ...state, error: action.payload };
    case BLOG_UNSAVED:
      //Getting object in payload
      const Item2 = action.payload;
      console.log(`is is ${Item2}`)
      console.log(typeof(action.payload));
      console.log(typeof(state.savedblogs[0]))
      const finder2 = state.savedblogs.filter((e) => e!== action.payload);
      console.log("finderrrr")
      console.log(finder2);
      //   if (finder2) {
      return {
        ...state,
        savedblogs: state.savedblogs.filter((e) =>{return e!== Item2}),
      };
    // }

    default:
      return state;
  }
};
