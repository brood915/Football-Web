import { combineReducers } from 'redux';

const initialState = {
	leagues:[],
  teams: [],
  index: 0
}


function handleError(state = false, action) {
    switch (action.type) {
        case 'ERROR':
            return action.error;
        default:
            return state;
    }
}

function handleLoading(state = false, action) {
    switch (action.type) {
        case 'LOADING':
            return action.loading;
        default:
            return state;
    }
}


//managing leagues
function leagues (state = initialState, action) {
  switch (action.type) {
    case 'ADD_LEAGUE':
      return Object.assign({}, state, {
        leagues: [
          ...state.leagues,
          {
            league: action.league,
            type: action.types,
            leagueName: action.leagueName,
            index: state.index++,
            url: action.url
          }
        ]
      })
    case 'REMOVE_LEAGUE':
      return Object.assign({}, state, {
        leagues: state.leagues.filter((each)=>{return each.index !== action.index})
      })  
    case 'UPDATE_LEAGUES':
      return Object.assign({}, state, {
        leagues: state.leagues.map((each)=>{
          if (each.url === action.url) {
            const league = {league:action.data};
            return Object.assign({}, each, league);
          }
          else {
            return each;
          }
        }) 
      })   
    default:
      return state      
  }
}

//managing teams
function teams (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TEAM':
      return Object.assign({}, state, {
        teams: [
          ...state.teams,
          {
            teamInfo: action.teamInfo,
            teamPlayers: action.teamPlayers,
            teamFixtures: action.teamFixtures,
            index: state.index++
          }
        ]
      })
    case 'REMOVE_TEAM':
      return Object.assign({}, state, {
        teams: state.teams.filter((each)=>{return each.index !== action.index})
      })      
    default:
      return state      
  }
}


const app = combineReducers({
  leagues, teams, handleError, handleLoading
})

export default app;