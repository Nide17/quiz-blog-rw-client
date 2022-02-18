import { GET_NOTES, GET_NOTES_FAIL, GET_NOTES_BY_CHAPTER_FAIL, NOTES_BY_CHAPTER_LOADING, GET_NOTES_BY_CHAPTER, CREATE_NOTE, CREATE_NOTE_FAIL, DELETE_NOTE, DELETE_NOTE_FAIL, UPDATE_NOTE, UPDATE_NOTE_FAIL, NOTES_LOADING, GET_LANDING_DISPLAY_NOTES, GET_LANDING_DISPLAY_NOTES_FAIL, LANDING_DISPLAY_NOTES_LOADING, GET_ONE_NOTE_PAPER, GET_ONE_NOTE_PAPER_FAIL, GET_ONE_NOTE_PAPER_LOADING, GET_LANDING_DISPLAY_NO_LIMIT_NOTES, GET_LANDING_DISPLAY_NO_LIMIT_NOTES_FAIL, LANDING_DISPLAY_NOTES_NO_LIMIT_LOADING} from './notes.types';

const INITIAL_STATE = {
  isLoading: true,
  allNotes: [],

  isLandingDisplayNotesLimitedLoading: true,
  allLandingDisplayNotesLimited: [],

  allLandingDisplayNotesNoLimitLoading: true,
  allLandingDisplayNotesNoLimit: [],

  isOneNotePaperLoading: true,
  oneNotePaper: {},

  notesByChapter: [],
  isByChapterLoading: true,

  allDownloads: [],
};

const notesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case GET_NOTES:
      return {
        ...state,
        isLoading: false,
        allNotes: action.payload
      };

    case GET_LANDING_DISPLAY_NOTES:
      return {
        ...state,
        isLandingDisplayNotesLimitedLoading: false,
        allLandingDisplayNotesLimited: action.payload
      };

    case GET_LANDING_DISPLAY_NO_LIMIT_NOTES:
      return {
        ...state,
        allLandingDisplayNotesNoLimitLoading: false,
        allLandingDisplayNotesNoLimit: action.payload
      };

    case GET_ONE_NOTE_PAPER:
      return {
        ...state,
        isOneNotePaperLoading: false,
        oneNotePaper: action.payload
      };

    case GET_NOTES_BY_CHAPTER:
      return {
        ...state,
        isByChapterLoading: false,
        notesByChapter: action.payload
      };

    case CREATE_NOTE:
      return {
        ...state,
        allNotes: [...state.allNotes, action.payload],
      };

    case CREATE_NOTE_FAIL:
    case DELETE_NOTE_FAIL:
    case UPDATE_NOTE_FAIL:
    case GET_NOTES_FAIL:
    case GET_NOTES_BY_CHAPTER_FAIL:
    case GET_LANDING_DISPLAY_NOTES_FAIL:
    case GET_ONE_NOTE_PAPER_FAIL:
    case GET_LANDING_DISPLAY_NO_LIMIT_NOTES_FAIL:
      return {
        ...state,
        msg: 'Failed!'
      };

    case UPDATE_NOTE:
      return {
        ...state,
        allNotes: state.allNotes.map((note) => {

          if (note._id === action.payload.idToUpdate) {

            return {
              ...note,
              title: action.payload.title,
              description: action.payload.description
            }

          } else return note;
        })
      }

    case DELETE_NOTE:
      return {
        ...state,
        allNotes: state.allNotes.filter(note => note._id !== action.payload)
      }

    case NOTES_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case NOTES_BY_CHAPTER_LOADING:
      return {
        ...state,
        isByChapterLoading: true
      }

    case LANDING_DISPLAY_NOTES_LOADING:
      return {
        ...state,
        isLandingDisplayNotesLimitedLoading: true
      }

    case LANDING_DISPLAY_NOTES_NO_LIMIT_LOADING:
      return {
        ...state,
        allLandingDisplayNotesNoLimitLoading: true
      }

    case GET_ONE_NOTE_PAPER_LOADING:
      return {
        ...state,
        isOneNotePaperLoading: true
      }

    default:
      return state;
  }
};

export default notesReducer;